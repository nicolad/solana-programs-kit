"use client";

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
} from "@mantine/core";
import { IconArrowsExchange } from "@tabler/icons-react";

export default function TokenSwapPage() {
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
              <Title order={1}>Token Swap CPAMM</Title>
              <Text c="dimmed" size="sm">
                Constant Product Automated Market Maker
              </Text>
            </div>
          </Group>

          <Text mt="md">
            A constant product market maker (CPAMM) implementation using the
            classic x * y = k formula. This is similar to Uniswap V2 and
            Raydium's CPAMM pools.
          </Text>
        </Paper>

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
                Where x and y are the reserves of two tokens, and k is a
                constant. When you trade one token for another, the product of
                the reserves must remain constant.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Price Calculation
              </Text>
              <Text size="sm" c="dimmed">
                The price of a token is determined by the ratio of the reserves.
                As you buy a token, its price increases because you're removing
                it from the pool and adding the other token.
              </Text>
            </div>

            <div>
              <Text fw={600} size="sm" mb="xs">
                Slippage
              </Text>
              <Text size="sm" c="dimmed">
                Larger trades cause more price impact (slippage) because they
                change the reserve ratio more significantly. This protects
                liquidity providers from being drained by large orders.
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
          <Stack gap="md">
            <Group align="flex-start">
              <Badge variant="light" size="lg">
                Swap
              </Badge>
              <Text size="sm" style={{ flex: 1 }}>
                Trade one token for another at the current pool price
              </Text>
            </Group>

            <Group align="flex-start">
              <Badge variant="light" size="lg">
                Add Liquidity
              </Badge>
              <Text size="sm" style={{ flex: 1 }}>
                Deposit both tokens in the current ratio to earn trading fees
              </Text>
            </Group>

            <Group align="flex-start">
              <Badge variant="light" size="lg">
                Remove Liquidity
              </Badge>
              <Text size="sm" style={{ flex: 1 }}>
                Withdraw your share of the pool plus accumulated fees
              </Text>
            </Group>

            <Group align="flex-start">
              <Badge variant="light" size="lg">
                LP Tokens
              </Badge>
              <Text size="sm" style={{ flex: 1 }}>
                Receive liquidity provider tokens representing your pool share
              </Text>
            </Group>
          </Stack>
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
            Example Calculation
          </Title>
          <Stack gap="sm">
            <Text size="sm">
              <Text component="span" fw={600}>
                Initial Pool:
              </Text>{" "}
              100 SOL × 10,000 USDC = 1,000,000 (k)
            </Text>
            <Text size="sm">
              <Text component="span" fw={600}>
                Price:
              </Text>{" "}
              1 SOL = 100 USDC
            </Text>
            <Text size="sm" c="dimmed" mt="xs">
              If you swap 1 SOL, you receive approximately 99 USDC (accounting
              for slippage). The new pool state becomes: 101 SOL × 9,901 USDC ≈
              1,000,000
            </Text>
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
            Implementations
          </Title>
          <Stack gap="sm">
            <div>
              <Text fw={600} size="sm">
                Raydium CPAMM
              </Text>
              <Text size="sm" c="dimmed">
                Raydium's constant product AMM implementation on Solana
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                Token Swap Program
              </Text>
              <Text size="sm" c="dimmed">
                Classic CPAMM implementation for Solana tokens
              </Text>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
