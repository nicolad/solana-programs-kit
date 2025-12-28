"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function DriftPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Drift Protocol
          </Title>
          <Text c="dimmed">Perpetuals Trading</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Drift Protocol is a decentralized perpetuals exchange built on
              Solana, offering high leverage, deep liquidity, and innovative
              features like dynamic AMMs and cross-collateral margin.
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
