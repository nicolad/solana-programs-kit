"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function SinglePoolPage() {
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
            Single Pool Staking
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Single-sided token staking and rewards
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
            <Title order={3}>What is Single Pool Staking?</Title>
            <Text c="dimmed">
              Single Pool staking allows users to stake a single token to earn rewards without 
              providing liquidity pairs. This is commonly used for token incentive programs, 
              governance staking, and reward distribution. Users deposit tokens, earn yield based 
              on their share, and can withdraw anytime.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Single Token Deposit
                </Text>
                <Text size="sm" c="dimmed">
                  No need for token pairs - stake one asset and earn rewards.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Flexible Rewards
                </Text>
                <Text size="sm" c="dimmed">
                  Configurable reward rates and distribution schedules for incentive programs.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  No Impermanent Loss
                </Text>
                <Text size="sm" c="dimmed">
                  Single-sided staking eliminates impermanent loss risk from price divergence.
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
              Based on Solana Program Library's single-pool program, providing a battle-tested 
              foundation for token staking and rewards distribution.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/solana-program/single-pool" target="_blank">SPL Single Pool</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
