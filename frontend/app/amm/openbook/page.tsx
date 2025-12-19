"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function OpenbookPage() {
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
            OpenBook DEX
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Community-driven order book protocol
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
            <Title order={3}>What is OpenBook?</Title>
            <Text c="dimmed">
              OpenBook is a community-forked and maintained version of Serum DEX, providing a fully 
              on-chain central limit order book. It serves as critical infrastructure for Solana DeFi, 
              enabling composable liquidity that can be integrated into other protocols via CPI 
              (Cross-Program Invocation).
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Full Order Book
                </Text>
                <Text size="sm" c="dimmed">
                  Complete on-chain matching with limit orders, market orders, and cancellations.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Composable Liquidity
                </Text>
                <Text size="sm" c="dimmed">
                  Other programs can integrate OpenBook markets via CPI for aggregated liquidity.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Community Governed
                </Text>
                <Text size="sm" c="dimmed">
                  Open-source and community-maintained for transparent, decentralized development.
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
              Fork of the original Serum DEX, maintained by the community with ongoing 
              improvements and v2 in development.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/openbook-dex/openbook-v2" target="_blank">OpenBook v2</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
