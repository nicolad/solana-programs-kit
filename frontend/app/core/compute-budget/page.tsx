import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function ComputeBudgetPage() {
  return (
    <Box>
      <Title order={1} mb="md">Compute Budget Program</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is the Compute Budget Program?</Title>
        <Text c="dimmed" mb="md">
          The Compute Budget program allows transactions to request additional compute units and set priority fees, giving developers control over transaction resource limits and network prioritization.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Compute Unit Limits</Title>
            <Text size="sm" c="dimmed">
              Request more compute units for complex transactions that need additional processing power.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Priority Fees</Title>
            <Text size="sm" c="dimmed">
              Set higher fees to prioritize your transaction during network congestion.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Resource Optimization</Title>
            <Text size="sm" c="dimmed">
              Fine-tune transaction costs by requesting exactly the compute units needed.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Text mb="sm"><strong>Program ID:</strong> ComputeBudget111111111111111111111111111111</Text>
        
        <Title order={3} size="h4" mt="xl" mb="md">Key Instructions</Title>
        <ul>
          <li><Text><strong>RequestUnitsDeprecated:</strong> (Deprecated) Request additional compute units</Text></li>
          <li><Text><strong>SetComputeUnitLimit:</strong> Set the maximum compute units for the transaction</Text></li>
          <li><Text><strong>SetComputeUnitPrice:</strong> Set the priority fee (micro-lamports per compute unit)</Text></li>
          <li><Text><strong>RequestHeapFrame:</strong> Request additional heap memory</Text></li>
          <li><Text><strong>SetLoadedAccountsDataSizeLimit:</strong> Set max total size of loaded account data</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Every Solana transaction has a compute unit budget that limits how much computation it can perform. By default, this is 200,000 compute units per instruction, but transactions can request more through the Compute Budget program.
        </Text>
        <Text mb="md">
          Priority fees allow transactions to pay extra to be processed faster during network congestion. Validators prioritize transactions with higher fees per compute unit.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Usage Patterns</Title>
        <ul>
          <li><Text>Include compute budget instructions at the start of your transaction</Text></li>
          <li><Text>Set compute unit limit slightly higher than what your transaction actually needs</Text></li>
          <li><Text>Monitor network congestion and adjust priority fees accordingly</Text></li>
          <li><Text>For complex programs, estimate compute units through simulation first</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Best Practices</Title>
        <ul>
          <li><Text>Don't request excessive compute units - you pay for what you request</Text></li>
          <li><Text>Use priority fees strategically during high network load</Text></li>
          <li><Text>Test transactions to determine actual compute unit usage</Text></li>
          <li><Text>Consider user experience - higher fees mean faster confirmation</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Solana Compute Budget Documentation</Text></li>
          <li><Text>Priority Fees Guide</Text></li>
          <li><Text>Transaction Optimization Best Practices</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
