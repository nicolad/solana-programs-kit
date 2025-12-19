import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function MemoPage() {
  return (
    <Box>
      <Title order={1} mb="md">Memo Program</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is the Memo Program?</Title>
        <Text c="dimmed" mb="md">
          The Memo program allows applications to include arbitrary text messages in Solana transactions, providing a standardized way to attach notes, metadata, or compliance information to on-chain actions.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Transaction Notes</Title>
            <Text size="sm" c="dimmed">
              Attach human-readable messages to transactions for record-keeping and transparency.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Compliance</Title>
            <Text size="sm" c="dimmed">
              Include required compliance data, KYC information, or regulatory references.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Metadata Storage</Title>
            <Text size="sm" c="dimmed">
              Store transaction context, order IDs, or application-specific data on-chain.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Text mb="sm"><strong>Program ID:</strong> MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr</Text>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          The Memo program is one of the simplest Solana programs. It takes a UTF-8 encoded string as instruction data and validates that it's properly formatted. The memo text is logged in the transaction logs, making it searchable and retrievable through transaction history.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Simple API:</strong> Single instruction that accepts a string</Text></li>
          <li><Text><strong>No Accounts:</strong> Doesn't create or modify any on-chain accounts</Text></li>
          <li><Text><strong>Logged Output:</strong> Memo text appears in transaction logs</Text></li>
          <li><Text><strong>UTF-8 Validation:</strong> Ensures text is valid UTF-8</Text></li>
          <li><Text><strong>Size Limits:</strong> Memos must fit within transaction size limits</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Common Use Cases</Title>
        <ul>
          <li><Text>Payment references and invoice numbers</Text></li>
          <li><Text>Compliance notes for regulated transactions</Text></li>
          <li><Text>Order IDs for DEX trades</Text></li>
          <li><Text>Application-specific metadata</Text></li>
          <li><Text>Human-readable transaction descriptions</Text></li>
          <li><Text>Audit trail documentation</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Best Practices</Title>
        <ul>
          <li><Text>Keep memos concise to minimize transaction size</Text></li>
          <li><Text>Use structured formats (JSON) for machine-readable data</Text></li>
          <li><Text>Avoid including sensitive information (always visible on-chain)</Text></li>
          <li><Text>Consider using memo for compliance-required disclosures</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Solana Memo Program Documentation</Text></li>
          <li><Text>Memo Program Source Code</Text></li>
          <li><Text>SPL Memo Examples</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
