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

        <Box w="100%" maw={900}>
          <Title order={3} mb="md" ta="center">
            What is Account Validation?
          </Title>
          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Anchor provides powerful account constraint checking to ensure
            accounts meet security requirements. This prevents unauthorized
            access and malicious attacks.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Signer Checks
              </Title>
              <Text size="sm" c="dimmed">
                Ensures the transaction is signed by the expected wallet.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Mutability Constraints
              </Title>
              <Text size="sm" c="dimmed">
                Validates which accounts can be written to vs read-only.
              </Text>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={5} mb="xs">
                Owner Verification
              </Title>
              <Text size="sm" c="dimmed">
                Confirms accounts are owned by the expected program.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        <CheckingAccountsCard />
      </Stack>
    </Container>
  );
}
