"use client";

import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, getAccount } from '@solana/spl-token'
import { Button, Card, Stack, Title, Text, NumberInput, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useTokenSwapProgram } from '@/lib/useTokenSwapProgram'
import { getAmmPda, getPoolPda, getPoolAuthorityPda, getLiquidityMintPda, calculateLiquidityAmount } from '@/lib/token-swap-utils'
import { BN } from '@coral-xyz/anchor'

interface DepositLiquidityFormProps {
  ammId: PublicKey
  poolAddress: PublicKey
  mintA: PublicKey
  mintB: PublicKey
}

export function DepositLiquidityForm({ ammId, poolAddress, mintA, mintB }: DepositLiquidityFormProps) {
  const wallet = useWallet()
  const { connection } = useConnection()
  const program = useTokenSwapProgram()
  const [amountA, setAmountA] = useState<number>(0)
  const [amountB, setAmountB] = useState<number>(0)
  const [estimatedLP, setEstimatedLP] = useState<number>(0)
  const [depositing, setDepositing] = useState(false)
  const [poolReserveA, setPoolReserveA] = useState<number>(0)
  const [poolReserveB, setPoolReserveB] = useState<number>(0)

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!program) return

      try {
        const [ammPda] = getAmmPda(program.programId, ammId)
        const [poolAuthority] = getPoolAuthorityPda(program.programId, ammPda, mintA, mintB)

        const poolAccountA = getAssociatedTokenAddressSync(mintA, poolAuthority, true)
        const poolAccountB = getAssociatedTokenAddressSync(mintB, poolAuthority, true)

        const [accountAInfo, accountBInfo] = await Promise.all([
          getAccount(connection, poolAccountA),
          getAccount(connection, poolAccountB),
        ])

        setPoolReserveA(Number(accountAInfo.amount))
        setPoolReserveB(Number(accountBInfo.amount))
      } catch (error) {
        console.error('Error fetching pool data:', error)
      }
    }

    fetchPoolData()
  }, [program, ammId, mintA, mintB, connection])

  useEffect(() => {
    if (amountA > 0 && amountB > 0) {
      const lpAmount = calculateLiquidityAmount(amountA, amountB)
      setEstimatedLP(lpAmount)
    } else {
      setEstimatedLP(0)
    }
  }, [amountA, amountB])

  const handleDeposit = async () => {
    if (!wallet.publicKey || !program) {
      notifications.show({
        title: 'Error',
        message: 'Please connect your wallet',
        color: 'red',
      })
      return
    }

    if (amountA <= 0 || amountB <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Please enter valid amounts for both tokens',
        color: 'red',
      })
      return
    }

    setDepositing(true)
    try {
      const [ammPda] = getAmmPda(program.programId, ammId)
      const [poolAuthority] = getPoolAuthorityPda(program.programId, ammPda, mintA, mintB)
      const [liquidityMint] = getLiquidityMintPda(program.programId, ammPda, mintA, mintB)

      const poolAccountA = getAssociatedTokenAddressSync(mintA, poolAuthority, true)
      const poolAccountB = getAssociatedTokenAddressSync(mintB, poolAuthority, true)

      const depositorAccountA = getAssociatedTokenAddressSync(mintA, wallet.publicKey)
      const depositorAccountB = getAssociatedTokenAddressSync(mintB, wallet.publicKey)
      const depositorAccountLiquidity = getAssociatedTokenAddressSync(liquidityMint, wallet.publicKey)

      const tx = await program.methods
        .depositLiquidity(new BN(amountA), new BN(amountB))
        .accounts({
          pool: poolAddress,
          poolAuthority,
          depositor: wallet.publicKey,
          mintLiquidity: liquidityMint,
          mintA,
          mintB,
          poolAccountA,
          poolAccountB,
          depositorAccountLiquidity,
          depositorAccountA,
          depositorAccountB,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc()

      notifications.show({
        title: 'Success',
        message: `Liquidity deposited! TX: ${tx}`,
        color: 'green',
      })

      setAmountA(0)
      setAmountB(0)
    } catch (error: any) {
      console.error('Error depositing liquidity:', error)
      notifications.show({
        title: 'Error',
        message: `Failed to deposit liquidity: ${error.message || error}`,
        color: 'red',
      })
    } finally {
      setDepositing(false)
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Deposit Liquidity</Title>
        <Text size="sm" c="dimmed">
          Add tokens to the pool and receive LP tokens representing your share
        </Text>

        {poolReserveA > 0 && poolReserveB > 0 && (
          <Text size="sm" c="dimmed">
            Current Pool Ratio: {poolReserveA.toLocaleString()} : {poolReserveB.toLocaleString()}
          </Text>
        )}

        <Group grow>
          <NumberInput
            label="Token A Amount"
            description="Amount of Token A to deposit"
            value={amountA}
            onChange={(val) => setAmountA(Number(val))}
            min={0}
          />

          <NumberInput
            label="Token B Amount"
            description="Amount of Token B to deposit"
            value={amountB}
            onChange={(val) => setAmountB(Number(val))}
            min={0}
          />
        </Group>

        {estimatedLP > 0 && (
          <Text size="sm" fw={500}>
            Estimated LP Tokens: <strong>{estimatedLP.toLocaleString()}</strong>
          </Text>
        )}

        <Button 
          onClick={handleDeposit} 
          fullWidth 
          disabled={!wallet.publicKey || !program || depositing || amountA <= 0 || amountB <= 0}
          loading={depositing}
        >
          Deposit Liquidity
        </Button>

        <Text size="xs" c="dimmed">
          Note: Amounts will be adjusted to maintain the current pool ratio if the pool already has liquidity.
        </Text>
      </Stack>
    </Card>
  )
}
