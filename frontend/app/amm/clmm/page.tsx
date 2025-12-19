"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function ClmmPage() {
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
            CLMM - Concentrated Liquidity
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Orca Whirlpools concentrated liquidity market maker
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
            <Title order={3}>What is CLMM?</Title>
            <Text c="dimmed">
              Concentrated Liquidity Market Maker (CLMM) allows liquidity providers to concentrate 
              their capital within specific price ranges. This provides up to 4,000x capital efficiency 
              compared to traditional constant product AMMs, enabling deeper liquidity and better prices 
              for traders while maximizing returns for LPs.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Price Range Selection
                </Text>
                <Text size="sm" c="dimmed">
                  LPs choose specific price ranges to provide liquidity, maximizing capital efficiency.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Position NFTs
                </Text>
                <Text size="sm" c="dimmed">
                  Each liquidity position is represented as an NFT, enabling composability.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Tick-Based Liquidity
                </Text>
                <Text size="sm" c="dimmed">
                  Liquidity organized in discrete ticks for efficient price discovery and execution.
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
              Based on Orca Whirlpools, Solana's premier concentrated liquidity protocol inspired 
              by Uniswap v3 but optimized for Solana's parallel execution model.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/orca-so/whirlpools" target="_blank">Orca Whirlpools</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
