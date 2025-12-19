"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function TwammPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title
            order={1}
            mb="xs"
            style={{
              background:
                "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TWAMM - Time-Weighted AMM
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Execute large orders gradually over time
          </Text>
        </div>

        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.7)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Stack gap="md">
            <Title order={3}>What is TWAMM?</Title>
            <Text c="dimmed">
              Time-Weighted Automated Market Maker (TWAMM) enables efficient execution of large 
              orders by splitting them into infinitely many infinitesimally small orders over time. 
              This approach minimizes price impact and provides better execution for large trades 
              compared to single block swaps.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Long-Term Orders
                </Text>
                <Text size="sm" c="dimmed">
                  Submit orders that execute gradually over hours or days.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Reduced Price Impact
                </Text>
                <Text size="sm" c="dimmed">
                  Minimize slippage by spreading large trades across multiple blocks.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Virtual Execution
                </Text>
                <Text size="sm" c="dimmed">
                  Orders execute virtually between blocks, no active participation needed.
                </Text>
              </div>
            </SimpleGrid>
          </Stack>
        </Card>

        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.7)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(88, 91, 112, 0.3)",
          }}
        >
          <Stack gap="md">
            <Title order={3}>Reference Implementation</Title>
            <Text c="dimmed">
              Based on Paradigm's TWAMM research, bringing sophisticated order execution 
              strategies to decentralized markets.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://www.paradigm.xyz/2021/07/twamm" target="_blank">Paradigm TWAMM</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
