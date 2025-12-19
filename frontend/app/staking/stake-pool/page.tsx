import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function StakePoolPage() {
  return (
    <Box>
      <Title order={1} mb="md">Stake Pool Program</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is the Stake Pool Program?</Title>
        <Text c="dimmed" mb="md">
          The Stake Pool program is Solana's official protocol for pooled staking, allowing users to stake SOL across multiple validators while receiving a liquid token. It distributes stake automatically, reduces centralization risk, and enables liquid staking derivatives.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Multi-Validator</Title>
            <Text size="sm" c="dimmed">
              Automatically distribute stake across many validators based on performance and decentralization.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Liquid Staking</Title>
            <Text size="sm" c="dimmed">
              Receive pool tokens (like mSOL, stSOL) that represent staked SOL and can be used in DeFi.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Risk Distribution</Title>
            <Text size="sm" c="dimmed">
              Spread risk across multiple validators to minimize impact of individual validator failures.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Users deposit SOL into a stake pool, which maintains a list of approved validators. The pool automatically:
        </Text>
        <ol>
          <li><Text>Distributes new deposits across validators based on strategy</Text></li>
          <li><Text>Creates and manages stake accounts with each validator</Text></li>
          <li><Text>Collects staking rewards from all validators</Text></li>
          <li><Text>Updates pool token exchange rate to reflect accumulated rewards</Text></li>
          <li><Text>Handles unstaking requests through reserve pool or delayed withdrawals</Text></li>
        </ol>

        <Title order={3} size="h4" mt="xl" mb="md">Key Components</Title>
        <ul>
          <li><Text><strong>Stake Pool Account:</strong> Main account tracking all validators and stats</Text></li>
          <li><Text><strong>Validator List:</strong> Approved validators and their stake amounts</Text></li>
          <li><Text><strong>Pool Token Mint:</strong> LST token representing pool shares</Text></li>
          <li><Text><strong>Reserve Account:</strong> SOL buffer for instant unstaking</Text></li>
          <li><Text><strong>Manager:</strong> Authority that can add/remove validators</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Validator Selection</Title>
        <Text mb="md">
          Stake pools can use various strategies to distribute stake:
        </Text>
        <ul>
          <li><Text><strong>Performance-based:</strong> More stake to better-performing validators</Text></li>
          <li><Text><strong>Equal distribution:</strong> Spread stake evenly across all validators</Text></li>
          <li><Text><strong>Decentralization-focused:</strong> Prefer smaller validators to improve network health</Text></li>
          <li><Text><strong>Hybrid:</strong> Combine multiple factors (performance + decentralization)</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Major Stake Pools</Title>
        <ul>
          <li><Text><strong>Marinade (mSOL):</strong> Largest pool, focuses on decentralization</Text></li>
          <li><Text><strong>Lido (stSOL):</strong> Multi-chain presence, institutional grade</Text></li>
          <li><Text><strong>Jito (jitoSOL):</strong> MEV rewards sharing with stakers</Text></li>
          <li><Text><strong>BlazeStake (bSOL):</strong> Community-focused decentralization</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Benefits</Title>
        <Text mb="md">For Users:</Text>
        <ul>
          <li><Text>Diversified validator exposure reduces risk</Text></li>
          <li><Text>Liquid staking enables DeFi participation while earning staking yield</Text></li>
          <li><Text>No need to research and pick individual validators</Text></li>
          <li><Text>Automatic rebalancing and reward compounding</Text></li>
        </ul>

        <Text mt="xl" mb="md">For Solana Network:</Text>
        <ul>
          <li><Text>Reduces stake centralization through multi-validator delegation</Text></li>
          <li><Text>Incentivizes running validators (easier to attract delegators)</Text></li>
          <li><Text>Enables liquid staking economy and DeFi innovations</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Fee Structure</Title>
        <ul>
          <li><Text>Deposit fee: Usually 0% (some pools charge small fee)</Text></li>
          <li><Text>Management fee: Typically 2-4% of staking rewards</Text></li>
          <li><Text>Withdrawal fee: 0-0.5% depending on instant vs delayed</Text></li>
          <li><Text>SOL withdrawal fee: ~0.001 SOL for transaction costs</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Unstaking Options</Title>
        <ul>
          <li><Text><strong>Instant:</strong> Use reserve pool SOL (limited availability)</Text></li>
          <li><Text><strong>Delayed:</strong> Wait ~2-3 days for stake account to unstake</Text></li>
          <li><Text><strong>Trade LST:</strong> Swap pool token on DEX (may have slippage)</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>SPL Stake Pool Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Pool Operator Guide</Text></li>
          <li><Text>Stake Pool Comparison</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
