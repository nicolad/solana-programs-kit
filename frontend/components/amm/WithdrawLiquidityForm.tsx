"use client";

import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, getAccount } from '@solana/spl-token'
import { Button, Card, Stack, Title, Text, NumberInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useTokenSwapProgram } from '@/lib/useTokenSwapProgram'
import { getAmmPda, getPoolPda, getPoolAuthorityPda, getLiquidityMintPda, MINIMUM_LIQUIDITY } from '@/lib/token-swap-utils'
import { BN } from '@coral-xyz/anchor'

interface WithdrawLiquidityFormProps {
  ammId: PublicKey
  poolAddress: PublicKey
  mintA: PublicKey
  mintB: PublicKey
}

export function WithdrawLiquidityForm({ ammId, poolAddress, mintA, mintB }: WithdrawLiquidityFormProps) {
  const wallet = useWallet()
  const { connection } = useConnection()
  const program = useTokenSwapProgram()
  const [lpAmount, setLpAmount] = useState<number>(0)
  const [estimatedTokenA, setEstimatedTokenA] = useState<number>(0)
  const [estimatedTokenB, setEstimatedTokenB] = useState<number>(0)
  const [withdrawing, setWithdrawing] = useState(false)
  const [userLPBalance, setUserLPBalance] = useState<number>(0)
  const [totalLPSupply, setTotalLPSupply] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!program || !wallet.publicKey) return

      try {
        const [ammPda] = getAmmPda(program.programId, ammId)
        const [poolAuthority] = getPoolAuthorityPda(program.programId, ammPda, mintA, mintB)
        const [liquidityMint] = getLiquidityMintPda(program.programId, ammPda, mintA, mintB)

        const poolAccountA = getAssociatedTokenAddressSync(mintA, poolAuthority, true)
        const poolAccountB = getAssociatedTokenAddressSync(mintB, poolAuthority, true)
        const userLPAccount = getAssociatedTokenAddressSync(liquidityMint, wallet.publicKey)

        const [accountAInfo, accountBInfo, liquidityMintInfo, userLPInfo] = await Promise.all([
          getAccount(connection, poolAccountA),
          getAccount(connection, poolAccountB),
          connection.getParsedAccountInfo(liquidityMint),
          getAccount(connection, userLPAccount).catch(() => null),
        ])

        const poolReserveA = Number(accountAInfo.amount)
        const poolReserveB = Number(accountBInfo.amount)
        const userBalance = userLPInfo ? Number(userLPInfo.amount) : 0
        
        // @ts-ignore
        const supply = liquidityMintInfo.value?.data?.parsed?.info?.supply || 0
        const totalSupply = Number(supply)

        setUserLPBalance(userBalance)
        setTotalLPSupply(totalSupply)

        // Calculate estimated withdrawal amounts
        if (lpAmount > 0 && totalSupply > 0) {
          const shareA = Math.floor((lpAmount * poolReserveA) / (totalSupply + MINIMUM_LIQUIDITY))
          const shareB = Math.floor((lpAmount * poolReserveB) / (totalSupply + MINIMUM_LIQUIDITY))
          setEstimatedTokenA(shareA)
          setEstimatedTokenB(shareB)
        } else {
          setEstimatedTokenA(0)
          setEstimatedTokenB(0)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [program, wallet.publicKey, ammId, mintA, mintB, connection, lpAmount])

  const handleWithdraw = async () => {
    if (!wallet.publicKey || !program) {
      notifications.show({
        title: 'Error',
        message: 'Please connect your wallet',
        color: 'red',
      })
      return
    }

    if (lpAmount <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Please enter a valid LP token amount',
        color: 'red',
      })
      return
    }

    if (lpAmount > userLPBalance) {
      notifications.show({
        title: 'Error',
        message: 'Insufficient LP token balance',
        color: 'red',
      })
      return
    }

    setWithdrawing(true)
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
        .withdrawLiquidity(new BN(lpAmount))
        .accounts({
          amm: ammPda,
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
        })
        .rpc()

      notifications.show({
        title: 'Success',
        message: `Liquidity withdrawn! TX: ${tx}`,
        color: 'green',
      })

      setLpAmount(0)
    } catch (error: any) {
      console.error('Error withdrawing liquidity:', error)
      notifications.show({
        title: 'Error',
        message: `Failed to withdraw liquidity: ${error.message || error}`,
        color: 'red',
      })
    } finally {
      setWithdrawing(false)
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Withdraw Liquidity</Title>
        <Text size="sm" c="dimmed">
          Burn LP tokens to withdraw your share from the pool
        </Text>

        <Text size="sm" fw={500}>
          Your LP Balance: <strong>{userLPBalance.toLocaleString()}</strong>
        </Text>

        <NumberInput
          label="LP Token Amount"
          description="Amount of LP tokens to burn"
          value={lpAmount}
          onChange={(val) => setLpAmount(Number(val))}
          min={0}
          max={userLPBalance}
        />

        {estimatedTokenA > 0 && estimatedTokenB > 0 && (
          <Stack gap="xs">
            <Text size="sm" fw={500}>Estimated Withdrawal:</Text>
            <Text size="sm">Token A: <strong>{estimatedTokenA.toLocaleString()}</strong></Text>
            <Text size="sm">Token B: <strong>{estimatedTokenB.toLocaleString()}</strong></Text>
          </Stack>
        )}

        <Button 
          onClick={handleWithdraw} 
          fullWidth 
          disabled={!wallet.publicKey || !program || withdrawing || lpAmount <= 0 || lpAmount > userLPBalance}
          loading={withdrawing}
        >
          Withdraw Liquidity
        </Button>

        <Text size="xs" c="dimmed">
          Note: LP tokens will be burned and you'll receive proportional amounts of both tokens.
        </Text>
      </Stack>
    </Card>
  )
}
