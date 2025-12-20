"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Container, Title, Text, Stack, Grid, Paper, Group, Badge, Tabs } from "@mantine/core";
import { IconArrowsExchange, IconDroplet, IconChartLine } from "@tabler/icons-react";
import { WalletRequired } from "@/components/WalletRequired";
import { SwapForm } from "@/components/token-swap/SwapForm";
import { DepositLiquidity } from "@/components/token-swap/DepositLiquidity";
import { WithdrawLiquidity } from "@/components/token-swap/WithdrawLiquidity";

// Mock data - in production, fetch from on-chain accounts
const MOCK_AMM_ID = new PublicKey("11111111111111111111111111111111");
const MOCK_TOKENS = [
  {
    mint: new PublicKey("So11111111111111111111111111111111111111112"),
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
  },
  {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
  },
];

export default function Home() {
  const wallet = useWallet();
  const [activeTab, setActiveTab] = useState<string | null>("swap");
  
  const poolBalances = {
    [MOCK_TOKENS[0].mint.toString()]: 1000,
    [MOCK_TOKENS[1].mint.toString()]: 50000,
  };

  const fee = 30; // 0.3% in basis points
  const lpBalance = 0;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="sm" mb="xs">
            <Title order={1}>Token Swap AMM</Title>
            <Badge size="lg" variant="light" color="blue">Constant Product</Badge>
          </Group>
          <Text c="dimmed" size="lg">
            Trade tokens using the constant product formula (x × y = k)
          </Text>
        </div>

        {!wallet.connected ? (
          <WalletRequired />
        ) : (
          <>
            <Paper shadow="xs" p="lg" radius="md" withBorder>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconChartLine size={18} />
                      <Text size="sm" c="dimmed">Total Value Locked</Text>
                    </Group>
                    <Text size="xl" fw={700}>$100,000</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconArrowsExchange size={18} />
                      <Text size="sm" c="dimmed">24h Volume</Text>
                    </Group>
                    <Text size="xl" fw={700}>$25,000</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconDroplet size={18} />
                      <Text size="sm" c="dimmed">LP Fee</Text>
                    </Group>
                    <Text size="xl" fw={700}>{fee / 100}%</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List grow>
                <Tabs.Tab value="swap" leftSection={<IconArrowsExchange size={16} />}>Swap</Tabs.Tab>
                <Tabs.Tab value="add" leftSection={<IconDroplet size={16} />}>Add Liquidity</Tabs.Tab>
                <Tabs.Tab value="remove" leftSection={<IconDroplet size={16} />}>Remove Liquidity</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="swap" pt="xl">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <SwapForm
                      ammId={MOCK_AMM_ID}
                      tokens={MOCK_TOKENS}
                      poolBalances={poolBalances}
                      fee={fee}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="xs" p="lg" radius="md" withBorder>
                      <Stack gap="md">
                        <Text size="lg" fw={700}>How It Works</Text>
                        <Text size="sm" c="dimmed">
                          This AMM uses the <strong>Constant Product Formula</strong>:
                        </Text>
                        <Paper p="md" bg="dark.6" radius="md">
                          <Text size="sm" ff="monospace">
                            output = (input × poolB) / (poolA + input)
                          </Text>
                        </Paper>
                        <Stack gap="xs">
                          <Text size="sm">• {fee / 100}% fee on each trade</Text>
                          <Text size="sm">• Fees go to liquidity providers</Text>
                          <Text size="sm">• Price impact grows with trade size</Text>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="add" pt="xl">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <DepositLiquidity
                      ammId={MOCK_AMM_ID}
                      tokenA={MOCK_TOKENS[0]}
                      tokenB={MOCK_TOKENS[1]}
                      poolBalances={{
                        a: poolBalances[MOCK_TOKENS[0].mint.toString()],
                        b: poolBalances[MOCK_TOKENS[1].mint.toString()],
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="xs" p="lg" radius="md" withBorder>
                      <Stack gap="md">
                        <Text size="lg" fw={700}>Earn Trading Fees</Text>
                        <Text size="sm" c="dimmed">
                          Earn {fee / 100}% of trading fees proportional to your pool share
                        </Text>
                        <Paper p="md" bg="dark.6" radius="md">
                          <Stack gap="xs">
                            <Group justify="space-between">
                              <Text size="sm">Pool Share</Text>
                              <Text size="sm" fw={600}>0%</Text>
                            </Group>
                            <Group justify="space-between">
                              <Text size="sm">Expected APY</Text>
                              <Text size="sm" fw={600} c="green">~12%</Text>
                            </Group>
                          </Stack>
                        </Paper>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="remove" pt="xl">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <WithdrawLiquidity
                      ammId={MOCK_AMM_ID}
                      tokenA={MOCK_TOKENS[0]}
                      tokenB={MOCK_TOKENS[1]}
                      lpBalance={lpBalance}
                      lpDecimals={6}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="xs" p="lg" radius="md" withBorder>
                      <Stack gap="md">
                        <Text size="lg" fw={700}>Your Position</Text>
                        {lpBalance === 0 ? (
                          <Text size="sm" c="dimmed">No liquidity provided yet</Text>
                        ) : (
                          <Stack gap="xs">
                            <Group justify="space-between">
                              <Text size="sm">LP Tokens</Text>
                              <Text size="sm" fw={600}>{lpBalance}</Text>
                            </Group>
                          </Stack>
                        )}
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </Stack>
    </Container>
  );
}
