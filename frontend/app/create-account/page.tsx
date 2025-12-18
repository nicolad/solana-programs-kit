"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
import { CreateAccountCard } from "@/components/create-account/CreateAccountCard";

export default function CreateAccountPage() {
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
            Create Account
          </Title>
          <Text c="dimmed" size="sm">
            Create system-owned accounts via CPI
          </Text>
        </div>
        <CreateAccountCard />
      </Stack>
    </Container>
  );
}
