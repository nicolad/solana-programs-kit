"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function OpenbookTwapPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            OpenBook TWAP
          </Title>
          <Text c="dimmed">Time-Weighted Average Price Oracle</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              OpenBook TWAP provides time-weighted average price data from
              OpenBook markets, offering manipulation-resistant price feeds for
              DeFi protocols and applications.
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
