"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Paper, Stack, Group, NumberInput, Button, Text, Divider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/hooks/useTokenSwapProgram";
import { AUTHORITY_SEED, LIQUIDITY_SEED } from "@/lib/token-swap-constants";

interface TokenInfo {
  mint: PublicKey;
  symbol: string;
  name: string;
  decimals: number;
}

interface DepositLiquidityProps {
  ammId: PublicKey;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
  poolBalances: { a: number; b: number };
}

export function DepositLiquidity({ ammId, tokenA, tokenB, poolBalances }: DepositLiquidityProps) {
  const wallet = useWallet();
  const program = useTokenSwapProgram();
  const [amountA, setAmountA] = useState<number>(0);
  const [amountB, setAmountB] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Auto-calculate proportional amount
  const handleAmountAChange = (value: number) => {
    setAmountA(value);
    if (poolBalances.a > 0 && poolBalances.b > 0) {
      const ratio = poolBalances.b / poolBalances.a;
      setAmountB(value * ratio);
    }
  };

  const handleAmountBChange = (value: number) => {
    setAmountB(value);
    if (poolBalances.a > 0 && poolBalances.b > 0) {
      const ratio = poolBalances.a / poolBalances.b;
      setAmountA(value * ratio);
    }
  };

  const deposit = async () => {
    if (!wallet.publicKey || !program) return;

    try {
      setLoading(true);

      const [mintA, mintB] = tokenA.mint.toString() < tokenB.mint.toString()
        ? [tokenA.mint, tokenB.mint]
        : [tokenB.mint, tokenA.mint];

      const [poolPda] = PublicKey.findProgramAddressSync(
        [ammId.toBuffer(), mintA.toBuffer(), mintB.toBuffer()],
        program.programId
      );

      const [poolAuthority] = PublicKey.findProgramAddressSync(
        [ammId.toBuffer(), mintA.toBuffer(), mintB.toBuffer(), Buffer.from(AUTHORITY_SEED)],
        program.programId
      );

      const [mintLiquidity] = PublicKey.findProgramAddressSync(
        [ammId.toBuffer(), mintA.toBuffer(), mintB.toBuffer(), Buffer.from(LIQUIDITY_SEED)],
        program.programId
      );

      const tx = await program.methods
        .depositLiquidity(
          new BN(amountA * Math.pow(10, tokenA.decimals)),
          new BN(amountB * Math.pow(10, tokenB.decimals))
        )
        .accounts({
          pool: poolPda,
          poolAuthority,
          depositor: wallet.publicKey,
          mintLiquidity,
          mintA,
          mintB,
          poolAccountA: getAssociatedTokenAddressSync(mintA, poolAuthority, true),
          poolAccountB: getAssociatedTokenAddressSync(mintB, poolAuthority, true),
          depositorAccountLiquidity: getAssociatedTokenAddressSync(mintLiquidity, wallet.publicKey),
          depositorAccountA: getAssociatedTokenAddressSync(mintA, wallet.publicKey),
          depositorAccountB: getAssociatedTokenAddressSync(mintB, wallet.publicKey),
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      notifications.show({
        title: "Liquidity Added!",
        message: `Deposited ${amountA} ${tokenA.symbol} and ${amountB} ${tokenB.symbol}`,
        color: "green",
      });

      setAmountA(0);
      setAmountB(0);
    } catch (error) {
      console.error("Deposit error:", error);
      notifications.show({
        title: "Deposit Failed",
        message: error instanceof Error ? error.message : "Unknown error",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={700}>Add Liquidity</Text>
        <Divider />

        <NumberInput
          label={`${tokenA.symbol} Amount`}
          placeholder="0.00"
          value={amountA}
          onChange={(val) => handleAmountAChange(Number(val) || 0)}
          min={0}
          decimalScale={6}
        />

        <NumberInput
          label={`${tokenB.symbol} Amount`}
          placeholder="0.00"
          value={amountB}
          onChange={(val) => handleAmountBChange(Number(val) || 0)}
          min={0}
          decimalScale={6}
        />

        {poolBalances.a > 0 && poolBalances.b > 0 && (
          <Text size="sm" c="dimmed">
            Current ratio: 1 {tokenA.symbol} = {(poolBalances.b / poolBalances.a).toFixed(6)} {tokenB.symbol}
          </Text>
        )}

        <Button
          fullWidth
          size="lg"
          onClick={deposit}
          disabled={!wallet.connected || amountA <= 0 || amountB <= 0 || loading}
          loading={loading}
        >
          {wallet.connected ? "Add Liquidity" : "Connect Wallet"}
        </Button>
      </Stack>
    </Paper>
  );
}
