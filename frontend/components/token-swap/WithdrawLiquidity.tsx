"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Paper, Stack, NumberInput, Button, Text, Divider, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/hooks/useTokenSwapProgram";
import { AUTHORITY_SEED, LIQUIDITY_SEED } from "@/lib/token-swap-constants";

interface TokenInfo {
  mint: PublicKey;
  symbol: string;
  decimals: number;
}

interface WithdrawLiquidityProps {
  ammId: PublicKey;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
  lpBalance: number;
  lpDecimals: number;
}

export function WithdrawLiquidity({ ammId, tokenA, tokenB, lpBalance, lpDecimals }: WithdrawLiquidityProps) {
  const wallet = useWallet();
  const program = useTokenSwapProgram();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const withdraw = async () => {
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
        .withdrawLiquidity(new BN(amount * Math.pow(10, lpDecimals)))
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
        title: "Liquidity Withdrawn!",
        message: `Removed ${amount} LP tokens`,
        color: "green",
      });

      setAmount(0);
    } catch (error) {
      console.error("Withdraw error:", error);
      notifications.show({
        title: "Withdrawal Failed",
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
        <Text size="lg" fw={700}>Remove Liquidity</Text>
        <Divider />

        <Group justify="space-between">
          <Text size="sm" c="dimmed">Your LP Tokens</Text>
          <Text size="sm" fw={600}>{lpBalance.toFixed(6)}</Text>
        </Group>

        <NumberInput
          label="LP Tokens to Remove"
          placeholder="0.00"
          value={amount}
          onChange={(val) => setAmount(Number(val) || 0)}
          min={0}
          max={lpBalance}
          decimalScale={6}
        />

        <Button
          variant="outline"
          size="xs"
          onClick={() => setAmount(lpBalance)}
        >
          Max
        </Button>

        <Button
          fullWidth
          size="lg"
          onClick={withdraw}
          disabled={!wallet.connected || amount <= 0 || amount > lpBalance || loading}
          loading={loading}
          color="red"
        >
          {wallet.connected ? "Remove Liquidity" : "Connect Wallet"}
        </Button>
      </Stack>
    </Paper>
  );
}
