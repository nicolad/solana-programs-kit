import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function MarginfiPage() {
  return (
    <Box>
      <Title order={1} mb="md">MarginFi</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is MarginFi?</Title>
        <Text c="dimmed" mb="md">
          MarginFi is a decentralized lending protocol on Solana that enables users to lend, borrow, and leverage their crypto assets with variable interest rates, isolated risk pools, and cross-margin capabilities for maximum capital efficiency.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Lending & Borrowing</Title>
            <Text size="sm" c="dimmed">
              Earn yield by lending assets or borrow against collateral at variable rates.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Isolated Pools</Title>
            <Text size="sm" c="dimmed">
              Risk is contained within individual pools, protecting against systemic contagion.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Cross-Margin</Title>
            <Text size="sm" c="dimmed">
              Use your entire portfolio as collateral across all borrowing positions.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Variable Interest Rates:</strong> Rates adjust based on supply and demand</Text></li>
          <li><Text><strong>Isolated Risk Pools:</strong> Each asset pool has separate risk parameters</Text></li>
          <li><Text><strong>Flash Loans:</strong> Borrow without collateral within single transaction</Text></li>
          <li><Text><strong>Liquidations:</strong> Automated liquidation engine maintains protocol solvency</Text></li>
          <li><Text><strong>Oracle Integration:</strong> Pyth and Switchboard for accurate pricing</Text></li>
          <li><Text><strong>Points Program:</strong> Earn rewards for lending, borrowing, and referrals</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">How It Works</Title>
        <Text mb="md">
          <strong>Lending:</strong> Deposit assets into lending pools and earn interest paid by borrowers. Interest rates increase as utilization rises.
        </Text>
        <Text mb="md">
          <strong>Borrowing:</strong> Deposit collateral and borrow other assets up to your collateral's loan-to-value (LTV) ratio. Pay variable interest on borrowed amounts.
        </Text>
        <Text mb="md">
          <strong>Liquidations:</strong> If your account health drops below maintenance margin, liquidators can repay part of your debt in exchange for your collateral at a discount.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Interest Rate Model</Title>
        <ul>
          <li><Text>Rates determined by utilization: borrowed / supplied</Text></li>
          <li><Text>Low utilization = low rates (encourage borrowing)</Text></li>
          <li><Text>High utilization = high rates (encourage lending)</Text></li>
          <li><Text>Kink model: steep rate increase above optimal utilization</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Risk Parameters</Title>
        <ul>
          <li><Text><strong>Loan-to-Value (LTV):</strong> Max borrow amount vs collateral value</Text></li>
          <li><Text><strong>Liquidation Threshold:</strong> Point where liquidation triggers</Text></li>
          <li><Text><strong>Liquidation Penalty:</strong> Discount liquidators receive</Text></li>
          <li><Text><strong>Asset Tier:</strong> Risk rating determines max leverage</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text>Earn passive yield on idle assets</Text></li>
          <li><Text>Leverage long positions (borrow stables against SOL)</Text></li>
          <li><Text>Short assets (borrow asset, sell, buy back cheaper)</Text></li>
          <li><Text>Flash loan arbitrage and liquidations</Text></li>
          <li><Text>Delta-neutral farming strategies</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>MarginFi Documentation</Text></li>
          <li><Text>Program Source Code (marginfi-v2)</Text></li>
          <li><Text>Risk Parameters Guide</Text></li>
          <li><Text>MarginFi SDK</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
