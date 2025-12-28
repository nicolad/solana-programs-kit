"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function RaydiumClmmPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Raydium CLMM
          </Title>
          <Text c="dimmed">Concentrated Liquidity Market Maker</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Raydium CLMM (Concentrated Liquidity Market Maker) allows
              liquidity providers to concentrate their capital within custom
              price ranges, maximizing capital efficiency and earning potential.
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
