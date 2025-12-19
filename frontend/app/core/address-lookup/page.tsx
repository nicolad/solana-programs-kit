import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function AddressLookupPage() {
  return (
    <Box>
      <Title order={1} mb="md">Address Lookup Table Program</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What are Address Lookup Tables?</Title>
        <Text c="dimmed" mb="md">
          Address Lookup Tables (ALTs) allow transactions to reference accounts by index rather than full 32-byte addresses, dramatically reducing transaction size and enabling more complex transactions within Solana's size limits.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Smaller Transactions</Title>
            <Text size="sm" c="dimmed">
              Store account addresses in a table and reference them with 1-byte indices instead of 32 bytes.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">More Accounts</Title>
            <Text size="sm" c="dimmed">
              Fit more account references in a transaction, enabling more complex multi-account operations.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Reusable Tables</Title>
            <Text size="sm" c="dimmed">
              Create tables once and reuse them across many transactions for frequently accessed accounts.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Text mb="sm"><strong>Program ID:</strong> AddressLookupTab1e1111111111111111111111111</Text>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          An Address Lookup Table is an on-chain account that stores a list of addresses. Transactions can reference this table and use 1-byte indices to point to addresses within it, instead of including the full 32-byte address in the transaction.
        </Text>
        <Text mb="md">
          For example, instead of including 20 × 32 = 640 bytes of addresses, a transaction using an ALT only needs 20 × 1 = 20 bytes plus a reference to the table.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Instructions</Title>
        <ul>
          <li><Text><strong>CreateLookupTable:</strong> Create a new address lookup table</Text></li>
          <li><Text><strong>ExtendLookupTable:</strong> Add addresses to an existing table</Text></li>
          <li><Text><strong>FreezeLookupTable:</strong> Make a table immutable (cannot be extended)</Text></li>
          <li><Text><strong>CloseLookupTable:</strong> Close and reclaim rent from a table</Text></li>
          <li><Text><strong>DeactivateLookupTable:</strong> Mark a table for deactivation before closing</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Common Use Cases</Title>
        <ul>
          <li><Text>DeFi protocols with many token accounts and pools</Text></li>
          <li><Text>Multi-hop swap routes that touch many accounts</Text></li>
          <li><Text>Gaming programs with complex state across many accounts</Text></li>
          <li><Text>Governance systems voting across many proposals</Text></li>
          <li><Text>Any transaction that hits account limits</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Best Practices</Title>
        <ul>
          <li><Text>Tables can hold up to 256 addresses</Text></li>
          <li><Text>Wait at least 1 slot after extending before using new addresses</Text></li>
          <li><Text>Consider freezing tables that won't change to prevent accidents</Text></li>
          <li><Text>Deactivate tables before closing (must wait ~512 slots)</Text></li>
          <li><Text>Group frequently used addresses together in the same table</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Solana Address Lookup Tables Documentation</Text></li>
          <li><Text>ALT Program Source Code</Text></li>
          <li><Text>Versioned Transactions Guide</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
