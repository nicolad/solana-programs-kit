"use client";

import {
  Box,
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Stack,
} from "@mantine/core";
import { TokenSwapCard } from "@/components/token-swap/TokenSwapCard";

export default function TokenSwapPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" align="center">
        <div style={{ textAlign: "center" }}>
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
            Token Swap AMM
          </Title>
          <Text c="dimmed" size="sm">
            Constant Product Automated Market Maker
          </Text>
        </div>

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is an AMM?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Automated Market Makers (AMMs) are decentralized exchange protocols
            that use mathematical formulas to price assets. Instead of
            traditional order books, AMMs use liquidity pools where users can
            trade tokens automatically.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Constant Product (xy = k)
              </Title>
              <Text size="sm" c="dimmed">
                The most popular AMM formula. Product of token reserves remains
                constant.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Liquidity Pools
              </Title>
              <Text size="sm" c="dimmed">
                Users provide token pairs and earn fees from trades proportional
                to their share.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Decentralized Trading
              </Title>
              <Text size="sm" c="dimmed">
                No order books, no intermediaries. Trades execute instantly
                against the pool.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <Box w="100%">
          <TokenSwapCard />
        </Box>
      </Stack>
    </Container>
  );
}
