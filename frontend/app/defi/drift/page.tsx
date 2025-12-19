import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function DriftPage() {
  return (
    <Box>
      <Title order={1} mb="md">Drift Protocol</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is Drift Protocol?</Title>
        <Text c="dimmed" mb="md">
          Drift is a decentralized perpetual futures exchange on Solana featuring a hybrid AMM-orderbook model, offering up to 20x leverage with instant liquidity, low slippage, and a unique backstop AMM for market stability.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Hybrid Liquidity</Title>
            <Text size="sm" c="dimmed">
              Combines traditional orderbook with automated market maker for best execution.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Backstop AMM</Title>
            <Text size="sm" c="dimmed">
              Liquidity providers earn yield while providing backstop liquidity for perp markets.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">JIT Auctions</Title>
            <Text size="sm" c="dimmed">
              Just-in-time liquidity auctions give market makers milliseconds to fill orders at better prices.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Perpetual Contracts:</strong> Trade crypto, FX, and commodities with no expiry</Text></li>
          <li><Text><strong>Up to 20x Leverage:</strong> Amplify returns with cross-margin positions</Text></li>
          <li><Text><strong>Hybrid Model:</strong> DLOB (decentralized limit orderbook) + AMM</Text></li>
          <li><Text><strong>Instant Liquidity:</strong> Always-on AMM ensures trades execute immediately</Text></li>
          <li><Text><strong>LP Vaults:</strong> Passive liquidity provision with auto-rebalancing</Text></li>
          <li><Text><strong>Insurance Fund:</strong> Protects against bad debt and systemic risk</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          Drift's hybrid model routes orders through three layers:
        </Text>
        <ol>
          <li><Text><strong>JIT Auction:</strong> Order is broadcast to market makers who have ~300ms to fill at better than AMM price</Text></li>
          <li><Text><strong>Orderbook Matching:</strong> Remaining unfilled portion matches against resting limit orders</Text></li>
          <li><Text><strong>AMM Backstop:</strong> Any remaining size fills against the AMM at guaranteed price</Text></li>
        </ol>

        <Title order={3} size="h4" mt="xl" mb="md">Liquidity Provision</Title>
        <Text mb="md">
          Users can provide liquidity to Drift in two ways:
        </Text>
        <ul>
          <li><Text><strong>JIT Market Making:</strong> Compete to fill orders during auction phase</Text></li>
          <li><Text><strong>LP Vaults:</strong> Deposit into AMM pools and earn funding rates + JIT fees</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Risk Management</Title>
        <ul>
          <li><Text>Margin requirements vary by asset and position size</Text></li>
          <li><Text>Oracle-based mark prices prevent manipulation</Text></li>
          <li><Text>Auto-deleveraging when insurance fund depletes</Text></li>
          <li><Text>Gradual position liquidations to minimize impact</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Comparison with Mango</Title>
        <ul>
          <li><Text>Drift: Pure perps focus, hybrid liquidity model, JIT auctions</Text></li>
          <li><Text>Mango: Spot + perps, cross-margin, traditional orderbook</Text></li>
          <li><Text>Both offer high leverage and decentralized trading</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>Drift Protocol Documentation</Text></li>
          <li><Text>Program Source Code (protocol-v2)</Text></li>
          <li><Text>Trading Guide</Text></li>
          <li><Text>Drift SDK</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
