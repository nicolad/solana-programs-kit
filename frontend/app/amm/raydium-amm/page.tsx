"use client";

import { useState } from "react";
import { Container, Title, Text, Paper, Stack, Card, Group, Code, Badge, List, Button, TextInput, Alert } from "@mantine/core";
import { IconArrowsExchange, IconInfoCircle } from "@tabler/icons-react";
import { WalletRequired } from "@/components/WalletRequired";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function RaydiumAmmPage() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [poolAddress, setPoolAddress] = useState("");

  const PROGRAM_ID = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";

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
            <IconArrowsExchange size={40} style={{ color: "rgb(180, 190, 254)" }} />
            <div>
              <Title order={1}>Raydium AMM</Title>
              <Text c="dimmed" size="sm">
                Original Raydium Automated Market Maker
              </Text>
            </div>
          </Group>

          <Text mt="md">
            Raydium's original AMM implementation - a hybrid model that combines the speed and efficiency
            of an automated market maker with the order book system of Openbook (formerly Serum DEX).
          </Text>
        </Paper>

        <Alert icon={<IconInfoCircle />} title="Program Details" color="blue">
          <Stack gap="xs">
            <Text size="sm">
              <Text component="span" fw={600}>Program ID:</Text>{" "}
              <Code>{PROGRAM_ID}</Code>
            </Text>
            <Text size="sm">
              <Text component="span" fw={600}>Source Code:</Text>{" "}
              <Code>programs/raydium-amm</Code>
            </Text>
            <Text size="sm">
              <Text component="span" fw={600}>Network:</Text> Mainnet-Beta
            </Text>
          </Stack>
        </Alert>

        {!publicKey ? (
          <WalletRequired message="Connect your wallet to interact with Raydium AMM" />
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
              <Button disabled>
                Query Pool Info
              </Button>
              <Text size="xs" c="dimmed">
                Note: SDK integration available via @raydium-io/raydium-sdk
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
            Hybrid AMM Model
          </Title>
          <Stack gap="md">
            <div>
              <Text fw={600} size="sm" mb="xs">
                Dual Liquidity Sources
              </Text>
              <Text size="sm" c="dimmed">
                Raydium AMM pools provide liquidity to both the AMM and an Openbook central limit order book (CLOB).
                This unique architecture allows traders to access liquidity from both sources simultaneously.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Market Integration
              </Text>
              <Text size="sm" c="dimmed">
                Each Raydium pool is associated with an Openbook market ID, enabling order book integration
                and providing deeper liquidity for traders.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Constant Product Formula
              </Text>
              <Code block>x * y = k</Code>
              <Text size="sm" c="dimmed" mt="xs">
                Uses the classic constant product formula for the AMM portion of liquidity.
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
            Key Features
          </Title>
          <List spacing="sm" size="sm">
            <List.Item>
              <Text fw={600}>Openbook Integration</Text>
              <Text c="dimmed" size="sm">
                Requires an Openbook market ID for pool creation
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>Shared Liquidity</Text>
              <Text c="dimmed" size="sm">
                Liquidity is accessible to both AMM swappers and order book traders
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>Fee Earning</Text>
              <Text c="dimmed" size="sm">
                LPs earn fees from both AMM swaps and order book trades
              </Text>
            </List.Item>
            <List.Item>
              <Text fw={600}>SPL Token Support</Text>
              <Text c="dimmed" size="sm">
                Supports standard SPL tokens
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
            Advantages
          </Title>
          <Stack gap="sm">
            <div>
              <Badge variant="light" mb="xs">Best Execution</Badge>
              <Text size="sm" c="dimmed">
                Traders can access liquidity from both the AMM pool and the order book for better prices
              </Text>
            </div>
            <div>
              <Badge variant="light" mb="xs">Deeper Liquidity</Badge>
              <Text size="sm" c="dimmed">
                Combining AMM and order book liquidity results in better fills for large orders
              </Text>
            </div>
            <div>
              <Badge variant="light" mb="xs">Proven Track Record</Badge>
              <Text size="sm" c="dimmed">
                Battle-tested implementation that has processed billions in trading volume
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
            Technical Details
          </Title>
          <Stack gap="sm">
            <div>
              <Text fw={600} size="sm">Repository</Text>
              <Text size="sm" c="dimmed">
                <Code>programs/raydium-amm</Code>
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">License</Text>
              <Text size="sm" c="dimmed">Apache 2.0</Text>
            </div>
            <div>
              <Text fw={600} size="sm">Requirements</Text>
              <Text size="sm" c="dimmed">
                Openbook market ID required for pool creation
              </Text>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
