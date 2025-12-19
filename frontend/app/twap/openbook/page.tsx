"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function OpenBookTWAPPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">OpenBook TWAP</Title>
          <Text c="dimmed" size="lg">
            Time-Weighted Average Price orders for OpenBook markets
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is OpenBook TWAP?</Title>
          <Stack gap="md">
            <Text>
              OpenBook TWAP (Time-Weighted Average Price) is a program that executes large orders over time on OpenBook markets to minimize price impact and achieve better average execution prices. It's designed for traders who need to fill substantial orders without causing significant market movement.
            </Text>
            <Text>
              Key features include:
            </Text>
            <ul>
              <li><Text component="span">Split large orders into smaller chunks executed over time</Text></li>
              <li><Text component="span">Configurable execution intervals and randomization</Text></li>
              <li><Text component="span">Limit price protection to avoid unfavorable fills</Text></li>
              <li><Text component="span">Fully on-chain execution via Clockwork automation</Text></li>
              <li><Text component="span">Reduces market impact and slippage for large trades</Text></li>
            </ul>
            <Text>
              TWAP orders are essential for institutions and large traders who need to accumulate or distribute positions without telegraphing their intentions or moving the market against themselves.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">How It Works</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Order Splitting</Title>
              <Text>A large order is divided into many smaller orders that execute at regular intervals. This smooths out the buying/selling pressure.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Time Intervals</Title>
              <Text>Users specify the total duration and interval frequency. For example, execute 1% of order every 5 minutes over 8 hours.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Price Limits</Title>
              <Text>TWAP orders can include maximum (for buys) or minimum (for sells) price limits to prevent execution at unfavorable prices during volatility.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Automation</Title>
              <Text>Clockwork triggers order chunks automatically based on the schedule, no manual intervention required once the TWAP is initiated.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>TWAPrdhADy2aTKN5iFZtNnkQYXERD9NvKjPFVPMSCNN</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
