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
import { FavoritesCard } from "@/components/favorites/FavoritesCard";

export default function FavoritesPage() {
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
            Favorites
          </Title>
          <Text c="dimmed" size="sm">
            Store your favorite things on-chain
          </Text>
        </div>

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is the Favorites Program?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            A program demonstrating complex data storage with multiple data
            types. Store your favorite number, color, and hobbies in a
            user-specific PDA account.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Complex Data Types
              </Title>
              <Text size="sm" c="dimmed">
                Stores numbers, strings, and vectors in a single account.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                User-Specific PDAs
              </Title>
              <Text size="sm" c="dimmed">
                Each wallet has its own favorites account derived from their
                public key.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Dynamic Arrays
              </Title>
              <Text size="sm" c="dimmed">
                Demonstrates storing variable-length lists on-chain.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <FavoritesCard />
      </Stack>
    </Container>
  );
}
