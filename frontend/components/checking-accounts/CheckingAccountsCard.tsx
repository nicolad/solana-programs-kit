"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { Card, Button, Stack, Text, Alert, Group, Code } from "@mantine/core";
import { IconInfoCircle, IconCheck, IconX, IconShieldCheck } from "@tabler/icons-react";
import { IDL } from "@/anchor-idl/checking-accounts-idl";
import { Program, AnchorProvider } from "@coral-xyz/anchor";

export function CheckingAccountsCard() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [checkDetails, setCheckDetails] = useState<string | null>(null);

  const performChecks = async () => {
    if (!publicKey) {
      setStatus({ type: "error", message: "Please connect your wallet" });
      return;
    }

    setLoading(true);
    setStatus(null);
    setCheckDetails(null);

    try {
      // Create two test accounts
      const accountToCreate = Keypair.generate();
      const accountToChange = Keypair.generate();

      const details = `Performing account checks:
• Payer (${publicKey.toBase58().slice(0, 8)}...) - Must be signer ✓
• Account to create (${accountToCreate.publicKey.toBase58().slice(0, 8)}...) - Writable ✓
• Account to change (${accountToChange.publicKey.toBase58().slice(0, 8)}...) - Writable + Owner check ✓
• System Program - Must be executable ✓`;

      setCheckDetails(details);

      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction: async (tx) => {
            const signed = await sendTransaction(tx, connection);
            return tx;
          },
          signAllTransactions: async (txs) => txs,
        },
        { commitment: "confirmed" }
      );

      const program = new Program(IDL, provider);

      // Build the transaction
      const transaction = await program.methods
        .checkAccounts()
        .accounts({
          payer: publicKey,
          accountToCreate: accountToCreate.publicKey,
          accountToChange: accountToChange.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      // Set fee payer and recent blockhash
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      // Send transaction (wallet will sign)
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      setStatus({
        type: "success",
        message: `All account checks passed! Tx: ${signature.slice(0, 8)}...`,
      });
    } catch (error: any) {
      console.error("Check accounts error:", error);
      setStatus({
        type: "error",
        message: error.message || "Account validation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center">
          Connect your wallet to test account checking
        </Text>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 600, width: "100%" }}>
      <Stack gap="md">
        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
          This program demonstrates Anchor's account validation checks: signer verification, writability,
          owner validation, and program ID checks.
        </Alert>

        <Group justify="center">
          <IconShieldCheck size={48} color="var(--mantine-color-blue-6)" />
        </Group>

        {checkDetails && (
          <Code block style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
            {checkDetails}
          </Code>
        )}

        <Button onClick={performChecks} loading={loading} fullWidth leftSection={<IconShieldCheck size={18} />}>
          Run Account Checks
        </Button>

        {status && (
          <Alert
            icon={status.type === "success" ? <IconCheck size={16} /> : <IconX size={16} />}
            color={status.type === "success" ? "green" : "red"}
            variant="light"
          >
            {status.message}
          </Alert>
        )}

        <Text size="xs" c="dimmed">
          This instruction validates:
          <br />• Payer is a signer
          <br />• Accounts are writable
          <br />• Owner constraints are met
          <br />• System program is executable
        </Text>
      </Stack>
    </Card>
  );
}
