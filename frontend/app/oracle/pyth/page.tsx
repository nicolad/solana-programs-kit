"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function PythPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Pyth Network</Title>
          <Text c="dimmed" size="lg">
            High-fidelity price oracle for DeFi applications
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Pyth?</Title>
          <Stack gap="md">
            <Text>
              Pyth Network is a first-party oracle that delivers high-frequency market data from major exchanges and market makers directly to smart contracts. Unlike traditional oracles that aggregate from external sources, Pyth's data comes directly from the source.
            </Text>
            <Text>
              Core features include:
            </Text>
            <ul>
              <li><Text component="span">Sub-second price updates from 90+ data providers</Text></li>
              <li><Text component="span">Confidence intervals for each price feed</Text></li>
              <li><Text component="span">Pull-based model for gas-efficient on-chain verification</Text></li>
              <li><Text component="span">400+ price feeds across crypto, equities, FX, and commodities</Text></li>
              <li><Text component="span">Cross-chain: available on 50+ blockchains</Text></li>
            </ul>
            <Text>
              Pyth's pull oracle design means applications only pay for price updates when they need them, rather than subscribing to continuous updates. This dramatically reduces costs while maintaining freshness.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">How It Works</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Data Providers</Title>
              <Text>Major exchanges (Binance, OKX, etc.) and market makers publish prices directly to Pyth. Each provider stakes reputation on accuracy.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Aggregation</Title>
              <Text>Pyth aggregates prices from multiple providers and calculates confidence intervals, filtering outliers and manipulation attempts.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Pull Updates</Title>
              <Text>Applications fetch signed price updates from Pyth's off-chain infrastructure and submit them on-chain only when needed.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program IDs</Title>
          <Stack gap="sm">
            <div>
              <Title order={3} size="h5" mb="xs">Mainnet</Title>
              <Code block>FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH</Code>
            </div>
            <div>
              <Title order={3} size="h5" mb="xs">Devnet</Title>
              <Code block>gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s</Code>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
