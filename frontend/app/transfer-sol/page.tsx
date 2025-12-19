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

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is SOL Transfer?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Transfer SOL (Solana&apos;s native token) between accounts. This
            demonstrates invoking the System Program to move lamports from one
            account to another.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Native Token Transfers
              </Title>
              <Text size="sm" c="dimmed">
                Move SOL (in lamports) directly between wallet addresses.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                System Program Call
              </Title>
              <Text size="sm" c="dimmed">
                Uses CPI to invoke the System Program&apos;s transfer
                instruction.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Atomic Execution
              </Title>
              <Text size="sm" c="dimmed">
                Transfers execute atomically - they fully succeed or fully fail.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <TransferSolCard />
      </Stack>
    </Container>
  );
}
