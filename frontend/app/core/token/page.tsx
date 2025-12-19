"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function TokenProgramPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Token Program (SPL Token)</Title>
          <Text c="dimmed" size="lg">
            The original fungible token standard on Solana
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is the Token Program?</Title>
          <Stack gap="md">
            <Text>
              The SPL Token Program is Solana's standard for creating and managing fungible and non-fungible tokens. It provides a common interface for all tokens on the network, similar to ERC-20 on Ethereum but with better performance and lower costs.
            </Text>
            <Text>
              Key capabilities include:
            </Text>
            <ul>
              <li><Text component="span">Creating new token mints with customizable decimals</Text></li>
              <li><Text component="span">Minting and burning tokens</Text></li>
              <li><Text component="span">Transferring tokens between accounts</Text></li>
              <li><Text component="span">Delegating token authority</Text></li>
              <li><Text component="span">Freezing token accounts</Text></li>
            </ul>
            <Text>
              All SPL tokens share the same program, making them interoperable and composable across the Solana ecosystem.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Account Structure</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Mint Account</Title>
              <Text>Stores global token information: supply, decimals, mint authority, freeze authority.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Token Account</Title>
              <Text>Holds a user's balance of a specific token. Each wallet needs one token account per token type.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Associated Token Account (ATA)</Title>
              <Text>Deterministic address for a user's token account, derived from wallet + mint.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
