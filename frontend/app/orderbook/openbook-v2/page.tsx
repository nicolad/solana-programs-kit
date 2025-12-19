import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function OpenBookV2Page() {
  return (
    <Box>
      <Title order={1} mb="md">OpenBook v2</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is OpenBook v2?</Title>
        <Text c="dimmed" mb="md">
          OpenBook v2 is a community-driven orderbook DEX on Solana, evolved from Serum v3. It provides a fully on-chain central limit order book (CLOB) for efficient price discovery and professional trading with limit orders, market orders, and advanced order types.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Central Limit Order Book</Title>
            <Text size="sm" c="dimmed">
              Traditional orderbook matching with bids and asks, providing familiar CEX-like trading.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Advanced Order Types</Title>
            <Text size="sm" c="dimmed">
              Support for limit, market, post-only, IOC, and FOK orders like professional exchanges.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Cranker Rewards</Title>
            <Text size="sm" c="dimmed">
              Keepers earn rewards for processing order matching and maintaining the orderbook.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          OpenBook operates as a fully on-chain central limit order book. Traders place orders that sit in the orderbook until matched. Market makers provide liquidity by placing limit orders on both sides, earning the bid-ask spread. Crankers (automated bots) match orders and maintain the orderbook state.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Limit Orders:</strong> Place buy/sell orders at specific prices</Text></li>
          <li><Text><strong>Market Orders:</strong> Execute immediately at best available price</Text></li>
          <li><Text><strong>Post-Only:</strong> Ensure orders add liquidity (no taker fees)</Text></li>
          <li><Text><strong>IOC (Immediate or Cancel):</strong> Execute what's possible, cancel rest</Text></li>
          <li><Text><strong>FOK (Fill or Kill):</strong> Execute fully or cancel entirely</Text></li>
          <li><Text><strong>Open Orders Accounts:</strong> Track your active orders per market</Text></li>
          <li><Text><strong>Permissionless Markets:</strong> Anyone can create new trading pairs</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Advantages vs AMMs</Title>
        <ul>
          <li><Text>No impermanent loss for liquidity providers</Text></li>
          <li><Text>Better price discovery through transparent orderbooks</Text></li>
          <li><Text>More capital efficient (don't need to deposit in pools)</Text></li>
          <li><Text>Familiar interface for CEX traders</Text></li>
          <li><Text>Advanced order types for sophisticated strategies</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Market Making</Title>
        <Text mb="md">
          Professional market makers provide liquidity by placing limit orders on both sides of the orderbook. They earn from:
        </Text>
        <ul>
          <li><Text>Bid-ask spread (buy at lower price, sell at higher)</Text></li>
          <li><Text>Maker rebates on some markets</Text></li>
          <li><Text>Arbitrage between different venues</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Integration</Title>
        <ul>
          <li><Text>Used as liquidity source by aggregators (Jupiter, etc.)</Text></li>
          <li><Text>Composable with other Solana DeFi protocols</Text></li>
          <li><Text>API and SDK for bot trading and market making</Text></li>
          <li><Text>Crank rewards encourage decentralized order matching</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>OpenBook v2 Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Market Making Guide</Text></li>
          <li><Text>OpenBook SDK</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
