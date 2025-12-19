"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function PhoenixPage() {
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
            Phoenix DEX
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            High-performance central limit order book
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
            <Title order={3}>What is Phoenix?</Title>
            <Text c="dimmed">
              Phoenix is a high-performance on-chain central limit order book (CLOB) DEX on Solana. 
              Unlike AMMs, it matches buy and sell orders directly, providing better price discovery 
              and execution for professional traders. Phoenix optimizes for ultra-low latency and 
              includes innovative features like batch auctions.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Order Book Matching
                </Text>
                <Text size="sm" c="dimmed">
                  Traditional limit orders with maker/taker model and price-time priority.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Batch Auctions
                </Text>
                <Text size="sm" c="dimmed">
                  Innovative auction mechanism for fair price discovery and MEV resistance.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Ultra-Low Latency
                </Text>
                <Text size="sm" c="dimmed">
                  Optimized matching engine for institutional-grade trading performance.
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
              Built by Ellipsis Labs, Phoenix represents the cutting edge of on-chain 
              order book technology on Solana.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/Ellipsis-Labs/phoenix-v1" target="_blank">Phoenix v1</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
