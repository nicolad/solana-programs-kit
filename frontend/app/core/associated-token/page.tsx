import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function AssociatedTokenPage() {
  return (
    <Box>
      <Title order={1} mb="md">Associated Token Account Program</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What are Associated Token Accounts?</Title>
        <Text c="dimmed" mb="md">
          The Associated Token Account (ATA) program provides a deterministic way to derive token account addresses for any wallet and token mint combination, simplifying token account management on Solana.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Deterministic Addresses</Title>
            <Text size="sm" c="dimmed">
              Token account addresses are derived from the owner's wallet and the mint, making them easy to find.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">One Account Per Mint</Title>
            <Text size="sm" c="dimmed">
              Each wallet has exactly one ATA for each token mint, preventing address confusion.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Automatic Creation</Title>
            <Text size="sm" c="dimmed">
              ATAs can be created on-demand by anyone, often paid by the sender in token transfers.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Text mb="sm"><strong>Program ID:</strong> ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL</Text>
        
        <Title order={3} size="h4" mt="xl" mb="md">How ATAs Work</Title>
        <Text mb="md">
          Associated Token Accounts are Program Derived Addresses (PDAs) computed from:
        </Text>
        <ul>
          <li><Text>The wallet owner's public key</Text></li>
          <li><Text>The Token Program ID</Text></li>
          <li><Text>The token mint address</Text></li>
        </ul>
        <Text mt="md">
          This derivation ensures that for any wallet-mint pair, there is exactly one canonical ATA address that everyone can calculate without on-chain lookups.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Instructions</Title>
        <ul>
          <li><Text><strong>Create:</strong> Create an ATA for a given wallet and mint</Text></li>
          <li><Text><strong>CreateIdempotent:</strong> Create an ATA, but don't fail if it already exists</Text></li>
          <li><Text><strong>RecoverNested:</strong> Recover tokens from a nested ATA</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Benefits</Title>
        <ul>
          <li><Text>Simplified token transfers - no need to look up recipient's token account</Text></li>
          <li><Text>Reduced user error - canonical addresses prevent sending to wrong accounts</Text></li>
          <li><Text>Better UX - users only need to know wallet addresses, not token accounts</Text></li>
          <li><Text>Lower storage costs - only one account per token per wallet</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Solana Associated Token Account Documentation</Text></li>
          <li><Text>ATA Program Source Code</Text></li>
          <li><Text>Token Account Best Practices</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
