"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";

export default function StakePoolPage() {
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
            Stake Pool
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Liquid staking and validator delegation
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
            <Title order={3}>What is a Stake Pool?</Title>
            <Text c="dimmed">
              Stake Pools aggregate SOL from multiple users and distribute it across multiple validators, 
              providing liquid staking tokens in return. This enables users to earn staking rewards while 
              maintaining liquidity, improves network decentralization by spreading stake across validators, 
              and simplifies the staking experience.
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <div>
                <Text fw={600} mb="xs">
                  Liquid Staking Tokens
                </Text>
                <Text size="sm" c="dimmed">
                  Receive tradeable tokens representing staked SOL that earn rewards.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Multi-Validator Delegation
                </Text>
                <Text size="sm" c="dimmed">
                  Stake is distributed across multiple validators for better decentralization.
                </Text>
              </div>
              <div>
                <Text fw={600} mb="xs">
                  Automated Management
                </Text>
                <Text size="sm" c="dimmed">
                  Pool managers handle validator selection and stake rebalancing automatically.
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
              Based on Solana Program Library's stake pool, the canonical implementation used 
              by major liquid staking providers like Marinade and Jito.
            </Text>
            <Text c="dimmed" size="sm">
              Source: <Text span c="blue" component="a" href="https://github.com/solana-program/stake-pool" target="_blank">SPL Stake Pool</Text>
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
