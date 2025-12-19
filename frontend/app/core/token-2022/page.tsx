"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function Token2022Page() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Token-2022 (Token Extensions)</Title>
          <Text c="dimmed" size="lg">Enhanced SPL token standard with advanced features</Text>
        </div>
        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Token-2022?</Title>
          <Text>
            Token-2022 is the next generation of the SPL Token standard, featuring 16+ optional extensions including transfer fees, confidential transfers, permanent delegate, transfer hooks, metadata, and more. It's backward compatible with the original Token Program while offering significantly more flexibility.
          </Text>
        </Paper>
        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
