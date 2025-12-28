"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function ClockworkPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Clockwork
          </Title>
          <Text c="dimmed">Automation & Scheduled Transactions</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Clockwork is an automation engine for Solana that allows
              developers to schedule transactions and automate on-chain actions
              based on time or custom triggers.
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
