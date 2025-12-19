"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function TwapPage() {
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
            TWAP Oracle
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Time-weighted average price for reliable pricing
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
            <Title order={3}>What is TWAP?</Title>
            <Text c="dimmed">
              Time-Weighted Average Price (TWAP) oracles provide manipulation-resistant price feeds 
              by averaging prices over a period of time. This makes them particularly useful for 
              DeFi protocols that need reliable pricing data for lending, derivatives, and other 
              financial applications where price manipulation could be costly.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Manipulation Resistance
                </Text>
                <Text size="sm" c="dimmed">
                  Time-weighted averaging makes price manipulation extremely expensive.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Historical Observations
                </Text>
                <Text size="sm" c="dimmed">
                  Stores price observations on-chain for verifiable, decentralized oracle data.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  DeFi Integration
                </Text>
                <Text size="sm" c="dimmed">
                  Essential infrastructure for lending, perps, and options protocols.
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
              Based on OpenBook's TWAP implementation, providing reliable on-chain price feeds 
              derived from order book markets.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/metaplex-foundation/openbook-twap" target="_blank">OpenBook TWAP</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
