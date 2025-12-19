import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function RaydiumCPMMPage() {
  return (
    <Box>
      <Title order={1} mb="md">Raydium CPMM (Constant Product)</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Raydium CPMM?</Title>
        <Text c="dimmed" mb="md">
          Raydium's Constant Product Market Maker (CPMM) is an automated market maker implementation using the classic x × y = k formula, providing efficient token swaps with minimal price slippage for balanced liquidity pools.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">x × y = k Formula</Title>
            <Text size="sm" c="dimmed">
              The product of the two token reserves remains constant, creating an automatic pricing curve.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Liquidity Provision</Title>
            <Text size="sm" c="dimmed">
              LPs deposit both tokens in equal value and earn fees from every swap.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Permissionless Pools</Title>
            <Text size="sm" c="dimmed">
              Anyone can create new trading pairs and provide liquidity without permission.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          The constant product formula ensures that the product of the quantities of the two tokens remains constant. When you buy token A with token B, the pool gives you A and receives B. The ratio changes to reflect the new balance, which automatically adjusts the price.
        </Text>
        <Text mb="md">
          For example, if a pool has 100 SOL and 10,000 USDC (ratio 1:100), buying 10 SOL would require more than 1,000 USDC because the formula maintains x × y = 1,000,000.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Low Fees:</strong> Competitive trading fees (typically 0.25%)</Text></li>
          <li><Text><strong>No Impermanent Loss Protection:</strong> Standard AMM risk model</Text></li>
          <li><Text><strong>Simple LP Model:</strong> Deposit equal values, earn fees proportionally</Text></li>
          <li><Text><strong>Permissionless:</strong> Anyone can create pools and add liquidity</Text></li>
          <li><Text><strong>Efficient:</strong> Optimized for Solana's high-speed execution</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text>Swapping tokens without an order book</Text></li>
          <li><Text>Earning passive income through LP fees</Text></li>
          <li><Text>Bootstrapping liquidity for new tokens</Text></li>
          <li><Text>Arbitrage between different DEXs</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Comparison with CLMM</Title>
        <Text mb="md">
          Unlike Concentrated Liquidity Market Makers (CLMM), CPMM distributes liquidity evenly across all prices from 0 to infinity. This means:
        </Text>
        <ul>
          <li><Text>Simpler to understand and use</Text></li>
          <li><Text>Lower capital efficiency</Text></li>
          <li><Text>No need to manage price ranges</Text></li>
          <li><Text>Better for long-tail or volatile assets</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Raydium CPMM Documentation</Text></li>
          <li><Text>AMM Program Source Code</Text></li>
          <li><Text>Liquidity Provider Guide</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
