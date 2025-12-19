import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function MangoPage() {
  return (
    <Box>
      <Title order={1} mb="md">Mango Markets</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Mango Markets?</Title>
        <Text c="dimmed" mb="md">
          Mango Markets is a fully decentralized trading platform on Solana offering spot margin trading, perpetual futures, and cross-margined lending with up to 20x leverage, all governed by the MNGO token community.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Cross-Margin Trading</Title>
            <Text size="sm" c="dimmed">
              Use your entire portfolio as collateral across all positions for maximum capital efficiency.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Perpetual Futures</Title>
            <Text size="sm" c="dimmed">
              Trade leveraged perpetual contracts without expiry dates or settlement.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Decentralized Liquidations</Title>
            <Text size="sm" c="dimmed">
              Community-run liquidator bots ensure protocol solvency and earn liquidation fees.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Spot Margin:</strong> Borrow to trade spot markets with up to 5x leverage</Text></li>
          <li><Text><strong>Perpetual Futures:</strong> Long/short with up to 20x leverage</Text></li>
          <li><Text><strong>Cross-Margin:</strong> Single margin account across all markets</Text></li>
          <li><Text><strong>Lending:</strong> Earn interest by providing liquidity to margin traders</Text></li>
          <li><Text><strong>Advanced Orders:</strong> Limit, market, stop-loss, take-profit orders</Text></li>
          <li><Text><strong>Risk Engine:</strong> Real-time health monitoring prevents cascading liquidations</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Users deposit collateral into a Mango Account, which tracks positions across all markets. The account's health is continuously monitored based on asset weights and liabilities. When health falls below maintenance threshold, liquidators can take over positions to restore solvency.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Risk Management</Title>
        <ul>
          <li><Text>Asset weights determine how much each collateral type counts toward margin</Text></li>
          <li><Text>Initial margin requirements prevent over-leveraging</Text></li>
          <li><Text>Maintenance margin triggers liquidations when health is critical</Text></li>
          <li><Text>Oracle-based pricing prevents manipulation</Text></li>
          <li><Text>Gradual liquidations minimize market impact</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Governance</Title>
        <Text mb="md">
          MNGO token holders govern protocol parameters:
        </Text>
        <ul>
          <li><Text>Adding new trading pairs and assets</Text></li>
          <li><Text>Adjusting collateral weights and margin requirements</Text></li>
          <li><Text>Setting fee structures</Text></li>
          <li><Text>Treasury management and protocol upgrades</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Mango Markets Documentation</Text></li>
          <li><Text>Program Source Code (mango-v4)</Text></li>
          <li><Text>Trading Guide</Text></li>
          <li><Text>Mango SDK</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
