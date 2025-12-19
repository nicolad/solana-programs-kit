"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function WeightedPage() {
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
            CMMM - Weighted AMM
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Constant mean market maker with custom token weights
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
            <Title order={3}>What is CMMM?</Title>
            <Text c="dimmed">
              Constant Mean Market Maker (CMMM) is a generalization of the constant product formula 
              that allows for weighted pools. Instead of a 50/50 split, tokens can have custom weights 
              like 80/20 or 60/30/10, enabling more flexible portfolio strategies and reducing 
              impermanent loss for certain asset combinations.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Custom Weights
                </Text>
                <Text size="sm" c="dimmed">
                  Set arbitrary token weights (e.g., 80/20) instead of fixed 50/50 ratios.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Multi-Asset Pools
                </Text>
                <Text size="sm" c="dimmed">
                  Support for pools with 3+ tokens in a single liquidity pool.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Portfolio Exposure
                </Text>
                <Text size="sm" c="dimmed">
                  Maintain specific portfolio allocations while providing liquidity.
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
              Inspired by Balancer's weighted pools, this implementation brings flexible 
              multi-asset AMMs to Solana with custom weight configurations.
            </Text>
            <Text c="dimmed" size="sm">
              Formula: x^w * y^(1-w) = k (generalized for n tokens)
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
