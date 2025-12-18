"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
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
        <FavoritesCard />
      </Stack>
    </Container>
  );
}
