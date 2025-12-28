"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function OpenbookV2Page() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            OpenBook v2
          </Title>
          <Text c="dimmed">Central Limit Order Book</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              OpenBook v2 is a community-driven fork of Serum, providing a
              decentralized central limit order book (CLOB) exchange on Solana
              with improved features and governance.
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
