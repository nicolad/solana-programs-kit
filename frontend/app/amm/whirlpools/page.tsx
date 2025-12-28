"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function WhirlpoolsPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Orca Whirlpools
          </Title>
          <Text c="dimmed">Concentrated Liquidity AMM</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Orca Whirlpools is a concentrated liquidity AMM that allows
              liquidity providers to set custom price ranges for their capital,
              optimizing capital efficiency and fee generation.
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
