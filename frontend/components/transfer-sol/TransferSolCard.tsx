"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Card, TextInput, Button, Stack, Text, Alert } from "@mantine/core";
import { IconInfoCircle, IconCheck, IconX } from "@tabler/icons-react";
import { IDL } from "@/anchor-idl/transfer-sol-idl";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";

export function TransferSolCard() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const transferWithCPI = async () => {
    if (!publicKey) {
      setStatus({ type: "error", message: "Please connect your wallet" });
      return;
    }

    if (!recipient || !amount) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * web3.LAMPORTS_PER_SOL;

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

      const tx = await program.methods
        .transferSolWithCpi(new BN(lamports))
        .accounts({
          payer: publicKey,
          recipient: recipientPubkey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      setStatus({
        type: "success",
        message: `Transferred ${amount} SOL! Tx: ${tx.slice(0, 8)}...`,
      });
      setRecipient("");
      setAmount("");
    } catch (error: unknown) {
      console.error("Transfer error:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Transfer failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center">
          Connect your wallet to transfer SOL
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
      style={{ maxWidth: 500, width: "100%" }}
    >
      <Stack gap="md">
        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
          Transfer SOL using Cross-Program Invocation to the System Program
        </Alert>

        <TextInput
          label="Recipient Address"
          placeholder="Enter Solana address"
          value={recipient}
          onChange={(e) => setRecipient(e.currentTarget.value)}
        />

        <TextInput
          label="Amount (SOL)"
          placeholder="0.1"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />

        <Button onClick={transferWithCPI} loading={loading} fullWidth>
          Transfer SOL
        </Button>

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
      </Stack>
    </Card>
  );
}
