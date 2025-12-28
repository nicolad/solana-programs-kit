"use client";

import { Container, Title, Text, Card, Stack } from "@mantine/core";

export default function MerkleDistributorPage() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">
            Merkle Distributor
          </Title>
          <Text c="dimmed">Efficient Token Airdrops</Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Overview</Title>
            <Text>
              Merkle Distributor enables gas-efficient token airdrops using
              Merkle trees. Recipients can claim their tokens by providing a
              Merkle proof, significantly reducing distribution costs.
            </Text>
            <Text c="dimmed" size="sm">
              This page is under construction. Implementation coming soon.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
