"use client";

import React, { useState } from "react";
import { Stack, Text, Button, Code } from "@mantine/core";
import { useProgram } from "./hooks/useProgram";
import { toast } from "sonner";

export function WalletAddress() {
  const { publicKey, connected } = useProgram();
  const [copied, setCopied] = useState(false);

  if (!connected || !publicKey) {
    return null;
  }

  const address = publicKey.toBase58();
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied!", {
        description: "Paste this in your terminal to receive SOL",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy address");
    }
  };

  return (
    <Stack gap="xs" w="100%" align="center">
      <Text size="xs" c="dimmed">
        Your Wallet
      </Text>
      <Button
        onClick={copyAddress}
        variant="default"
        size="sm"
        styles={{
          root: {
            background: "rgba(49, 50, 68, 0.4)",
            border: "1px solid rgba(88, 91, 112, 0.4)",
            fontFamily: "monospace",
            "&:hover": {
              background: "rgba(49, 50, 68, 0.6)",
              borderColor: "rgba(180, 190, 254, 0.4)",
            },
          },
        }}
      >
        <Text size="sm" mr="xs">
          {shortAddress}
        </Text>
        <span
          style={{
            color: copied ? "rgb(180, 190, 254)" : "rgb(147, 153, 178)",
          }}
        >
          {copied ? "✓" : "📋"}
        </span>
      </Button>
      <Text size="xs" c="dimmed">
        CLI: <Code>solana transfer {shortAddress} 0.5</Code>
      </Text>
    </Stack>
  );
}
