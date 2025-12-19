import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function ClockworkPage() {
  return (
    <Box>
      <Title order={1} mb="md">Clockwork</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Clockwork?</Title>
        <Text c="dimmed" mb="md">
          Clockwork is an automation engine for Solana that allows programs to schedule instructions to execute at specific times or intervals. It enables time-based triggers, recurring tasks, and scheduled program executions without relying on off-chain infrastructure.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Scheduled Execution</Title>
            <Text size="sm" c="dimmed">
              Execute program instructions at specific timestamps or after delays.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Recurring Tasks</Title>
            <Text size="sm" c="dimmed">
              Set up cron-like recurring executions (hourly, daily, weekly, etc.).
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Decentralized Workers</Title>
            <Text size="sm" c="dimmed">
              Network of keeper bots execute tasks and earn fees for their work.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Users create "threads" that define:
        </Text>
        <ul>
          <li><Text>Target program and instruction to execute</Text></li>
          <li><Text>Trigger condition (timestamp, cron schedule, or custom logic)</Text></li>
          <li><Text>Execution parameters and accounts</Text></li>
          <li><Text>Worker fees and rate limits</Text></li>
        </ul>
        <Text mt="md">
          Clockwork workers monitor threads and execute them when trigger conditions are met, earning fees for successful executions.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Time-Based Triggers:</strong> Execute at specific Unix timestamps</Text></li>
          <li><Text><strong>Cron Schedules:</strong> Recurring tasks like "every Monday at 9am"</Text></li>
          <li><Text><strong>Account-Based Triggers:</strong> Execute when account state changes</Text></li>
          <li><Text><strong>Composable:</strong> Works with any Solana program</Text></li>
          <li><Text><strong>Permissionless Workers:</strong> Anyone can run a worker and earn fees</Text></li>
          <li><Text><strong>Rate Limiting:</strong> Control execution frequency</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text><strong>DeFi:</strong> Automated position rebalancing, yield harvesting</Text></li>
          <li><Text><strong>Gaming:</strong> Daily quest resets, scheduled events</Text></li>
          <li><Text><strong>NFTs:</strong> Timed reveals, auction endings</Text></li>
          <li><Text><strong>DAOs:</strong> Scheduled governance actions, automatic payroll</Text></li>
          <li><Text><strong>Trading:</strong> TWAP orders, recurring DCA buys</Text></li>
          <li><Text><strong>Subscriptions:</strong> Monthly payments, recurring billing</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Example Scenarios</Title>
        <Text mb="md"><strong>DCA (Dollar Cost Averaging):</strong></Text>
        <ul>
          <li><Text>Schedule: Every Monday at 12:00 UTC</Text></li>
          <li><Text>Action: Swap 100 USDC for SOL via Jupiter</Text></li>
          <li><Text>Result: Automated weekly SOL purchases</Text></li>
        </ul>

        <Text mt="xl" mb="md"><strong>Yield Harvesting:</strong></Text>
        <ul>
          <li><Text>Schedule: Every 24 hours</Text></li>
          <li><Text>Action: Claim farming rewards and compound</Text></li>
          <li><Text>Result: Automated yield optimization</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Worker Economics</Title>
        <ul>
          <li><Text>Workers stake CRON tokens to participate</Text></li>
          <li><Text>Earn execution fees set by thread creators</Text></li>
          <li><Text>Compete for available threads (first-come-first-serve)</Text></li>
          <li><Text>Penalties for failed executions or downtime</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Integration</Title>
        <Text mb="md">
          Programs can integrate Clockwork by:
        </Text>
        <ol>
          <li><Text>Exposing instructions that should be schedulable</Text></li>
          <li><Text>Creating thread accounts via Clockwork SDK</Text></li>
          <li><Text>Funding threads with SOL for worker fees</Text></li>
          <li><Text>Setting trigger conditions and parameters</Text></li>
        </ol>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Clockwork Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Integration Guide</Text></li>
          <li><Text>Worker Setup Tutorial</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
