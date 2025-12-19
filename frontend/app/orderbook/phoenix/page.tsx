"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function PhoenixPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Phoenix</Title>
          <Text c="dimmed" size="lg">
            High-performance central limit order book (CLOB) on Solana
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Phoenix?</Title>
          <Stack gap="md">
            <Text>
              Phoenix is a fully on-chain central limit order book (CLOB) exchange built by Ellipsis Labs. It combines the familiar order book model with Solana's high throughput and low latency to provide a CEX-like trading experience on-chain.
            </Text>
            <Text>
              Distinguishing features:
            </Text>
            <ul>
              <li><Text component="span">Ultra-low latency matching engine optimized for Solana</Text></li>
              <li><Text component="span">Traditional limit and market orders with post-only options</Text></li>
              <li><Text component="span">Market maker incentives and fee tiers</Text></li>
              <li><Text component="span">Composable with other Solana protocols</Text></li>
              <li><Text component="span">Seat-based maker fee discounts</Text></li>
            </ul>
            <Text>
              Phoenix is designed for professional traders and market makers who require precise price discovery and order control that AMMs cannot provide.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Order Book Mechanics</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Price-Time Priority</Title>
              <Text>Orders are matched using standard price-time priority. Best prices execute first, with earlier orders at the same price having priority.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Maker-Taker Model</Title>
              <Text>Makers (limit orders adding liquidity) receive rebates, while takers (orders removing liquidity) pay fees.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Self-Trade Prevention</Title>
              <Text>Built-in mechanisms prevent traders from matching with their own orders.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
