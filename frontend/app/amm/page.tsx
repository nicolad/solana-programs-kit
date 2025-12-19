"use client";

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Card,
  Group,
  Badge,
} from "@mantine/core";
import {
  IconChartLine,
  IconArrowsExchange,
  IconScale,
  IconDroplet,
} from "@tabler/icons-react";

export default function AmmOverviewPage() {
  const ammTypes = [
    {
      title: "Constant Product AMM (CPAMM)",
      description:
        "Classic x * y = k formula used by Uniswap V2 and Raydium CPAMM. Simple and efficient for most trading pairs.",
      icon: <IconArrowsExchange size={32} />,
      examples: ["Raydium CPAMM", "Token Swap Program"],
      formula: "x * y = k",
    },
    {
      title: "Stable Swap AMM",
      description:
        "Optimized for stablecoin pairs with minimal slippage. Uses amplification coefficient for better price stability.",
      icon: <IconScale size={32} />,
      examples: ["Saber StableSwap"],
      formula: "Curve-style StableSwap",
    },
    {
      title: "Concentrated Liquidity AMM (CLMM)",
      description:
        "Allows liquidity providers to concentrate capital within custom price ranges for better capital efficiency.",
      icon: <IconDroplet size={32} />,
      examples: ["Orca Whirlpools", "Raydium CLMM"],
      formula: "Uniswap V3 style",
    },
  ];

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
            <IconChartLine size={40} style={{ color: "rgb(180, 190, 254)" }} />
            <div>
              <Title order={1}>Automated Market Makers (AMMs)</Title>
              <Text c="dimmed" size="sm">
                Overview of AMM types and implementations on Solana
              </Text>
            </div>
          </Group>

          <Text mt="md">
            Automated Market Makers (AMMs) are decentralized exchange protocols
            that use mathematical formulas to price assets and enable trustless
            token swaps without traditional order books. Each AMM type is
            optimized for different use cases.
          </Text>
        </Paper>

        <Title order={2}>AMM Types</Title>

        <Stack gap="md">
          {ammTypes.map((amm) => (
            <Card
              key={amm.title}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                backgroundColor: "rgba(30, 30, 46, 0.5)",
                borderColor: "rgba(88, 91, 112, 0.3)",
              }}
            >
              <Group align="flex-start" mb="md">
                <div style={{ color: "rgb(180, 190, 254)" }}>{amm.icon}</div>
                <div style={{ flex: 1 }}>
                  <Title order={3}>{amm.title}</Title>
                  <Text size="sm" c="dimmed" mt="xs">
                    {amm.description}
                  </Text>
                </div>
              </Group>

              <Group gap="xs" mb="sm">
                <Text size="sm" fw={600}>
                  Formula:
                </Text>
                <Badge variant="light">{amm.formula}</Badge>
              </Group>

              <Group gap="xs">
                <Text size="sm" fw={600}>
                  Examples:
                </Text>
                {amm.examples.map((example) => (
                  <Badge key={example} variant="outline">
                    {example}
                  </Badge>
                ))}
              </Group>
            </Card>
          ))}
        </Stack>

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
            Key Concepts
          </Title>
          <Stack gap="sm">
            <div>
              <Text fw={600} size="sm">
                Liquidity Pools
              </Text>
              <Text size="sm" c="dimmed">
                Smart contracts that hold token reserves and facilitate swaps
                based on the AMM formula.
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                Slippage
              </Text>
              <Text size="sm" c="dimmed">
                The difference between expected and actual execution price,
                influenced by trade size and pool depth.
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                Impermanent Loss
              </Text>
              <Text size="sm" c="dimmed">
                Temporary loss of funds when providing liquidity compared to
                simply holding the tokens.
              </Text>
            </div>
            <div>
              <Text fw={600} size="sm">
                LP Tokens
              </Text>
              <Text size="sm" c="dimmed">
                Tokens representing your share of the liquidity pool, used to
                redeem your position plus fees.
              </Text>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
