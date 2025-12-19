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

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is Cross-Program Invocation?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            CPI allows one Solana program to call instructions from another
            program, enabling composability and building complex DeFi protocols
            from simpler components.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Program Composability
              </Title>
              <Text size="sm" c="dimmed">
                Programs can invoke other programs, creating complex workflows.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Signed Invocations
              </Title>
              <Text size="sm" c="dimmed">
                Programs can sign transactions on behalf of PDAs they control.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                DeFi Building Blocks
              </Title>
              <Text size="sm" c="dimmed">
                Essential for protocols that interact with tokens, AMMs, and
                more.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <CpiCard />
      </Stack>
    </Container>
  );
}
