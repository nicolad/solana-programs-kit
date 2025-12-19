"use client";

import { useSwapProgram } from "@/hooks/useSwapProgram";
import { notifications } from "@mantine/notifications";
import { BN } from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Paper, Select, Button, NumberInput, Group, Stack, Text } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons-react";

interface Asset {
  name: string;
  symbol: string;
  uri: string;
  balance: number;
  mint: PublicKey;
  poolTokenAccount: PublicKey;
  decimals: number;
}

interface SwapCardProps {
  assets: Asset[];
}

export function SwapCard({ assets }: SwapCardProps) {
  const tokens = assets;
  const program = useSwapProgram();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const wallet = useWallet();

  useEffect(() => {
    // Calculate the receive amount based on the constant product formula
    const r = (toToken.balance * amount) / (fromToken.balance + amount);
    const adjustedR = r / Math.pow(10, toToken.decimals);
    const roundedR = Math.round(adjustedR * 100) / 100;
    setReceiveAmount(roundedR);
  }, [amount, fromToken, toToken]);

  const handleFlop = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const swap = async () => {
    if (wallet.publicKey && program) {
      try {
        const LIQUIDITY_POOL_SEED_PREFIX = "liquidity_pool";
        const poolAddress = PublicKey.findProgramAddressSync(
          [Buffer.from(LIQUIDITY_POOL_SEED_PREFIX)],
          program.programId
        )[0];

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
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          })
          .rpc();
        
        notifications.show({
          title: "Swap successful!",
          message: `Transaction: ${sig}`,
          color: "green",
        });
      } catch (error) {
        notifications.show({
          title: "Swap failed",
          message: error instanceof Error ? error.message : "Unknown error",
          color: "red",
        });
      }
    }
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Select
            label="From"
            value={fromToken.symbol}
            onChange={(value) => {
              const selectedAsset = assets.find((asset) => asset.symbol === value);
              if (selectedAsset) {
                setFromToken(selectedAsset);
              }
            }}
            data={assets
              .filter((asset) => asset.symbol !== toToken.symbol)
              .map((asset) => ({
                value: asset.symbol,
                label: asset.name,
              }))}
            style={{ flex: 1 }}
          />

          <Button
            onClick={handleFlop}
            variant="filled"
            color="blue"
            mt="xl"
            style={{ minWidth: 40 }}
          >
            <IconArrowsLeftRight size={18} />
          </Button>

          <Select
            label="To"
            value={toToken.symbol}
            onChange={(value) => {
              const selectedAsset = assets.find((asset) => asset.symbol === value);
              if (selectedAsset) {
                setToToken(selectedAsset);
              }
            }}
            data={assets
              .filter((asset) => asset.symbol !== fromToken.symbol)
              .map((asset) => ({
                value: asset.symbol,
                label: asset.name,
              }))}
            style={{ flex: 1 }}
          />
        </Group>

        <Group grow>
          <NumberInput
            label="Pay"
            placeholder="Amount"
            min={0}
            step={0.01}
            onChange={(value) =>
              setAmount(Number(value) * 10 ** fromToken.decimals)
            }
          />
          <div>
            <Text size="sm" fw={500} mb={3}>
              Receive
            </Text>
            <Paper p="sm" bg="green.9" c="white">
              {receiveAmount}
            </Paper>
          </div>
        </Group>

        <Button onClick={swap} fullWidth size="md" variant="filled">
          Swap
        </Button>
      </Stack>
    </Paper>
  );
}
