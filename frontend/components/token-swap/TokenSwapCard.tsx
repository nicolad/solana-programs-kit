"use client";

import { useState } from "react";
import { Card, Tabs, Stack, Text, Alert, Group, Badge } from "@mantine/core";
import {
  IconArrowsExchange,
  IconDroplet,
  IconCurrencyDollar,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateAmmForm } from "./CreateAmmForm";
import { CreatePoolForm } from "./CreatePoolForm";
import { SwapForm } from "./SwapForm";
import { LiquidityForm } from "./LiquidityForm";

export function TokenSwapCard() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<string | null>("swap");

  if (!connected) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Wallet not connected"
          color="blue"
        >
          Please connect your wallet to use the Token Swap AMM.
        </Alert>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Constant Product AMM
          </Text>
          <Badge color="blue" variant="light">
            CPAMM (xy = k)
          </Badge>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab
              value="swap"
              leftSection={<IconArrowsExchange size={16} />}
            >
              Swap
            </Tabs.Tab>
            <Tabs.Tab value="liquidity" leftSection={<IconDroplet size={16} />}>
              Liquidity
            </Tabs.Tab>
            <Tabs.Tab
              value="create-pool"
              leftSection={<IconCurrencyDollar size={16} />}
            >
              Create Pool
            </Tabs.Tab>
            <Tabs.Tab
              value="create-amm"
              leftSection={<IconCurrencyDollar size={16} />}
            >
              Create AMM
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="swap" pt="md">
            <SwapForm />
          </Tabs.Panel>

          <Tabs.Panel value="liquidity" pt="md">
            <LiquidityForm />
          </Tabs.Panel>

          <Tabs.Panel value="create-pool" pt="md">
            <CreatePoolForm />
          </Tabs.Panel>

          <Tabs.Panel value="create-amm" pt="md">
            <CreateAmmForm />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Card>
  );
}
