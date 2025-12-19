"use client";

import { Container, Title, Text, Paper, Stack, Code } from "@mantine/core";

export default function PumpFunPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Pump.fun</Title>
          <Text c="dimmed" size="lg">
            Fair launch bonding curve platform for token creation
          </Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">What is Pump.fun?</Title>
          <Stack gap="md">
            <Text>
              Pump.fun is a token launchpad that uses a bonding curve mechanism to enable fair, permissionless token launches without requiring upfront liquidity. Anyone can create a token instantly, and the bonding curve ensures continuous liquidity as the price rises with purchases.
            </Text>
            <Text>
              Core mechanics:
            </Text>
            <ul>
              <li><Text component="span">Bonding curve automatically prices tokens based on supply</Text></li>
              <li><Text component="span">No pre-mine or team allocation - completely fair launch</Text></li>
              <li><Text component="span">When market cap hits threshold, liquidity migrates to Raydium</Text></li>
              <li><Text component="span">Instant token creation with no liquidity needed</Text></li>
              <li><Text component="span">Built-in trading interface and charts</Text></li>
            </ul>
            <Text>
              Pump.fun has become the go-to platform for memecoins and community tokens on Solana, enabling anyone to launch and trade tokens with minimal friction.
            </Text>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Bonding Curve Explained</Title>
          <Stack gap="md">
            <div>
              <Title order={3} size="h4" mb="xs">Pricing Formula</Title>
              <Text>Token price increases along a mathematical curve as more tokens are purchased. Early buyers get lower prices, creating incentive for discovery.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Constant Liquidity</Title>
              <Text>The bonding curve itself IS the liquidity pool. Buyers purchase from the curve, sellers sell back to it. No external LP needed.</Text>
            </div>
            <div>
              <Title order={3} size="h4" mb="xs">Graduation</Title>
              <Text>When the curve completes (reaches target market cap), collected SOL migrates to Raydium as permanent liquidity, and the token "graduates" to the main DEX.</Text>
            </div>
          </Stack>
        </Paper>

        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">Program ID</Title>
          <Code block>6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P</Code>
        </Paper>
      </Stack>
    </Container>
  );
}
