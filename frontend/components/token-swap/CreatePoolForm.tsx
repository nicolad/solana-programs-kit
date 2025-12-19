"use client";

import { useState } from "react";
import { Stack, TextInput, Button, Text, Alert } from "@mantine/core";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { idl } from "@/anchor-idl/token-swap-idl";
import type { TokenSwap } from "@/anchor-idl/token-swap-types";
import { IconCheck, IconX } from "@tabler/icons-react";

export function CreatePoolForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [ammId, setAmmId] = useState("");
  const [mintA, setMintA] = useState("");
  const [mintB, setMintB] = useState("");

  const handleCreatePool = async () => {
    if (!wallet.publicKey) return;

    setLoading(true);
    setResult(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const program = new Program(idl as any, provider) as Program<TokenSwap>;

      const ammIdPubkey = new PublicKey(ammId);
      const mintAPubkey = new PublicKey(mintA);
      const mintBPubkey = new PublicKey(mintB);

      const [ammPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("amm"), ammIdPubkey.toBuffer()],
        program.programId
      );

      const [poolPda] = PublicKey.findProgramAddressSync(
        [ammPda.toBuffer(), mintAPubkey.toBuffer(), mintBPubkey.toBuffer()],
        program.programId
      );

      const [poolAuthority] = PublicKey.findProgramAddressSync(
        [
          ammPda.toBuffer(),
          mintAPubkey.toBuffer(),
          mintBPubkey.toBuffer(),
          Buffer.from("authority"),
        ],
        program.programId
      );

      // Create mint for liquidity tokens
      const mintLiquidity = web3.Keypair.generate();

      const poolAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        poolAuthority,
        true
      );

      const poolAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        poolAuthority,
        true
      );

      const tx = await program.methods
        .createPool()
        .accounts({
          amm: ammPda,
          pool: poolPda,
          poolAuthority,
          mintLiquidity: mintLiquidity.publicKey,
          mintA: mintAPubkey,
          mintB: mintBPubkey,
          poolAccountA,
          poolAccountB,
          payer: wallet.publicKey,
        })
        .signers([mintLiquidity])
        .rpc();

      setResult({
        type: "success",
        message: `Pool created! LP Mint: ${mintLiquidity.publicKey
          .toBase58()
          .slice(0, 8)}... Tx: ${tx.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Create pool error:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create pool",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Create a new liquidity pool for a token pair.
      </Text>

      <TextInput
        label="AMM ID"
        description="The public key of the AMM instance"
        placeholder="Enter AMM ID..."
        value={ammId}
        onChange={(e) => setAmmId(e.currentTarget.value)}
        required
      />

      <TextInput
        label="Token A Mint"
        description="The mint address of the first token"
        placeholder="Enter token A mint address..."
        value={mintA}
        onChange={(e) => setMintA(e.currentTarget.value)}
        required
      />

      <TextInput
        label="Token B Mint"
        description="The mint address of the second token"
        placeholder="Enter token B mint address..."
        value={mintB}
        onChange={(e) => setMintB(e.currentTarget.value)}
        required
      />

      <Button onClick={handleCreatePool} loading={loading} fullWidth>
        Create Pool
      </Button>

      {result && (
        <Alert
          icon={
            result.type === "success" ? (
              <IconCheck size={16} />
            ) : (
              <IconX size={16} />
            )
          }
          title={result.type === "success" ? "Success" : "Error"}
          color={result.type === "success" ? "green" : "red"}
        >
          {result.message}
        </Alert>
      )}
    </Stack>
  );
}
