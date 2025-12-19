"use client";

import {
  Container,
  Title,
  Text,
  Card,
  SimpleGrid,
  Stack,
  Badge,
  Group,
} from "@mantine/core";
import Link from "next/link";
import {
  IconArrowsExchange,
  IconCurrencyDollar,
  IconDroplet,
  IconClock,
  IconChartDots,
  IconBook,
} from "@tabler/icons-react";

export default function AmmPage() {
  const ammPrograms = [
    {
      id: "token-swap",
      name: "CPAMM (Constant Product)",
      description:
        "xy = k formula. Most popular AMM design. Based on Raydium implementation.",
      icon: <IconArrowsExchange size={32} />,
      href: "/token-swap",
      badge: "Active",
      badgeColor: "green",
      source: "Raydium AMM",
    },
    {
      id: "stable-swap",
      name: "StableSwap (Curve-style)",
      description:
        "Hybrid invariant optimized for pegged assets. Based on Saber implementation.",
      icon: <IconCurrencyDollar size={32} />,
      href: "/amm/stable-swap",
      badge: "Coming Soon",
      badgeColor: "blue",
      source: "Saber StableSwap",
    },
    {
      id: "clmm",
      name: "CLMM (Concentrated Liquidity)",
      description:
        "Liquidity in price ranges for capital efficiency. Based on Orca Whirlpools.",
      icon: <IconDroplet size={32} />,
      href: "/amm/clmm",
      badge: "Coming Soon",
      badgeColor: "blue",
      source: "Orca Whirlpools",
    },
    {
      id: "twamm",
      name: "TWAMM (Time-Weighted)",
      description:
        "Execute large orders over time to minimize price impact. Based on OpenBook TWAP.",
      icon: <IconClock size={32} />,
      href: "/amm/twamm",
      badge: "Coming Soon",
      badgeColor: "blue",
      source: "OpenBook TWAP",
    },
    {
      id: "weighted",
      name: "CMMM (Weighted Pools)",
      description:
        "x^w * y^(1-w) = k. Generalized constant mean for multi-asset pools.",
      icon: <IconChartDots size={32} />,
      href: "/amm/weighted",
      badge: "Coming Soon",
      badgeColor: "blue",
      source: "Custom Implementation",
    },
    {
      id: "orderbook",
      name: "Order Book DEX",
      description:
        "Central limit order book (CLOB) for traditional order matching. Phoenix & OpenBook v2.",
      icon: <IconBook size={32} />,
      href: "/amm/orderbook",
      badge: "Coming Soon",
      badgeColor: "blue",
      source: "Phoenix v1 / OpenBook v2",
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="md" mb="xs">
            <Title
              order={1}
              style={{
                background:
                  "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Automated Market Makers
            </Title>
          </Group>
          <Text c="dimmed" size="lg" mb="xl">
            Decentralized liquidity protocols for token swaps
          </Text>
        </div>

        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.7)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Stack gap="md">
            <Title order={3}>What is an AMM?</Title>
            <Text c="dimmed">
              Automated Market Makers (AMMs) are decentralized exchange
              protocols that use mathematical formulas to price assets. Instead
              of traditional order books, AMMs use liquidity pools where users
              can trade tokens automatically.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Constant Product (xy = k)
                </Text>
                <Text size="sm" c="dimmed">
                  The most popular AMM formula. Product of token reserves
                  remains constant.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Liquidity Pools
                </Text>
                <Text size="sm" c="dimmed">
                  Users provide token pairs and earn fees from trades
                  proportional to their share.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Decentralized Trading
                </Text>
                <Text size="sm" c="dimmed">
                  No order books, no intermediaries. Trades execute instantly
                  against the pool.
                </Text>
              </div>
            </SimpleGrid>
          </Stack>
        </Card>

        <div>
          <Title order={2} mb="md">
            Available AMM Programs
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {ammPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{
                  textDecoration: "none",
                  pointerEvents:
                    program.badge === "Coming Soon" ? "none" : "auto",
                }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor:
                      program.badge === "Coming Soon" ? "default" : "pointer",
                    opacity: program.badge === "Coming Soon" ? 0.6 : 1,
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (program.badge !== "Coming Soon") {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (program.badge !== "Coming Soon") {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                    }
                  }}
                >
                  <Stack gap="md">
                    <Group justify="space-between">
                      <div style={{ color: "rgb(203, 166, 247)" }}>
                        {program.icon}
                      </div>
                      <Badge color={program.badgeColor} variant="light">
                        {program.badge}
                      </Badge>
                    </Group>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm" mb="xs">
                        {program.description}
                      </Text>
                      <Text size="xs" c="dimmed" fw={500}>
                        Source: {program.source}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
}
