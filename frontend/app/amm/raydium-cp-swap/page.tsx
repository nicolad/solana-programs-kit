"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Card,
  Group,
  Code,
  Badge,
  List,
  Button,
  TextInput,
  Alert,
} from "@mantine/core";
import {
  IconArrowsExchange,
  IconShieldCheck,
  IconInfoCircle,
} from "@tabler/icons-react";
import WalletRequired from "@/components/WalletRequired";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function RaydiumCpSwapPage() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [poolAddress, setPoolAddress] = useState("");

  const PROGRAM_ID = "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C";

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Paper
          p="xl"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.7)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Group mb="md">
            <IconArrowsExchange
              size={40}
              style={{ color: "rgb(180, 190, 254)" }}
            />
            <div>
              <Title order={1}>Raydium CP Swap</Title>
              <Text c="dimmed" size="sm">
                Optimized Constant Product AMM
              </Text>
            </div>
          </Group>

          <Text mt="md">
            A revamped constant product AMM program optimized for
            straightforward pool deployment with modern features and
            integrations. Built with Anchor framework for improved developer
            experience.
          </Text>

          <Group mt="md" gap="xs">
            <Badge
              leftSection={<IconShieldCheck size={14} />}
              variant="light"
              color="green"
            >
              Audited by MadShield
            </Badge>
            <Badge variant="light" color="blue">
              Token-2022 Support
            </Badge>
            <Badge variant="light" color="violet">
              Built-in Oracle
            </Badge>
          </Group>
        </Paper>

        <Alert icon={<IconInfoCircle />} title="Program Details" color="blue">
          <Stack gap="xs">
            <Text size="sm">
              <Text component="span" fw={600}>
                Program ID:
              </Text>{" "}
              <Code>{PROGRAM_ID}</Code>
            </Text>
            <Text size="sm">
              <Text component="span" fw={600}>
                Source Code:
              </Text>{" "}
              <Code>programs/raydium-cp-swap</Code>
            </Text>
            <Text size="sm">
              <Text component="span" fw={600}>
                Network:
              </Text>{" "}
              Mainnet-Beta
            </Text>
          </Stack>
        </Alert>

        {!publicKey ? (
          <WalletRequired message="Connect your wallet to interact with Raydium CP Swap" />
        ) : (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              backgroundColor: "rgba(30, 30, 46, 0.5)",
              borderColor: "rgba(88, 91, 112, 0.3)",
            }}
          >
            <Title order={3} mb="md">
              Pool Interaction Demo
            </Title>
            <Stack gap="md">
              <TextInput
                label="Pool Address"
                placeholder="Enter pool address to query"
                value={poolAddress}
                onChange={(e) => setPoolAddress(e.target.value)}
              />
              <Button disabled>Query Pool Info</Button>
              <Text size="xs" c="dimmed">
                Note: Full integration requires building the Anchor IDL. Run{" "}
                <Code>anchor build</Code> in the program directory.
              </Text>
            </Stack>
          </Card>
        )}

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            Available Instructions
          </Title>
          <Stack gap="sm">
            <Badge variant="outline">create_amm_config</Badge>
            <Badge variant="outline">create_pool</Badge>
            <Badge variant="outline">deposit</Badge>
            <Badge variant="outline">withdraw</Badge>
            <Badge variant="outline">swap_base_input</Badge>
            <Badge variant="outline">swap_base_output</Badge>
          </Stack>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            Key Improvements
          </Title>
          <Stack gap="md">
            <div>
              <Text fw={600} size="sm" mb="xs">
                No Openbook Dependency
              </Text>
              <Text size="sm" c="dimmed">
                Unlike the original Raydium AMM, no Openbook market ID is
                required for pool creation. This simplifies deployment and
                reduces setup costs.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Token-2022 Support
              </Text>
              <Text size="sm" c="dimmed">
                Full support for Token-2022 program extensions including
                transfer fees, transfer hooks, and other modern token features.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Built-in Price Oracle
              </Text>
              <Text size="sm" c="dimmed">
                Integrated time-weighted average price (TWAP) oracle for
                reliable price feeds without external dependencies.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Anchor Optimization
              </Text>
              <Text size="sm" c="dimmed">
                Rewritten in Anchor framework for better security,
                maintainability, and developer experience.
              </Text>
            </div>
          </Stack>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            How It Works
          </Title>
          <Stack gap="sm">
            <div>
              <Text fw={600} size="sm" mb="xs">
                Constant Product Formula
              </Text>
              <Code block>x * y = k</Code>
              <Text size="sm" c="dimmed" mt="xs">
                Uses the classic constant product market maker formula. When you
                trade token X for token Y, the product of their reserves remains
                constant.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Automated Pricing
              </Text>
              <Text size="sm" c="dimmed">
                Prices are determined algorithmically based on the ratio of
                tokens in the pool. No manual price setting required.
              </Text>
            </div>
          </Stack>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            Core Features
          </Title>
          <List spacing="sm" size="sm">
            <List.Item>
              <Text fw={600}>Token Swaps</Text>
              <Text c="dimmed" size="sm">
                Swap tokens at the current pool price with automatic slippage
                protection
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>Liquidity Provision</Text>
              <Text c="dimmed" size="sm">
                Add liquidity to pools and earn trading fees from swappers
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>LP Token Rewards</Text>
              <Text c="dimmed" size="sm">
                Receive LP tokens representing your share of the pool and earned
                fees
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>Price Oracle</Text>
              <Text c="dimmed" size="sm">
                Built-in TWAP oracle provides manipulation-resistant price data
              </Text>
            </List.Item>
          </List>
        </Card>

        <Paper
          p="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            Security & Audit
          </Title>
          <Stack gap="sm">
            <div>
              <Text fw={600} size="sm">
                Audited
              </Text>
              <Text size="sm" c="dimmed">
                Audited by MadShield in Q1 2024
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                Bug Bounty
              </Text>
              <Text size="sm" c="dimmed">
                In-scope for Raydium's Immunefi bug bounty program
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                Open Source
              </Text>
              <Text size="sm" c="dimmed">
                Full source code available at{" "}
                <Code>programs/raydium-cp-swap</Code>
              </Text>
            </div>
          </Stack>
        </Paper>

        <Paper
          p="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            Integration Guide
          </Title>
          <Stack gap="md">
            <div>
              <Text fw={600} size="sm" mb="xs">
                1. Build the Program
              </Text>
              <Code block>cd programs/raydium-cp-swap && anchor build</Code>
            </div>
            <div>
              <Text fw={600} size="sm" mb="xs">
                2. Generate TypeScript Types
              </Text>
              <Code block>
                anchor idl parse -f programs/cp-swap/src/lib.rs -o
                target/idl/raydium_cp_swap.json
              </Code>
            </div>
            <div>
              <Text fw={600} size="sm" mb="xs">
                3. Use in Your App
              </Text>
              <Code block>{`import { Program } from '@coral-xyz/anchor';
import idl from './idl/raydium_cp_swap.json';

const program = new Program(idl, provider);`}</Code>
            </div>
          </Stack>
        </Paper>

        <Paper
          p="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.5)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Title order={3} mb="md">
            When to Use
          </Title>
          <Stack gap="sm">
            <div>
              <Badge variant="light" mb="xs">
                New Pools
              </Badge>
              <Text size="sm" c="dimmed">
                Best choice for creating new liquidity pools without Openbook
                market
              </Text>
            </div>
            <div>
              <Badge variant="light" mb="xs">
                Token-2022
              </Badge>
              <Text size="sm" c="dimmed">
                Required for pools with Token-2022 tokens and their extensions
              </Text>
            </div>
            <div>
              <Badge variant="light" mb="xs">
                Simple AMM
              </Badge>
              <Text size="sm" c="dimmed">
                Ideal for straightforward AMM functionality without order book
                complexity
              </Text>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
