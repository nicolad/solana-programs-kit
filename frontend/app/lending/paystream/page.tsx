"use client";

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Badge,
  Group,
  List,
  ThemeIcon,
  Alert,
  Code,
} from "@mantine/core";
import {
  IconUsers,
  IconCoin,
  IconLock,
  IconChartLine,
  IconInfoCircle,
  IconCheck,
} from "@tabler/icons-react";

export default function PaystreamPage() {
  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Group mb="md">
            <IconUsers size={36} />
            <div>
              <Title order={1}>Paystream P2P Matching Engine</Title>
              <Text c="dimmed" size="sm">
                Direct peer-to-peer lending that compresses APY spread
              </Text>
            </div>
          </Group>

          <Group gap="xs" mb="lg">
            <Badge color="grape" variant="light">
              P2P Lending
            </Badge>
            <Badge color="blue" variant="light">
              Rate Optimization
            </Badge>
            <Badge color="green" variant="light">
              Collateralized
            </Badge>
          </Group>
        </div>

        {/* Problem & Solution */}
        <Paper shadow="sm" p="xl" withBorder>
          <Title order={3} mb="md">
            How Paystream Compresses APY Spread
          </Title>

          <Stack gap="lg">
            <div>
              <Text fw={600} mb="xs" c="red">
                The Problem: APY Spread in Traditional Pools
              </Text>
              <Text size="sm" c="dimmed" mb="md">
                In traditional lending protocols (Kamino, Marginfi), there's often a large gap
                between what borrowers pay and what lenders receive:
              </Text>
              <List
                spacing="xs"
                size="sm"
                icon={
                  <ThemeIcon color="red" size={20} radius="xl">
                    <IconInfoCircle size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <strong>Borrow APR:</strong> ~24.62% (what borrowers pay)
                </List.Item>
                <List.Item>
                  <strong>Supply APY:</strong> ~14.07% (what lenders receive)
                </List.Item>
                <List.Item>
                  <strong>Spread:</strong> ~10.55% lost to utilization curves, reserves, and
                  incentive mismatches
                </List.Item>
              </List>
            </div>

            <div>
              <Text fw={600} mb="xs" c="green">
                The Solution: P2P Matching with Averaged Rates
              </Text>
              <Text size="sm" c="dimmed" mb="md">
                Paystream directly matches lenders and borrowers, setting the rate to the
                <strong> average</strong> of their terms:
              </Text>
              <List
                spacing="xs"
                size="sm"
                icon={
                  <ThemeIcon color="green" size={20} radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <strong>Lender min rate:</strong> 14.07% (1407 bps)
                </List.Item>
                <List.Item>
                  <strong>Borrower max rate:</strong> 24.62% (2462 bps)
                </List.Item>
                <List.Item>
                  <strong>Matched rate:</strong> (14.07% + 24.62%) / 2 = <Code>19.345%</Code>{" "}
                  (1934 bps)
                </List.Item>
                <List.Item>
                  ✅ <strong>Both parties benefit</strong> vs. traditional pools
                </List.Item>
              </List>
            </div>

            <Alert icon={<IconChartLine size={16} />} title="Key Benefits" color="blue">
              <List size="sm" spacing="xs">
                <List.Item>Lenders earn MORE than pool supply APY</List.Item>
                <List.Item>Borrowers pay LESS than pool borrow APR</List.Item>
                <List.Item>
                  Yield-bearing collateral supported (earn on locked assets)
                </List.Item>
                <List.Item>Deterministic on-chain rate enforcement</List.Item>
              </List>
            </Alert>
          </Stack>
        </Paper>

        {/* Program Interface */}
        <Paper shadow="sm" p="xl" withBorder>
          <Alert icon={<IconInfoCircle size={16} />} title="Coming Soon" color="blue">
            <Text size="sm">
              Interactive panels for initializing config, creating offers/requests, matching, and managing loans will be added here.
              For now, you can interact with the program using the Anchor CLI or custom scripts.
            </Text>
          </Alert>
        </Paper>

        {/* Technical Details */}
        <Paper shadow="sm" p="xl" withBorder>
          <Title order={3} mb="md">
            How It Works
          </Title>

          <Stack gap="md">
            <div>
              <Text fw={600} mb="xs">
                1. Lender Flow
              </Text>
              <List size="sm" spacing="xs">
                <List.Item>
                  Create offer: Lock principal, set minimum APR & max duration
                </List.Item>
                <List.Item>Cancel offer: Withdraw unlocked capital</List.Item>
              </List>
            </div>

            <div>
              <Text fw={600} mb="xs">
                2. Borrower Flow
              </Text>
              <List size="sm" spacing="xs">
                <List.Item>
                  Create request: Lock collateral, specify max APR & duration
                </List.Item>
                <List.Item>Cancel request: Withdraw collateral if not matched</List.Item>
              </List>
            </div>

            <div>
              <Text fw={600} mb="xs">
                3. Matching Engine
              </Text>
              <List size="sm" spacing="xs">
                <List.Item>
                  Validates terms: rate compatibility, duration, liquidity, expiry
                </List.Item>
                <List.Item>Sets matched rate to average of lender min & borrower max</List.Item>
                <List.Item>Transfers principal to borrower</List.Item>
                <List.Item>Locks collateral in loan escrow</List.Item>
              </List>
            </div>

            <div>
              <Text fw={600} mb="xs">
                4. Loan Settlement
              </Text>
              <List size="sm" spacing="xs">
                <List.Item>Repay: Borrower pays principal + interest, unlocks collateral</List.Item>
                <List.Item>Liquidate: Lender seizes collateral if loan exceeds due date</List.Item>
                <List.Item>Protocol fees charged on interest (configurable basis points)</List.Item>
              </List>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
