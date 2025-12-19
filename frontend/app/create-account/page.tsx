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

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is Account Creation?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Programs can create new accounts via CPI to the System Program. This
            is fundamental for initializing program state, creating PDAs, and
            managing on-chain data.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                System Program CPI
              </Title>
              <Text size="sm" c="dimmed">
                Invokes the System Program to allocate and assign accounts.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Rent Exemption
              </Title>
              <Text size="sm" c="dimmed">
                Accounts must maintain minimum balance to stay alive on-chain.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Account Ownership
              </Title>
              <Text size="sm" c="dimmed">
                New accounts can be owned by your program or the System Program.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <CreateAccountCard />
      </Stack>
    </Container>
  );
}
