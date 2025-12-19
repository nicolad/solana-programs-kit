"use client";

import { useState } from "react";
import { Stack, NumberInput, Button, Text, Alert } from "@mantine/core";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { idl } from "@/anchor-idl/token-swap-idl";
import type { TokenSwap } from "@/anchor-idl/token-swap-types";
import { IconCheck, IconX } from "@tabler/icons-react";

export function CreateAmmForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [fee, setFee] = useState<number>(30); // 0.3% = 30 basis points

  const handleCreateAmm = async () => {
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

      // Generate a new keypair for the AMM ID
      const ammId = Keypair.generate();

      const tx = await program.methods
        .createAmm(ammId.publicKey, fee)
        .accounts({
          admin: wallet.publicKey,
          payer: wallet.publicKey,
        })
        .rpc();

      setResult({
        type: "success",
        message: `AMM created successfully! AMM ID: ${ammId.publicKey
          .toBase58()
          .slice(0, 8)}... Tx: ${tx.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Create AMM error:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create AMM",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Create a new Automated Market Maker instance with configurable fees.
      </Text>

      <NumberInput
        label="Fee (basis points)"
        description="Fee in basis points (100 = 1%, 30 = 0.3%)"
        placeholder="30"
        value={fee}
        onChange={(value) => setFee(Number(value))}
        min={0}
        max={9999}
        required
      />

      <Button onClick={handleCreateAmm} loading={loading} fullWidth>
        Create AMM
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
