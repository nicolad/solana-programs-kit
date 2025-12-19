"use client";

import { AppShell, Stack, NavLink, Title, Text, Divider } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconArrowsExchange,
  IconChartLine,
  IconScale,
  IconBoxMultiple,
  IconBook,
  IconClockHour3,
  IconCoin,
  IconDroplet,
  IconBolt,
  IconWallet,
  IconLock,
  IconTrendingUp,
  IconClock,
  IconChartDots,
  IconTableOptions,
  IconAnchor,
} from "@tabler/icons-react";
import { WalletBalance } from "./WalletBalance";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Custom programs
  const customPrograms = [
    {
      href: "/swap-program",
      label: "Swap Program",
      icon: <IconAnchor size={18} />,
      subtitle: "Custom Anchor swap",
    },
    {
      href: "/token-swap-amm",
      label: "Token Swap AMM",
      icon: <IconScale size={18} />,
      subtitle: "CPAMM with pools",
    },
  ];

  // Core Solana programs
  const corePrograms = [
    {
      href: "/core/token",
      label: "Token Program",
      icon: <IconCoin size={18} />,
      subtitle: "SPL Tokens",
    },
    {
      href: "/core/token-2022",
      label: "Token-2022",
      icon: <IconCoin size={18} />,
      subtitle: "Extensions",
    },
    {
      href: "/core/associated-token",
      label: "Associated Token",
      icon: <IconWallet size={18} />,
      subtitle: "ATA accounts",
    },
    {
      href: "/core/memo",
      label: "Memo Program",
      icon: <IconBook size={18} />,
      subtitle: "On-chain notes",
    },
    {
      href: "/core/compute-budget",
      label: "Compute Budget",
      icon: <IconBolt size={18} />,
      subtitle: "CU limits",
    },
    {
      href: "/core/address-lookup",
      label: "Address Lookup",
      icon: <IconTableOptions size={18} />,
      subtitle: "Table lookups",
    },
    {
      href: "/core/system",
      label: "System Program",
      icon: <IconChartLine size={18} />,
      subtitle: "SOL transfers",
    },
  ];

  // AMM programs
  const ammPrograms = [
    {
      href: "/swap",
      label: "Token Swap",
      icon: <IconArrowsExchange size={18} />,
      subtitle: "CP-AMM DEX",
    },
    {
      href: "/amm",
      label: "AMM Overview",
      icon: <IconChartLine size={18} />,
      subtitle: "Automated Market Makers",
    },
    {
      href: "/amm/raydium-cp-swap",
      label: "Raydium CP Swap",
      icon: <IconArrowsExchange size={18} />,
      subtitle: "Optimized CPAMM",
    },
    {
      href: "/amm/raydium-clmm",
      label: "Raydium CLMM",
      icon: <IconDroplet size={18} />,
      subtitle: "Concentrated liquidity",
    },
    {
      href: "/amm/whirlpools",
      label: "Orca Whirlpools",
      icon: <IconDroplet size={18} />,
      subtitle: "CLMM",
    },
  ];

  // Order book DEX programs
  const orderbookPrograms = [
    {
      href: "/orderbook/phoenix",
      label: "Phoenix",
      icon: <IconBook size={18} />,
      subtitle: "CLOB",
    },
    {
      href: "/orderbook/openbook-v2",
      label: "OpenBook v2",
      icon: <IconBook size={18} />,
      subtitle: "CLOB",
    },
  ];

  // DeFi programs
  const defiPrograms = [
    {
      href: "/defi/mango",
      label: "Mango Markets",
      icon: <IconTrendingUp size={18} />,
      subtitle: "Perps & Margin",
    },
    {
      href: "/defi/drift",
      label: "Drift Protocol",
      icon: <IconTrendingUp size={18} />,
      subtitle: "Perps trading",
    },
    {
      href: "/defi/marginfi",
      label: "MarginFi",
      icon: <IconLock size={18} />,
      subtitle: "Lending",
    },
  ];

  // Infrastructure programs
  const infrastructurePrograms = [
    {
      href: "/infrastructure/merkle-distributor",
      label: "Merkle Distributor",
      icon: <IconBoxMultiple size={18} />,
      subtitle: "Airdrops",
    },
    {
      href: "/infrastructure/token-vesting",
      label: "Token Vesting",
      icon: <IconClock size={18} />,
      subtitle: "Time locks",
    },
    {
      href: "/infrastructure/clockwork",
      label: "Clockwork",
      icon: <IconClockHour3 size={18} />,
      subtitle: "Automation",
    },
  ];

  // Oracle programs
  const oraclePrograms = [
    {
      href: "/oracle/openbook-twap",
      label: "OpenBook TWAP",
      icon: <IconChartDots size={18} />,
      subtitle: "Price oracle",
    },
  ];

  // Staking programs
  const stakingPrograms = [
    {
      href: "/staking/single-pool",
      label: "Single Pool",
      icon: <IconDroplet size={18} />,
      subtitle: "Basic staking",
    },
    {
      href: "/staking/stake-pool",
      label: "Stake Pool",
      icon: <IconBoxMultiple size={18} />,
      subtitle: "Pooled staking",
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            padding: "0 1rem",
          }}
        >
          <Title order={3}>Solana Programs</Title>
          <div style={{ marginLeft: "auto" }}>
            <WalletBalance />
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ overflowY: "auto" }}>
        <Stack gap="xs">
          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              CUSTOM PROGRAMS
            </Text>
            {customPrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              CORE SOLANA PROGRAMS
            </Text>
            {corePrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              AMM PROGRAMS
            </Text>
            {ammPrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              ORDER BOOK DEX
            </Text>
            {orderbookPrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              DEFI PROTOCOLS
            </Text>
            {defiPrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              INFRASTRUCTURE
            </Text>
            {infrastructurePrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              PRICE ORACLES
            </Text>
            {oraclePrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>

          <Divider my="sm" />

          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              STAKING
            </Text>
            {stakingPrograms.map((program) => (
              <NavLink
                key={program.href}
                component={Link}
                href={program.href}
                label={program.label}
                description={program.subtitle}
                leftSection={program.icon}
                active={pathname === program.href}
              />
            ))}
          </AppShell.Section>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
