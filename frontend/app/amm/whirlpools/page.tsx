import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function WhirlpoolsPage() {
  return (
    <Box>
      <Title order={1} mb="md">Orca Whirlpools</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What are Orca Whirlpools?</Title>
        <Text c="dimmed" mb="md">
          Whirlpools is Orca's concentrated liquidity AMM that maximizes capital efficiency by allowing liquidity providers to allocate capital to specific price ranges, earning higher yields while providing better pricing for traders.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Capital Efficiency</Title>
            <Text size="sm" c="dimmed">
              Concentrate liquidity in active trading ranges to maximize returns on deposited capital.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Flexible Strategies</Title>
            <Text size="sm" c="dimmed">
              Choose from multiple fee tiers and customize your liquidity provision strategy.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Best Execution</Title>
            <Text size="sm" c="dimmed">
              Traders benefit from concentrated liquidity with lower slippage and better prices.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Whirlpools implements Uniswap V3-style concentrated liquidity on Solana. Instead of spreading liquidity across all possible prices, LPs can concentrate their capital within custom price ranges where they expect the most trading activity.
        </Text>
        <Text mb="md">
          Each position is represented as an NFT, allowing LPs to manage multiple positions with different strategies across various pools simultaneously.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Price Range Selection:</strong> Choose upper and lower bounds for your liquidity</Text></li>
          <li><Text><strong>Multiple Fee Tiers:</strong> 0.01%, 0.04%, 0.3%, and 1% fee options</Text></li>
          <li><Text><strong>Position NFTs:</strong> Each position is a unique NFT that can be transferred</Text></li>
          <li><Text><strong>Reward Streams:</strong> Earn trading fees plus optional reward tokens</Text></li>
          <li><Text><strong>Composability:</strong> Integrate with other Solana DeFi protocols</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">LP Strategies</Title>
        <ul>
          <li><Text><strong>Narrow Range:</strong> High APR but needs frequent rebalancing (best for stablecoins)</Text></li>
          <li><Text><strong>Wide Range:</strong> Lower APR but more passive (better for volatile pairs)</Text></li>
          <li><Text><strong>Full Range:</strong> Similar to traditional AMM (no active management)</Text></li>
          <li><Text><strong>Range Orders:</strong> Provide liquidity above/below current price to simulate limit orders</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Benefits for Traders</Title>
        <ul>
          <li><Text>Lower slippage on trades due to concentrated liquidity</Text></li>
          <li><Text>Better prices compared to traditional AMMs</Text></li>
          <li><Text>Deep liquidity in commonly traded ranges</Text></li>
          <li><Text>Multiple pools with different fee tiers for optimal routing</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Comparison with Raydium CLMM</Title>
        <Text mb="md">Both are concentrated liquidity AMMs, but differ in:</Text>
        <ul>
          <li><Text>UI/UX design and user experience</Text></li>
          <li><Text>Available trading pairs and liquidity depth</Text></li>
          <li><Text>Integration with aggregators and other protocols</Text></li>
          <li><Text>Reward programs and incentive structures</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Orca Whirlpools Documentation</Text></li>
          <li><Text>Whirlpools SDK and Examples</Text></li>
          <li><Text>Liquidity Provider Guide</Text></li>
          <li><Text>Whirlpools Program Source Code</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
