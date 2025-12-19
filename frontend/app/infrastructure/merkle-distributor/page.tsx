import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function MerkleDistributorPage() {
  return (
    <Box>
      <Title order={1} mb="md">Merkle Distributor</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Merkle Distributor?</Title>
        <Text c="dimmed" mb="md">
          Merkle Distributor is a program for efficient, verifiable token airdrops using Merkle trees. It allows projects to distribute tokens to thousands of recipients while storing only a single 32-byte root hash on-chain, making airdrops extremely cost-effective.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Gas Efficient</Title>
            <Text size="sm" c="dimmed">
              Store one hash for unlimited recipients instead of individual airdrop accounts.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Claim-Based</Title>
            <Text size="sm" c="dimmed">
              Recipients claim their tokens on demand, no gas cost for unclaimed distributions.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Verifiable</Title>
            <Text size="sm" c="dimmed">
              Cryptographic Merkle proofs ensure only eligible addresses can claim correct amounts.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          A Merkle tree is constructed off-chain with all recipient addresses and amounts as leaves. The root hash is stored in the distributor account. To claim, users provide a Merkle proof showing their address and amount are in the tree. The program verifies the proof and transfers tokens.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Merkle Tree Verification:</strong> Efficient cryptographic proof verification</Text></li>
          <li><Text><strong>One-Time Claims:</strong> Prevents double-claiming via bitmap tracking</Text></li>
          <li><Text><strong>Temporal Claims:</strong> Optional start and end times for claim windows</Text></li>
          <li><Text><strong>Clawback:</strong> Creator can reclaim unclaimed tokens after expiry</Text></li>
          <li><Text><strong>Multiple Distributors:</strong> Run multiple concurrent airdrops</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Setup Process</Title>
        <ol>
          <li><Text>Create list of (address, amount) pairs</Text></li>
          <li><Text>Build Merkle tree from the list</Text></li>
          <li><Text>Deploy distributor with root hash and total tokens</Text></li>
          <li><Text>Distribute Merkle proofs to recipients (off-chain)</Text></li>
          <li><Text>Recipients claim using their proof</Text></li>
        </ol>

        <Title order={3} size="h4" mt="xl" mb="md">Cost Comparison</Title>
        <Text mb="md">Traditional airdrop (send to each address):</Text>
        <ul>
          <li><Text>10,000 recipients = ~10,000 transactions</Text></li>
          <li><Text>High upfront cost, paid by project</Text></li>
          <li><Text>Tokens sent to inactive wallets are wasted</Text></li>
        </ul>
        <Text mt="md" mb="md">Merkle distributor:</Text>
        <ul>
          <li><Text>10,000 recipients = 1 creation + N claims (where N ≤ 10,000)</Text></li>
          <li><Text>Minimal upfront cost (one account)</Text></li>
          <li><Text>Claim cost borne by recipients</Text></li>
          <li><Text>Unclaimed tokens can be recovered</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text>Token launches and airdrops</Text></li>
          <li><Text>Retroactive rewards to community</Text></li>
          <li><Text>NFT allowlist mints</Text></li>
          <li><Text>Governance token distributions</Text></li>
          <li><Text>Trading competition prizes</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Merkle Distributor Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Airdrop Tools and Scripts</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
