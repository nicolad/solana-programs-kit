"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function MeteoraDLMMPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Meteora DLMM</Title>
          <Text c="dimmed" size="lg">
            Dynamic Liquidity Market Maker with dynamic fees and bin structure
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Meteora DLMM?</Title>
          <Stack gap="md">
            <Text>
              Meteora's Dynamic Liquidity Market Maker (DLMM) is an advanced AMM that uses discrete price bins similar to Uniswap v3, but with dynamic fee optimization and better capital efficiency for LPs.
            </Text>
            <Text>
              Key innovations include:
            </Text>
            <ul>
              <li><Text component="span">Liquidity concentrated in price bins for better capital efficiency</Text></li>
              <li><Text component="span">Dynamic fees that adjust based on volatility and market conditions</Text></li>
              <li><Text component="span">Zero-slippage swaps when trading within a single bin</Text></li>
              <li><Text component="span">Flexible liquidity shapes (uniform, curve, bid-ask)</Text></li>
              <li><Text component="span">Auto-compounding fees for LPs</Text></li>
            </ul>
            <Text>
              DLMM is particularly effective for volatile pairs and stablecoin swaps, adapting fees to market conditions to maximize LP returns while maintaining competitive pricing for traders.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">How It Works</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Price Bins</Title>
              <Text>Liquidity is organized into discrete price bins. Each bin represents a specific price range, and tokens trade at the bin's constant price.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Dynamic Fees</Title>
              <Text>Fee rates adjust automatically based on volatility parameters. High volatility increases fees to compensate LPs for impermanent loss risk.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Liquidity Strategies</Title>
              <Text>LPs can choose different distribution strategies: spot (single bin), curve (normal distribution), or bid-ask (two-sided).</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
