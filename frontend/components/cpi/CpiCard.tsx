"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import {
  Card,
  Button,
  Stack,
  Text,
  Group,
  Alert,
  Badge,
  TextInput,
  Anchor,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconCheck,
  IconX,
  IconBolt,
  IconBoltOff,
  IconExternalLink,
} from "@tabler/icons-react";
import { HAND_IDL, LEVER_IDL } from "@/anchor-idl/cpi-idl";
import { Program, AnchorProvider } from "@coral-xyz/anchor";

export function CpiCard() {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [powerAccount, setPowerAccount] = useState<Keypair | null>(null);
  const [isPowerOn, setIsPowerOn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const initializeLever = async () => {
    if (!publicKey) {
      setStatus({ type: "error", message: "Please connect your wallet" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const newPowerAccount = Keypair.generate();

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

      const leverProgram = new Program(LEVER_IDL, provider);

      // Build the transaction
      const transaction = await leverProgram.methods
        .initialize()
        .accounts({
          power: newPowerAccount.publicKey,
          user: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      // Set up transaction with confirmed commitment for faster blockhash
      transaction.feePayer = publicKey;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      transaction.recentBlockhash = blockhash;

      // Sign with the power account keypair first
      transaction.partialSign(newPowerAccount);

      // Then sign with wallet
      if (!signTransaction) {
        throw new Error("Wallet does not support signing");
      }
      const signedTransaction = await signTransaction(transaction);

      // Send the fully signed transaction with skipPreflight to avoid expiration
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
          maxRetries: 3,
        }
      );

      setStatus({
        type: "success",
        message: `Transaction sent! Confirming... Sig: ${signature.slice(
          0,
          8
        )}...`,
      });

      // Wait for confirmation with better error handling
      const confirmation = await connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`);
      }

      setPowerAccount(newPowerAccount);
      setIsPowerOn(false);
      setStatus({
        type: "success",
        message: `Lever initialized! Tx: ${signature.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Initialize error:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Initialization failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const pullLever = async () => {
    if (!publicKey || !powerAccount) {
      setStatus({ type: "error", message: "Please initialize lever first" });
      return;
    }

    if (!name.trim()) {
      setStatus({ type: "error", message: "Please enter your name" });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Retry logic for expired signatures
    const maxAttempts = 3;
    let attempt = 0;

    while (attempt < maxAttempts) {
      try {
        attempt++;

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

        const handProgram = new Program(HAND_IDL, provider);
        const leverProgramId = new PublicKey(LEVER_IDL.address);

        // Build and send transaction manually for better control
        const transaction = await handProgram.methods
          .pullLever(name)
          .accounts({
            power: powerAccount.publicKey,
            leverProgram: leverProgramId,
          })
          .transaction();

        transaction.feePayer = publicKey;

        // Get fresh blockhash for each attempt
        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;

        // Send transaction with options for better reliability
        const signature = await sendTransaction(transaction, connection, {
          skipPreflight: false,
          maxRetries: 2,
        });

        setStatus({
          type: "success",
          message: `Transaction sent! Confirming... Sig: ${signature.slice(
            0,
            8
          )}...`,
        });

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction(
          {
            signature,
            blockhash,
            lastValidBlockHeight,
          },
          "confirmed"
        );

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        // Toggle power state
        setIsPowerOn((prev) => !prev);
        setStatus({
          type: "success",
          message: `${name} pulled the lever! Power is now ${
            !isPowerOn ? "ON" : "OFF"
          }. Tx: ${signature.slice(0, 8)}...`,
        });

        // Success - exit retry loop
        break;
      } catch (error: unknown) {
        console.error(`Pull lever error (attempt ${attempt}):`, error);

        // Check if this is a blockhash expiration error
        const isExpiredError =
          error instanceof Error &&
          (error.message?.includes("block height exceeded") ||
            error.message?.includes("expired") ||
            error.message?.includes("Blockhash not found"));

        if (isExpiredError && attempt < maxAttempts) {
          // Retry with fresh blockhash
          setStatus({
            type: "error",
            message: `Transaction expired, retrying (${attempt}/${maxAttempts})...`,
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        // Final attempt failed or non-retryable error
        setStatus({
          type: "error",
          message:
            error instanceof Error ? error.message : "Failed to pull lever",
        });
        break;
      }
    }

    setLoading(false);
  };

  if (!publicKey) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center">
          Connect your wallet to use CPI
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
          Cross-Program Invocation: Hand program calls Lever program
        </Alert>

        <Text size="sm" c="dimmed">
          <strong>What is CPI?</strong> A cross-program invocation occurs when
          one program directly invokes instructions of another program, enabling
          composability. This example demonstrates the hand program invoking the
          lever program&apos;s switch_power instruction.{" "}
          <Anchor
            href="https://solana.com/docs/core/cpi"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            Learn more{" "}
            <IconExternalLink size={12} style={{ verticalAlign: "middle" }} />
          </Anchor>
        </Text>

        <Alert color="green" variant="light" style={{ fontSize: "0.85rem" }}>
          <Text size="xs" fw={500} mb={4}>
            ✅ Programs Deployed
          </Text>
          <Text size="xs">
            Hand: 66EGDNRa6Na6rQc1bZqKMP6qyVwCdJ2Y36ZUhy4eJKWY
            <br />
            Lever: DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt
          </Text>
        </Alert>

        {!powerAccount ? (
          <Button onClick={initializeLever} loading={loading} fullWidth>
            Initialize Lever
          </Button>
        ) : (
          <>
            <Group justify="center">
              <Badge
                size="lg"
                variant="filled"
                color={isPowerOn ? "green" : "red"}
                leftSection={
                  isPowerOn ? <IconBolt size={16} /> : <IconBoltOff size={16} />
                }
              >
                Power is {isPowerOn ? "ON" : "OFF"}
              </Badge>
            </Group>

            <TextInput
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <Button
              onClick={pullLever}
              loading={loading}
              fullWidth
              variant="gradient"
            >
              Pull the Lever!
            </Button>
          </>
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
      </Stack>
    </Card>
  );
}
