"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
import { CpiCard } from "@/components/cpi/CpiCard";

export default function CpiPage() {
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
            Cross-Program Invocation
          </Title>
          <Text c="dimmed" size="sm">
            Pull lever via CPI
          </Text>
        </div>
        <CpiCard />
      </Stack>
    </Container>
  );
}
