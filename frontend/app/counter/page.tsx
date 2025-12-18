"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
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
        <CounterCard />
      </Stack>
    </Container>
  );
}
