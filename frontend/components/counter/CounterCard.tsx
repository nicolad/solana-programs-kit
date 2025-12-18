"use client";

import { Card, Stack } from "@mantine/core";
import { BalanceDisplay } from "./BalanceDisplay";
import { CounterDisplay } from "./CounterDisplay";
import { DecrementButton } from "./DecrementButton";
import { IncrementButton } from "./IncrementButton";
import React from "react";
import { WalletButton } from "./WalletButton";
import { WalletAddress } from "./WalletAddress";

/**
 * CounterCard is the main component for the Counter dApp.
 * It provides a user interface for interacting with a Solana counter program.
 */
export function CounterCard() {
  return (
    <Card
      w={350}
      mx="auto"
      padding="xl"
      radius="md"
      withBorder
      style={{
        backgroundColor: "rgba(30, 30, 46, 0.7)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(88, 91, 112, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
      }}
    >
      <Stack gap="xl" align="center">
        <WalletAddress />
        <WalletButton />
        <BalanceDisplay />
        <CounterDisplay />
        <Stack gap="md" w="100%" align="center">
          <IncrementButton />
          <DecrementButton />
        </Stack>
      </Stack>
    </Card>
  );
}
