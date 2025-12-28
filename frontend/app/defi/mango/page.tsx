"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function MangoPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Mango Markets
          </Title>
          <Text c="dimmed">Perpetuals & Margin Trading</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Mango Markets is a fully decentralized, cross-margin trading
              platform with up to 20x leverage. Trade spot markets and
              perpetual futures with deep liquidity and low fees.
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
