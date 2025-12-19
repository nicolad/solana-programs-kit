"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Button, TextInput, Card, Stack, Title, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/lib/useTokenSwapProgram";
import {
  getAmmPda,
  getPoolPda,
  getPoolAuthorityPda,
  getLiquidityMintPda,
} from "@/lib/token-swap-utils";

interface CreatePoolFormProps {
  ammId: PublicKey;
}

export function CreatePoolForm({ ammId }: CreatePoolFormProps) {
  const wallet = useWallet();
  const program = useTokenSwapProgram();
  const [mintA, setMintA] = useState("");
  const [mintB, setMintB] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreatePool = async () => {
    if (!wallet.publicKey || !program) {
      notifications.show({
        title: "Error",
        message: "Please connect your wallet",
        color: "red",
      });
      return;
    }

    if (!mintA || !mintB) {
      notifications.show({
        title: "Error",
        message: "Please provide both mint addresses",
        color: "red",
      });
      return;
    }

    setCreating(true);
    try {
      const mintAPubkey = new PublicKey(mintA);
      const mintBPubkey = new PublicKey(mintB);

      // Ensure mint A < mint B (lexicographic order)
      const [sortedMintA, sortedMintB] =
        mintAPubkey.toBuffer().compare(mintBPubkey.toBuffer()) < 0
          ? [mintAPubkey, mintBPubkey]
          : [mintBPubkey, mintAPubkey];

      const [ammPda] = getAmmPda(program.programId, ammId);
      const [poolPda] = getPoolPda(
        program.programId,
        ammPda,
        sortedMintA,
        sortedMintB
      );
      const [poolAuthority] = getPoolAuthorityPda(
        program.programId,
        ammPda,
        sortedMintA,
        sortedMintB
      );
      const [liquidityMint] = getLiquidityMintPda(
        program.programId,
        ammPda,
        sortedMintA,
        sortedMintB
      );

      const poolAccountA = getAssociatedTokenAddressSync(
        sortedMintA,
        poolAuthority,
        true
      );
      const poolAccountB = getAssociatedTokenAddressSync(
        sortedMintB,
        poolAuthority,
        true
      );

      const tx = await program.methods
        .createPool()
        .accounts({
          amm: ammPda,
          pool: poolPda,
          poolAuthority,
          mintLiquidity: liquidityMint,
          mintA: sortedMintA,
          mintB: sortedMintB,
          poolAccountA,
          poolAccountB,
          payer: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      notifications.show({
        title: "Success",
        message: `Pool created! TX: ${tx}`,
        color: "green",
      });
    } catch (error: any) {
      console.error("Error creating pool:", error);
      notifications.show({
        title: "Error",
        message: `Failed to create pool: ${error.message || error}`,
        color: "red",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Create Liquidity Pool</Title>
        <Text size="sm" c="dimmed">
          Create a new liquidity pool for a token pair
        </Text>

        <TextInput
          label="Token A Mint Address"
          placeholder="Enter mint address..."
          value={mintA}
          onChange={(e) => setMintA(e.currentTarget.value)}
        />

        <TextInput
          label="Token B Mint Address"
          placeholder="Enter mint address..."
          value={mintB}
          onChange={(e) => setMintB(e.currentTarget.value)}
        />

        <Text size="xs" c="dimmed">
          Note: Mints will be automatically sorted lexicographically
        </Text>

        <Button
          onClick={handleCreatePool}
          fullWidth
          disabled={
            !wallet.publicKey || !program || creating || !mintA || !mintB
          }
          loading={creating}
        >
          Create Pool
        </Button>
      </Stack>
    </Card>
  );
}
