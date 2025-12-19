"use client";

import { useSwapProgram } from '@/lib/useSwapProgram'
import { BN } from '@coral-xyz/anchor'
import {
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
} from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { IconArrowsExchange } from '@tabler/icons-react'
import { Button, Select, TextInput, Card, Group, Stack, Text, NumberInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'

interface SwapAsset {
    name: string
    symbol: string
    uri: string
    balance: number
    mint: PublicKey
    poolTokenAccount: PublicKey
    decimals: number
}

interface SwapCardProps {
    assets: SwapAsset[]
}

export function SwapCardComponent({ assets }: SwapCardProps) {
    const program = useSwapProgram()
    const [fromToken, setFromToken] = useState(assets[0])
    const [toToken, setToToken] = useState(assets[1])
    const [amount, setAmount] = useState(0)
    const [receiveAmount, setReceiveAmount] = useState(0)
    const wallet = useWallet()

    useEffect(() => {
        if (fromToken && toToken && amount > 0) {
            // Calculate the receive amount based on the constant product formula
            const r = (toToken.balance * amount) / (fromToken.balance + amount)
            const adjustedR = r / Math.pow(10, toToken.decimals)
            const roundedR = Math.round(adjustedR * 100) / 100
            setReceiveAmount(roundedR)
        }
    }, [amount, fromToken, toToken])

    const handleFlip = () => {
        setFromToken(toToken)
        setToToken(fromToken)
    }

    const swap = async () => {
        if (!wallet.publicKey || !program) {
            notifications.show({
                title: 'Error',
                message: 'Please connect your wallet',
                color: 'red',
            })
            return
        }

        try {
            const LIQUIDITY_POOL_SEED_PREFIX = 'liquidity_pool'
            const poolAddress = PublicKey.findProgramAddressSync(
                [Buffer.from(LIQUIDITY_POOL_SEED_PREFIX)],
                program.programId
            )[0]

            const sig = await program.methods
                .swap(new BN(amount))
                .accounts({
                    pool: poolAddress,
                    receiveMint: toToken.mint,
                    poolReceiveTokenAccount: getAssociatedTokenAddressSync(
                        toToken.mint,
                        poolAddress,
                        true
                    ),
                    payerReceiveTokenAccount: getAssociatedTokenAddressSync(
                        toToken.mint,
                        wallet.publicKey,
                        true
                    ),
                    payMint: fromToken.mint,
                    poolPayTokenAccount: getAssociatedTokenAddressSync(
                        fromToken.mint,
                        poolAddress,
                        true
                    ),
                    payerPayTokenAccount: getAssociatedTokenAddressSync(
                        fromToken.mint,
                        wallet.publicKey
                    ),
                    payer: wallet.publicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc()
            
            notifications.show({
                title: 'Success',
                message: 'Swap successful!',
                color: 'green',
            })
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: `Swap failed: ${error}`,
                color: 'red',
            })
        }
    }

    if (!assets || assets.length < 2) {
        return <Text>Loading assets...</Text>
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group justify="space-between" grow>
                    <Select
                        label="From"
                        value={fromToken?.symbol}
                        onChange={(value) => {
                            const selected = assets.find(a => a.symbol === value)
                            if (selected) setFromToken(selected)
                        }}
                        data={assets
                            .filter(a => a.symbol !== toToken?.symbol)
                            .map(a => ({ value: a.symbol, label: a.name }))}
                    />

                    <Button
                        onClick={handleFlip}
                        variant="subtle"
                        style={{ alignSelf: 'flex-end' }}
                    >
                        <IconArrowsExchange size={20} />
                    </Button>

                    <Select
                        label="To"
                        value={toToken?.symbol}
                        onChange={(value) => {
                            const selected = assets.find(a => a.symbol === value)
                            if (selected) setToToken(selected)
                        }}
                        data={assets
                            .filter(a => a.symbol !== fromToken?.symbol)
                            .map(a => ({ value: a.symbol, label: a.name }))}
                    />
                </Group>

                <Group grow>
                    <NumberInput
                        label="Pay"
                        placeholder="Amount"
                        value={amount / (10 ** fromToken.decimals)}
                        onChange={(val) => setAmount(Number(val) * 10 ** fromToken.decimals)}
                        min={0}
                        step={0.01}
                    />

                    <TextInput
                        label="Receive"
                        value={receiveAmount.toString()}
                        readOnly
                        styles={{
                            input: { backgroundColor: 'var(--mantine-color-green-light)' }
                        }}
                    />
                </Group>

                <Button onClick={swap} fullWidth disabled={!wallet.publicKey || !program}>
                    Swap
                </Button>
            </Stack>
        </Card>
    )
}
