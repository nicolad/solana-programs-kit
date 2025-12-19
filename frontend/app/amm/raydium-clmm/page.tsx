import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function RaydiumCLMMPage() {
  return (
    <Box>
      <Title order={1} mb="md">Raydium CLMM</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Raydium CLMM?</Title>
        <Text c="dimmed" mb="md">
          Raydium's Concentrated Liquidity Market Maker (CLMM) allows liquidity providers to concentrate their capital within specific price ranges, achieving up to 4000x capital efficiency compared to traditional AMMs while earning higher fee returns.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Concentrated Liquidity</Title>
            <Text size="sm" c="dimmed">
              Provide liquidity only within chosen price ranges for maximum capital efficiency.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Higher Fee Earnings</Title>
            <Text size="sm" c="dimmed">
              Earn more fees per dollar deposited by concentrating liquidity where trades happen.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Multiple Fee Tiers</Title>
            <Text size="sm" c="dimmed">
              Choose from different fee tiers (0.01%, 0.05%, 0.25%, 1%) based on pool volatility.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Instead of providing liquidity across all prices (0 to ∞), CLMM lets you choose a specific price range. Your liquidity is only active when the market price is within your range. This concentration means:
        </Text>
        <ul>
          <li><Text>Higher capital efficiency - same liquidity with less capital</Text></li>
          <li><Text>Higher fee earnings - more trading happens in your range</Text></li>
          <li><Text>Active management required - need to adjust ranges as prices move</Text></li>
          <li><Text>Risk of being out of range - no fees earned if price exits your range</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Customizable Ranges:</strong> Choose any price range for your liquidity</Text></li>
          <li><Text><strong>Multiple Positions:</strong> Create multiple positions with different ranges</Text></li>
          <li><Text><strong>Fee Tiers:</strong> 0.01% for stablecoins, 0.05% for correlated pairs, 0.25%/1% for volatile pairs</Text></li>
          <li><Text><strong>NFT Positions:</strong> Each liquidity position is represented as an NFT</Text></li>
          <li><Text><strong>Real-time Compounding:</strong> Fees compound automatically within positions</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Strategies</Title>
        <ul>
          <li><Text><strong>Tight Ranges:</strong> Maximize fees but require frequent rebalancing</Text></li>
          <li><Text><strong>Wide Ranges:</strong> Lower fees but less maintenance needed</Text></li>
          <li><Text><strong>Multiple Ranges:</strong> Spread risk across different price levels</Text></li>
          <li><Text><strong>Stablecoin Pairs:</strong> Very tight ranges around $1 with minimal rebalancing</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">vs Traditional AMM</Title>
        <Text mb="md">Advantages:</Text>
        <ul>
          <li><Text>Up to 4000x more capital efficient</Text></li>
          <li><Text>Higher fee earnings per dollar</Text></li>
          <li><Text>Better suited for stablecoin and correlated asset pairs</Text></li>
        </ul>
        <Text mt="md" mb="md">Disadvantages:</Text>
        <ul>
          <li><Text>More complex to manage</Text></li>
          <li><Text>Requires active monitoring and rebalancing</Text></li>
          <li><Text>Can miss fees if price moves out of range</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Raydium CLMM Documentation</Text></li>
          <li><Text>CLMM Program Source Code</Text></li>
          <li><Text>Concentrated Liquidity Strategy Guide</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
