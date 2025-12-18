"use client";

import { Container, Stack, Title, Text } from "@mantine/core";
import { CheckingAccountsCard } from "@/components/checking-accounts/CheckingAccountsCard";

export default function CheckingAccountsPage() {
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
            Checking Accounts
          </Title>
          <Text c="dimmed" size="sm">
            Validate account constraints
          </Text>
        </div>
        <CheckingAccountsCard />
      </Stack>
    </Container>
  );
}
