"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Keypair } from "@solana/web3.js";
import {
  Button,
  TextInput,
  Card,
  Stack,
  Title,
  Text,
  NumberInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/lib/useTokenSwapProgram";

export function CreateAMMForm() {
  const wallet = useWallet();
  const program = useTokenSwapProgram();
  const [fee, setFee] = useState<number>(30); // 0.3% default fee in basis points
  const [creating, setCreating] = useState(false);

  const handleCreateAMM = async () => {
    if (!wallet.publicKey || !program) {
      notifications.show({
        title: "Error",
        message: "Please connect your wallet",
        color: "red",
      });
      return;
    }

    if (fee < 0 || fee >= 10000) {
      notifications.show({
        title: "Error",
        message: "Fee must be between 0 and 10000 basis points",
        color: "red",
      });
      return;
    }

    setCreating(true);
    try {
      const ammId = Keypair.generate().publicKey;

      const tx = await (program as any).methods
        .createAmm(ammId, fee)
        .accounts({
          admin: wallet.publicKey,
          payer: wallet.publicKey,
        })
        .rpc();

      notifications.show({
        title: "Success",
        message: `AMM created! TX: ${tx}`,
        color: "green",
      });
    } catch (error: any) {
      console.error("Error creating AMM:", error);
      notifications.show({
        title: "Error",
        message: `Failed to create AMM: ${error.message || error}`,
        color: "red",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Create New AMM</Title>
        <Text size="sm" c="dimmed">
          Create a new Automated Market Maker with configurable fees
        </Text>

        <NumberInput
          label="Fee (in basis points)"
          description="1 basis point = 0.01%. Default: 30 (0.3%)"
          value={fee}
          onChange={(val) => setFee(Number(val))}
          min={0}
          max={9999}
          step={1}
        />

        <Button
          onClick={handleCreateAMM}
          fullWidth
          disabled={!wallet.publicKey || !program || creating}
          loading={creating}
        >
          Create AMM
        </Button>
      </Stack>
    </Card>
  );
}
