"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function StableswapPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title
            order={1}
            mb="xs"
            style={{
              background:
                "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            StableSwap AMM
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Curve-style AMM optimized for stablecoin trading
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
            <Title order={3}>What is StableSwap?</Title>
            <Text c="dimmed">
              StableSwap is a specialized AMM designed for trading pegged assets like stablecoins. 
              It uses a hybrid invariant that combines constant product and constant sum formulas, 
              providing extremely low slippage for similarly priced assets while maintaining security 
              against price divergence.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Hybrid Invariant
                </Text>
                <Text size="sm" c="dimmed">
                  Combines CPMM and CSMM using an amplification coefficient for low slippage.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Pegged Asset Trading
                </Text>
                <Text size="sm" c="dimmed">
                  Optimized for assets expected to trade at 1:1 like USDC, USDT, and DAI.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Low Slippage
                </Text>
                <Text size="sm" c="dimmed">
                  Minimal price impact for stable asset swaps, maximizing capital efficiency.
                </Text>
              </div>
            </SimpleGrid>
          </Stack>
        </Card>

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
            <Title order={3}>Reference Implementation</Title>
            <Text c="dimmed">
              Based on Saber's StableSwap implementation, which brings Curve's proven stableswap 
              algorithm to Solana with optimizations for high-throughput trading.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/saber-hq/stable-swap" target="_blank">Saber StableSwap</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
