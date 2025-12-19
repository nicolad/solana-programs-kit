"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function SystemProgramPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">System Program</Title>
          <Text c="dimmed" size="lg">
            Core Solana program for account creation and SOL transfers
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is the System Program?</Title>
          <Stack gap="md">
            <Text>
              The System Program is one of Solana's native programs, responsible for fundamental blockchain operations. It's owned by the runtime and has a fixed program ID of <Code>11111111111111111111111111111111</Code>.
            </Text>
            <Text>
              The System Program handles:
            </Text>
            <ul>
              <li><Text component="span">Creating new accounts on the blockchain</Text></li>
              <li><Text component="span">Transferring SOL (native token) between accounts</Text></li>
              <li><Text component="span">Allocating space for account data</Text></li>
              <li><Text component="span">Assigning ownership of accounts to other programs</Text></li>
            </ul>
            <Text>
              Every transaction that creates a new account or transfers SOL uses the System Program. It's the foundation upon which all other Solana programs are built.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Key Features</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Account Creation</Title>
              <Text>Creates new accounts with specified space and assigns ownership to a program.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">SOL Transfers</Title>
              <Text>Transfers lamports (smallest unit of SOL) between accounts with atomic guarantees.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Rent</Title>
              <Text>Accounts must maintain minimum balance for rent exemption based on their data size.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>11111111111111111111111111111111</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
