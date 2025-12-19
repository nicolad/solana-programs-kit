"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { Card, Button, Stack, Text, Alert, Code, Anchor } from "@mantine/core";
import {
  IconInfoCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconExternalLink,
} from "@tabler/icons-react";
import { IDL } from "@/anchor-idl/create-account-idl";
import { Program, AnchorProvider } from "@coral-xyz/anchor";

export function CreateAccountCard() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  const createAccount = async () => {
    if (!publicKey) {
      setStatus({ type: "error", message: "Please connect your wallet" });
      return;
    }

    setLoading(true);
    setStatus(null);
    setAccountAddress(null);

    try {
      const newAccount = Keypair.generate();

      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction: async (tx) => {
            await sendTransaction(tx, connection);
            return tx;
          },
          signAllTransactions: async (txs) => txs,
        },
        { commitment: "confirmed" }
      );

      const program = new Program(IDL, provider);

      // Build the transaction
      const transaction = await program.methods
        .createSystemAccount()
        .accounts({
          payer: publicKey,
          newAccount: newAccount.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      // Sign with the new account keypair
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(newAccount);

      // Send transaction with wallet signature
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      setAccountAddress(newAccount.publicKey.toBase58());
      setStatus({
        type: "success",
        message: `System account created! Tx: ${signature.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Create account error:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center">
          Connect your wallet to create accounts
        </Text>
      </Card>
    );
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 600, width: "100%" }}
    >
      <Stack gap="md">
        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
          Create a new system account using CPI to the System Program
        </Alert>

        <Text size="sm" c="dimmed">
          This program demonstrates creating system-owned accounts via
          Cross-Program Invocation (CPI). The account will be rent-exempt and
          owned by the System Program.{" "}
          <Anchor
            href="https://solanacookbook.com/references/accounts.html#how-to-create-a-system-account"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            Learn more{" "}
            <IconExternalLink size={12} style={{ verticalAlign: "middle" }} />
          </Anchor>
        </Text>

        <Button
          onClick={createAccount}
          loading={loading}
          fullWidth
          leftSection={<IconPlus size={18} />}
        >
          Create System Account
        </Button>

        {accountAddress && (
          <Alert color="green" variant="light">
            <Text size="sm" fw={500} mb={4}>
              New Account Created:
            </Text>
            <Code block>{accountAddress}</Code>
          </Alert>
        )}

        {status && (
          <Alert
            icon={
              status.type === "success" ? (
                <IconCheck size={16} />
              ) : (
                <IconX size={16} />
              )
            }
            color={status.type === "success" ? "green" : "red"}
            variant="light"
          >
            {status.message}
          </Alert>
        )}

        <Text size="xs" c="dimmed">
          This creates a rent-exempt system account with 0 data space, owned by
          the System Program (11111...1111).
        </Text>
      </Stack>
    </Card>
  );
}
