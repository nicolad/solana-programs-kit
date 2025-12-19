"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Paper, Stack, Group, Select, NumberInput, Button, Text, Divider } from "@mantine/core";
import { IconArrowsExchange } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/hooks/useTokenSwapProgram";
import { AUTHORITY_SEED } from "@/lib/token-swap-constants";

interface TokenInfo {
  mint: PublicKey;
  symbol: string;
  name: string;
  decimals: number;
  balance?: number;
}

interface SwapFormProps {
  ammId: PublicKey;
  tokens: TokenInfo[];
  poolBalances: { [key: string]: number };
  fee: number;
}

export function SwapForm({ ammId, tokens, poolBalances, fee }: SwapFormProps) {
  const wallet = useWallet();
  const program = useTokenSwapProgram();
  const [fromToken, setFromToken] = useState<TokenInfo | null>(tokens[0] || null);
  const [toToken, setToToken] = useState<TokenInfo | null>(tokens[1] || null);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Calculate output using constant product formula: x * y = k
  useEffect(() => {
    if (!fromToken || !toToken || inputAmount <= 0) {
      setOutputAmount(0);
      setPriceImpact(0);
      return;
    }

    const poolAKey = fromToken.mint.toString();
    const poolBKey = toToken.mint.toString();
    const poolA = poolBalances[poolAKey] || 0;
    const poolB = poolBalances[poolBKey] || 0;

    if (poolA === 0 || poolB === 0) {
      setOutputAmount(0);
      return;
    }

    // Apply fee (in basis points, e.g., 30 = 0.3%)
    const inputAfterFee = inputAmount * (1 - fee / 10000);
    
    // Constant product formula: output = (inputAfterFee * poolB) / (poolA + inputAfterFee)
    const output = (inputAfterFee * poolB) / (poolA + inputAfterFee);
    
    // Calculate price impact
    const spotPrice = poolB / poolA;
    const executionPrice = output / inputAmount;
    const impact = ((spotPrice - executionPrice) / spotPrice) * 100;

    setOutputAmount(output);
    setPriceImpact(impact);
  }, [fromToken, toToken, inputAmount, poolBalances, fee]);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const executeSwap = async () => {
    if (!wallet.publicKey || !program || !fromToken || !toToken) return;

    try {
      setLoading(true);

      // Derive pool PDA
      const [mintA, mintB] = fromToken.mint.toString() < toToken.mint.toString()
        ? [fromToken.mint, toToken.mint]
        : [toToken.mint, fromToken.mint];

      const [poolPda] = PublicKey.findProgramAddressSync(
        [ammId.toBuffer(), mintA.toBuffer(), mintB.toBuffer()],
        program.programId
      );

      const [poolAuthority] = PublicKey.findProgramAddressSync(
        [ammId.toBuffer(), mintA.toBuffer(), mintB.toBuffer(), Buffer.from(AUTHORITY_SEED)],
        program.programId
      );

      const swapA = fromToken.mint.equals(mintA);
      const inputInLamports = new BN(inputAmount * Math.pow(10, fromToken.decimals));
      const minOutput = new BN(outputAmount * 0.99 * Math.pow(10, toToken.decimals)); // 1% slippage

      const tx = await program.methods
        .swapExactTokensForTokens(swapA, inputInLamports, minOutput)
        .accounts({
          amm: ammId,
          pool: poolPda,
          poolAuthority,
          trader: wallet.publicKey,
          mintA,
          mintB,
          poolAccountA: getAssociatedTokenAddressSync(mintA, poolAuthority, true),
          poolAccountB: getAssociatedTokenAddressSync(mintB, poolAuthority, true),
          traderAccountA: getAssociatedTokenAddressSync(mintA, wallet.publicKey),
          traderAccountB: getAssociatedTokenAddressSync(mintB, wallet.publicKey),
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      notifications.show({
        title: "Swap Successful!",
        message: `Swapped ${inputAmount} ${fromToken.symbol} for ${outputAmount.toFixed(4)} ${toToken.symbol}`,
        color: "green",
      });

      setInputAmount(0);
      setOutputAmount(0);
    } catch (error) {
      console.error("Swap error:", error);
      notifications.show({
        title: "Swap Failed",
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
        <Text size="lg" fw={700}>Swap Tokens</Text>
        <Divider />

        <Group grow align="flex-end">
          <Select
            label="From"
            value={fromToken?.symbol}
            onChange={(value) => {
              const token = tokens.find((t) => t.symbol === value);
              if (token) setFromToken(token);
            }}
            data={tokens
              .filter((t) => t.symbol !== toToken?.symbol)
              .map((t) => ({ value: t.symbol, label: `${t.name} (${t.symbol})` }))}
          />

          <Button
            variant="subtle"
            onClick={handleSwap}
            style={{ maxWidth: 50, alignSelf: "flex-end" }}
          >
            <IconArrowsExchange size={20} />
          </Button>

          <Select
            label="To"
            value={toToken?.symbol}
            onChange={(value) => {
              const token = tokens.find((t) => t.symbol === value);
              if (token) setToToken(token);
            }}
            data={tokens
              .filter((t) => t.symbol !== fromToken?.symbol)
              .map((t) => ({ value: t.symbol, label: `${t.name} (${t.symbol})` }))}
          />
        </Group>

        <NumberInput
          label="You Pay"
          placeholder="0.00"
          value={inputAmount}
          onChange={(val) => setInputAmount(Number(val) || 0)}
          min={0}
          decimalScale={6}
          rightSection={<Text size="sm" c="dimmed">{fromToken?.symbol}</Text>}
        />

        <Paper p="md" bg="dark.6" radius="md">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">You Receive (estimated)</Text>
            <Text size="lg" fw={600}>
              {outputAmount.toFixed(6)} {toToken?.symbol}
            </Text>
          </Group>
        </Paper>

        {inputAmount > 0 && (
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Trading Fee ({fee / 100}%)</Text>
              <Text size="sm">{((inputAmount * fee) / 10000).toFixed(6)} {fromToken?.symbol}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Price Impact</Text>
              <Text size="sm" c={priceImpact > 5 ? "red" : priceImpact > 2 ? "yellow" : "green"}>
                {priceImpact.toFixed(2)}%
              </Text>
            </Group>
          </Stack>
        )}

        <Button
          fullWidth
          size="lg"
          onClick={executeSwap}
          disabled={!wallet.connected || !fromToken || !toToken || inputAmount <= 0 || loading}
          loading={loading}
        >
          {wallet.connected ? "Swap" : "Connect Wallet"}
        </Button>
      </Stack>
    </Paper>
  );
}
