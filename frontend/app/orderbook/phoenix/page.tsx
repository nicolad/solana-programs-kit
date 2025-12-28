"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function PhoenixPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Phoenix
          </Title>
          <Text c="dimmed">Central Limit Order Book</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Phoenix is a high-performance central limit order book (CLOB) DEX
              built on Solana, offering advanced trading features and deep
              liquidity.
            </Text>
            <Text c="dimmed" size="sm">
              This page is under construction. Implementation coming soon.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
