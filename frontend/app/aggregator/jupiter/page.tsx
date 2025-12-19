"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function JupiterPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Jupiter Aggregator</Title>
          <Text c="dimmed" size="lg">
            The leading liquidity aggregator on Solana
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Jupiter?</Title>
          <Stack gap="md">
            <Text>
              Jupiter is Solana's premier swap aggregator that routes trades across multiple DEXs to find the best price for users. It connects to all major liquidity sources including AMMs, order books, and specialized protocols.
            </Text>
            <Text>
              Core features include:
            </Text>
            <ul>
              <li><Text component="span">Smart routing across 20+ DEXs and liquidity sources</Text></li>
              <li><Text component="span">Limit orders with automatic execution</Text></li>
              <li><Text component="span">Dollar-cost averaging (DCA) for recurring purchases</Text></li>
              <li><Text component="span">Perpetual futures trading (Jupiter Perps)</Text></li>
              <li><Text component="span">Referral program for developers</Text></li>
            </ul>
            <Text>
              Jupiter's routing algorithm splits orders across multiple paths to minimize slippage and price impact, often beating single-DEX execution by significant margins.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program IDs</Title>
          <Stack gap="sm">
            <div>
              <Title order={3} size="h5" mb="xs">Jupiter Swap v6</Title>
              <Code block>JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4</Code>
            </div>
            <div>
              <Title order={3} size="h5" mb="xs">Jupiter Limit Order</Title>
              <Code block>jupoNjAxXgZ4rjzxzPMP4oxduvQsQtZzyknqvzYNrNu</Code>
            </div>
            <div>
              <Title order={3} size="h5" mb="xs">Jupiter DCA</Title>
              <Code block>DCA265Vj8a9CEuX1eb1LWRnDT7uK6q1xMipnNyatn23M</Code>
            </div>
            <div>
              <Title order={3} size="h5" mb="xs">Jupiter Perpetuals</Title>
              <Code block>PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu</Code>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
