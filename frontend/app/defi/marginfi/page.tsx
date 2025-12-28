"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function MarginfiPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            MarginFi
          </Title>
          <Text c="dimmed">Decentralized Lending Protocol</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              MarginFi is a decentralized lending protocol on Solana that allows
              users to lend and borrow assets with competitive rates and
              efficient capital utilization.
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
