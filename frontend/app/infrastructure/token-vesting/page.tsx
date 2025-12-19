import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function TokenVestingPage() {
  return (
    <Box>
      <Title order={1} mb="md">Token Vesting</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Token Vesting?</Title>
        <Text c="dimmed" mb="md">
          Token Vesting programs enforce time-based release schedules for tokens, commonly used for team allocations, investor lockups, and employee compensation. Tokens are locked and gradually unlocked according to predefined schedules.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Time Locks</Title>
            <Text size="sm" c="dimmed">
              Lock tokens until specific dates with cliff periods and linear vesting schedules.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Trustless Release</Title>
            <Text size="sm" c="dimmed">
              Tokens unlock automatically per schedule, no manual intervention or trust required.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Revocable Options</Title>
            <Text size="sm" c="dimmed">
              Optional revocation allows creators to cancel unvested allocations if needed.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Tokens are deposited into a vesting account with a schedule defining:
        </Text>
        <ul>
          <li><Text>Start date: When vesting begins</Text></li>
          <li><Text>Cliff period: Initial lockup before any tokens unlock</Text></li>
          <li><Text>Vesting duration: Total time until fully vested</Text></li>
          <li><Text>Release frequency: How often tokens unlock (continuous or periodic)</Text></li>
        </ul>
        <Text mt="md">
          Recipients can withdraw unlocked portions at any time. The program automatically calculates vested amounts based on elapsed time.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Common Vesting Schedules</Title>
        <ul>
          <li><Text><strong>1-year cliff, 4-year vest:</strong> Common for startup employees</Text></li>
          <li><Text><strong>6-month cliff, 2-year vest:</strong> Advisor grants</Text></li>
          <li><Text><strong>No cliff, 3-year vest:</strong> Investor allocations</Text></li>
          <li><Text><strong>Milestone-based:</strong> Unlock tied to project achievements</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Flexible Schedules:</strong> Linear, stepped, or custom unlock curves</Text></li>
          <li><Text><strong>Multiple Recipients:</strong> Create batches of vesting contracts</Text></li>
          <li><Text><strong>Revocable vs Irrevocable:</strong> Choose whether to allow cancellation</Text></li>
          <li><Text><strong>Delegate Claiming:</strong> Allow others to claim on recipient's behalf</Text></li>
          <li><Text><strong>Change Beneficiary:</strong> Transfer unvested tokens to new address</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text>Team token allocations to prevent early dumps</Text></li>
          <li><Text>Investor lockups per SAFT/SAFE agreements</Text></li>
          <li><Text>Employee compensation and equity grants</Text></li>
          <li><Text>Advisor tokens with milestone unlocks</Text></li>
          <li><Text>Community incentives with gradual distribution</Text></li>
          <li><Text>Treasury diversification schedules</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Example Calculation</Title>
        <Text mb="md">
          1,000,000 tokens, 1-year cliff, 4-year linear vest:
        </Text>
        <ul>
          <li><Text>Year 0-1: 0 tokens unlocked (cliff period)</Text></li>
          <li><Text>Year 1: 250,000 tokens unlock (cliff + year 1)</Text></li>
          <li><Text>Year 2: 250,000 additional tokens (total 500,000)</Text></li>
          <li><Text>Year 3: 250,000 additional tokens (total 750,000)</Text></li>
          <li><Text>Year 4: 250,000 additional tokens (total 1,000,000)</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Token Vesting Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Vesting Schedule Calculator</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
