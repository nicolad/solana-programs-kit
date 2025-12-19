import { Title, Text, Paper, Box, SimpleGrid } from "@mantine/core";

export default function OpenBookTWAPPage() {
  return (
    <Box>
      <Title order={1} mb="md">OpenBook TWAP Oracle</Title>
      
      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">What is OpenBook TWAP?</Title>
        <Text c="dimmed" mb="md">
          OpenBook TWAP (Time-Weighted Average Price) oracle provides manipulation-resistant price feeds derived from OpenBook orderbook markets. It calculates average prices over time windows, making it harder for attackers to manipulate prices with flash attacks.
        </Text>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Manipulation Resistant</Title>
            <Text size="sm" c="dimmed">
              Time-weighted averaging makes flash loan attacks and single-block manipulation ineffective.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">On-Chain Orderbook</Title>
            <Text size="sm" c="dimmed">
              Derives prices directly from OpenBook's transparent, decentralized orderbooks.
            </Text>
          </Paper>
          
          <Paper p="md" withBorder>
            <Title order={4} size="h5" mb="xs">Customizable Windows</Title>
            <Text size="sm" c="dimmed">
              Configure time windows (5min, 1hr, 24hr) based on your security requirements.
            </Text>
          </Paper>
        </SimpleGrid>
      </Box>

      <Paper p="xl" withBorder>
        <Title order={2} mb="md">Program Details</Title>
        
        <Title order={3} size="h4" mt="xl" mb="md">How TWAP Works</Title>
        <Text mb="md">
          Instead of using the current market price (which can be manipulated), TWAP calculates:
        </Text>
        <Text mb="md" style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          TWAP = Σ (price × time) / total time
        </Text>
        <Text mt="md">
          For example, if SOL trades at $100 for 30 minutes, then $105 for 30 minutes, the 1-hour TWAP is $102.50 (average weighted by time).
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Why TWAP Matters</Title>
        <Text mb="md">
          Spot prices can be manipulated through:
        </Text>
        <ul>
          <li><Text>Flash loans to temporarily move markets</Text></li>
          <li><Text>Large trades executed right before oracle updates</Text></li>
          <li><Text>Low liquidity allowing easy price manipulation</Text></li>
        </ul>
        <Text mt="md">
          TWAP makes these attacks expensive because manipulators must sustain the false price over the entire time window.
        </Text>

        <Title order={3} size="h4" mt="xl" mb="md">Key Features</Title>
        <ul>
          <li><Text><strong>Multiple Time Windows:</strong> 5min, 15min, 1hr, 4hr, 24hr options</Text></li>
          <li><Text><strong>Observation Granularity:</strong> Higher frequency = more accurate but more storage</Text></li>
          <li><Text><strong>Market Filtering:</strong> Only use high-liquidity OpenBook markets</Text></li>
          <li><Text><strong>Failover Logic:</strong> Fall back to spot if TWAP data unavailable</Text></li>
          <li><Text><strong>Programmable Updates:</strong> Keepers update oracle on schedule</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Use Cases</Title>
        <ul>
          <li><Text><strong>Lending Protocols:</strong> Collateral valuation and liquidation triggers</Text></li>
          <li><Text><strong>Perpetual Futures:</strong> Mark price and funding rate calculations</Text></li>
          <li><Text><strong>Options:</strong> Strike price and settlement references</Text></li>
          <li><Text><strong>Stablecoins:</strong> Peg maintenance and collateral ratios</Text></li>
          <li><Text><strong>Synthetic Assets:</strong> Minting and redemption pricing</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Security Considerations</Title>
        <ul>
          <li><Text>Longer windows = more secure but less responsive to real price changes</Text></li>
          <li><Text>Short windows = more responsive but easier to manipulate</Text></li>
          <li><Text>Use multiple oracles (Pyth, Switchboard) for redundancy</Text></li>
          <li><Text>Monitor market liquidity - TWAP only works on deep markets</Text></li>
          <li><Text>Set circuit breakers for extreme price deviations</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">vs Other Oracles</Title>
        <Text mb="md"><strong>Pyth:</strong></Text>
        <ul>
          <li><Text>Pros: Sub-second updates, professional data sources</Text></li>
          <li><Text>Cons: Centralized data providers, requires trust</Text></li>
        </ul>

        <Text mt="md" mb="md"><strong>OpenBook TWAP:</strong></Text>
        <ul>
          <li><Text>Pros: Fully decentralized, manipulation resistant</Text></li>
          <li><Text>Cons: Delayed updates, depends on orderbook liquidity</Text></li>
        </ul>

        <Title order={3} size="h4" mt="xl" mb="md">Resources</Title>
        <ul>
          <li><Text>OpenBook TWAP Documentation</Text></li>
          <li><Text>Program Source Code</Text></li>
          <li><Text>Oracle Security Guide</Text></li>
          <li><Text>Integration Examples</Text></li>
        </ul>
      </Paper>
    </Box>
  );
}
