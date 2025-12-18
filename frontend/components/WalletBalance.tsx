"use client";

import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Text, Group, Box } from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";

export function WalletBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    };

    fetchBalance();

    // Subscribe to account changes
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [publicKey, connection]);

  if (!publicKey || balance === null) {
    return null;
  }

  return (
    <Box
      p="sm"
      style={{
        background: "rgba(88, 91, 112, 0.2)",
        borderRadius: "0.5rem",
        border: "1px solid rgba(88, 91, 112, 0.3)",
      }}
    >
      <Group gap="xs" wrap="nowrap">
        <IconWallet size={16} style={{ color: "rgb(148, 187, 233)" }} />
        <div>
          <Text size="xs" c="dimmed">
            Balance
          </Text>
          <Text size="sm" fw={600}>
            {balance.toFixed(4)} SOL
          </Text>
        </div>
      </Group>
    </Box>
  );
}
