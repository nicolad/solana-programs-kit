"use client";

import { Container, Title, Text, Stack, Tabs, Group } from "@mantine/core";
import { IconPlus, IconArrowsExchange, IconPool } from "@tabler/icons-react";
import { WalletRequired } from "@/components/WalletRequired";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateAMMForm } from "@/components/amm/CreateAMMForm";
import { CreatePoolForm } from "@/components/amm/CreatePoolForm";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";

export default function TokenSwapAMMPage() {
  const wallet = useWallet();
  const [ammId, setAmmId] = useState<PublicKey | null>(null);

  if (!wallet.connected) {
    return <WalletRequired />;
  }

  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Token Swap AMM
          </Title>
          <Text c="dimmed" size="lg">
            Create and manage Automated Market Maker pools with constant product
            (CPAMM) formula
          </Text>
        </div>

        <Tabs defaultValue="create-amm">
          <Tabs.List>
            <Tabs.Tab value="create-amm" leftSection={<IconPlus size={16} />}>
              Create AMM
            </Tabs.Tab>
            <Tabs.Tab value="create-pool" leftSection={<IconPool size={16} />}>
              Create Pool
            </Tabs.Tab>
            <Tabs.Tab
              value="swap"
              leftSection={<IconArrowsExchange size={16} />}
            >
              Swap
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="create-amm" pt="xl">
            <CreateAMMForm />
          </Tabs.Panel>

          <Tabs.Panel value="create-pool" pt="xl">
            <Stack gap="md">
              <Text c="dimmed" size="sm">
                Enter the AMM ID that was created in the previous step
              </Text>
              {ammId ? (
                <CreatePoolForm ammId={ammId} />
              ) : (
                <Text c="red">Please provide an AMM ID to create a pool</Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="swap" pt="xl">
            <Text c="dimmed">
              Swap interface coming soon. First create an AMM and pool.
            </Text>
          </Tabs.Panel>
        </Tabs>

        <Stack gap="sm">
          <Title order={4}>How it works</Title>
          <Text size="sm">
            1. <strong>Create AMM</strong>: Set up a new Automated Market Maker
            with configurable fees (in basis points, where 100 = 1%)
          </Text>
          <Text size="sm">
            2. <strong>Create Pool</strong>: Create a liquidity pool for a
            specific token pair
          </Text>
          <Text size="sm">
            3. <strong>Add Liquidity</strong>: Deposit tokens to earn trading
            fees
          </Text>
          <Text size="sm">
            4. <strong>Swap</strong>: Trade tokens using the constant product
            formula (x × y = k)
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
