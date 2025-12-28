"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function SinglePoolPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Single Pool Staking
          </Title>
          <Text c="dimmed">Basic Token Staking</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Single Pool Staking allows users to stake tokens in a pool and
              earn rewards over time. A simple and effective way to incentivize
              token holding and community participation.
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
