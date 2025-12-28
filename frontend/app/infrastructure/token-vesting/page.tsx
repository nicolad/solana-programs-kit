"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function TokenVestingPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Token Vesting
          </Title>
          <Text c="dimmed">Time-locked Token Releases</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Token Vesting programs allow projects to lock tokens and release
              them over time based on customizable vesting schedules. Essential
              for team allocations, investor distributions, and more.
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
