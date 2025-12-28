"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function StakePoolPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Stake Pool
          </Title>
          <Text c="dimmed">Pooled SOL Staking</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Stake Pools aggregate SOL from multiple users to stake with
              validators, providing liquid staking tokens (LSTs) in return.
              Users earn staking rewards while maintaining liquidity.
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
