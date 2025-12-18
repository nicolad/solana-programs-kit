"use client";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { useProgram } from "./hooks/useProgram";
import { AirdropButton } from "./AirdropButton";
import { TransferToCliButton } from "./TransferToCliButton";
import { Stack, Group, Text, Loader } from "@mantine/core";

export function BalanceDisplay() {
  const { publicKey, connection } = useProgram();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      try {
        const lamports = await connection.getBalance(publicKey);
        const solBalance = lamports / LAMPORTS_PER_SOL;
        setBalance(solBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();

    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);

    return () => clearInterval(interval);
  }, [publicKey, connection]);

  if (!publicKey) {
    return null;
  }

  return (
    <Stack gap="sm" align="center" w="100%">
      <Group
        gap="sm"
        px="md"
        py="sm"
        style={{
          background: "rgba(49, 50, 68, 0.5)",
          borderRadius: "8px",
          border: "1px solid rgba(88, 91, 112, 0.3)",
        }}
      >
        <Group gap="xs">
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "rgb(166, 227, 161)",
              borderRadius: "9999px",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          ></div>
          <Text size="sm" c="dimmed">
            Balance:
          </Text>
        </Group>
        {isLoading ? (
          <Loader size="xs" color="violet" />
        ) : (
          <Text size="sm" fw={600} c="violet.3">
            {balance !== null ? `${balance.toFixed(4)} SOL` : "—"}
          </Text>
        )}
      </Group>
      <Group gap="xs">
        <AirdropButton />
        <TransferToCliButton />
      </Group>
    </Stack>
  );
}
