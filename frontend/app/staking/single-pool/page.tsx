import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function SinglePoolPage() {
  return (
    <Box>
      <Title order={1} mb="md">Single Pool Staking</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Single Pool Staking?</Title>
        <Text c="dimmed" mb="md">
          Single Pool is a simplified staking program that allows users to stake SOL directly with a single validator. It provides a straightforward alternative to complex stake pool programs, ideal for validators who want to offer liquid staking to their delegators.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Direct Staking</Title>
            <Text size="sm" c="dimmed">
              Stake SOL directly with one validator, simpler than multi-validator pools.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Liquid Staking Token</Title>
            <Text size="sm" c="dimmed">
              Receive LST (Liquid Staking Token) representing your staked SOL plus rewards.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Simple Architecture</Title>
            <Text size="sm" c="dimmed">
              Minimal complexity compared to multi-validator stake pools, easier to audit and manage.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Users deposit SOL into the pool, which immediately stakes it with the designated validator. In return, users receive LST tokens representing their share of the pool. As staking rewards accumulate, the exchange rate between LST and SOL increases.
        </Text>
        <Text mb="md">
          To unstake, users burn their LST tokens and receive SOL back at the current exchange rate (which includes accumulated rewards). Unstaking requires waiting through the standard Solana unstaking period (~2-3 days).
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Single Validator:</strong> All SOL staked with one chosen validator</Text></li>
          <li><Text><strong>Automatic Compounding:</strong> Rewards automatically restake and compound</Text></li>
          <li><Text><strong>Liquid Token:</strong> LST can be traded, used as collateral, or in DeFi</Text></li>
          <li><Text><strong>Proportional Rewards:</strong> Share rewards based on your % of pool</Text></li>
          <li><Text><strong>Low Fees:</strong> Minimal program complexity means lower operating costs</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Benefits</Title>
        <Text mb="md">For Stakers:</Text>
        <ul>
          <li><Text>Earn staking rewards (~7% APY) while maintaining liquidity</Text></li>
          <li><Text>Use LST tokens in DeFi while earning staking yield</Text></li>
          <li><Text>Automatic reward compounding without manual restaking</Text></li>
          <li><Text>Simple, auditable program with low risk</Text></li>
        </ul>

        <Text mt="xl" mb="md">For Validators:</Text>
        <ul>
          <li><Text>Attract delegators with liquid staking option</Text></li>
          <li><Text>Build brand with custom LST token</Text></li>
          <li><Text>Sticky stake - users keep LST rather than moving validators</Text></li>
          <li><Text>Simple to deploy and maintain</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">vs Stake Pool Program</Title>
        <Text mb="md"><strong>Single Pool:</strong></Text>
        <ul>
          <li><Text>One validator only</Text></li>
          <li><Text>Simpler architecture</Text></li>
          <li><Text>Lower overhead and fees</Text></li>
          <li><Text>Higher validator risk (all eggs in one basket)</Text></li>
        </ul>

        <Text mt="md" mb="md"><strong>Stake Pool:</strong></Text>
        <ul>
          <li><Text>Multiple validators</Text></li>
          <li><Text>Risk distributed across validators</Text></li>
          <li><Text>More complex to operate</Text></li>
          <li><Text>Higher fees to cover complexity</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Risk Considerations</Title>
        <ul>
          <li><Text>Single validator risk - if they get slashed or go offline, entire pool affected</Text></li>
          <li><Text>Smart contract risk - bugs in program could affect funds</Text></li>
          <li><Text>LST liquidity risk - may not always trade at fair value</Text></li>
          <li><Text>Unstaking delay - requires 2-3 days to fully unstake</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text>Validators offering liquid staking to their community</Text></li>
          <li><Text>Users who trust specific validator and want liquid staking</Text></li>
          <li><Text>DeFi protocols accepting single-validator LSTs as collateral</Text></li>
          <li><Text>Simple staking for users who want set-and-forget yields</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Single Pool Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Validator Setup Guide</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
