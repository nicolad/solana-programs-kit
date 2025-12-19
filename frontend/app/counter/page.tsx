"use client";

import {
  Container,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Box,
} from "@mantine/core";
import { CounterCard } from "@/components/counter/CounterCard";

export default function CounterPage() {
  return (
    <Container size="md" py="xl">
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
            Counter Program
          </Title>
          <Text c="dimmed" size="sm">
            Increment/Decrement counter on-chain
          </Text>
        </div>

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is a Counter Program?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            A simple on-chain program that demonstrates state management in
            Solana. The counter stores a value on-chain and provides
            instructions to modify it.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                State Persistence
              </Title>
              <Text size="sm" c="dimmed">
                Data is stored permanently on-chain in a PDA account.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Increment/Decrement
              </Title>
              <Text size="sm" c="dimmed">
                Two instructions modify the counter value atomically.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Account-Based Model
              </Title>
              <Text size="sm" c="dimmed">
                Demonstrates Solana&apos;s unique account storage pattern.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <CounterCard />
      </Stack>
    </Container>
  );
}
