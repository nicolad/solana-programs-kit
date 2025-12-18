"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
import { TransferSolCard } from "@/components/transfer-sol/TransferSolCard";

export default function TransferSolPage() {
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
            Transfer SOL
          </Title>
          <Text c="dimmed" size="sm">
            Send SOL between accounts
          </Text>
        </div>
        <TransferSolCard />
      </Stack>
    </Container>
  );
}
