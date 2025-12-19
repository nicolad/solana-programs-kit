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
  IconLayersLinked,
  IconCoin,
  IconDroplet,
  IconDatabase,
  IconBolt,
  IconWallet,
  IconCoins,
  IconLock,
  IconTrendingUp,
  IconClock,
  IconChartDots,
  IconTableOptions,
} from "@tabler/icons-react";
import { WalletBalance } from "./WalletBalance";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Core Solana programs
  const corePrograms = [
    { href: "/core/token", label: "Token Program", icon: <IconCoin size={18} />, subtitle: "SPL Tokens" },
    { href: "/core/token-2022", label: "Token-2022", icon: <IconCoin size={18} />, subtitle: "Extensions" },
    { href: "/core/associated-token", label: "Associated Token", icon: <IconWallet size={18} />, subtitle: "ATA accounts" },
    { href: "/core/memo", label: "Memo Program", icon: <IconBook size={18} />, subtitle: "On-chain notes" },
    { href: "/core/compute-budget", label: "Compute Budget", icon: <IconBolt size={18} />, subtitle: "CU limits" },
    { href: "/core/address-lookup", label: "Address Lookup", icon: <IconTableOptions size={18} />, subtitle: "Table lookups" },
    { href: "/core/system", label: "System Program", icon: <IconChartLine size={18} />, subtitle: "SOL transfers" },
  ];

  // Aggregation & Routing programs
  const aggregationPrograms = [
    { href: "/aggregation/jupiter", label: "Jupiter", icon: <IconBolt size={18} />, subtitle: "Swap aggregator" },
    { href: "/aggregation/raydium-router", label: "Raydium Router", icon: <IconLayersLinked size={18} />, subtitle: "AMM routing" },
    { href: "/aggregation/meteora-zap", label: "Meteora Zap", icon: <IconBolt size={18} />, subtitle: "Complex swaps" },
  ];

  // AMM programs
  const ammPrograms = [
    { href: "/amm", label: "AMM Overview", icon: <IconChartLine size={18} />, subtitle: "All AMM types" },
    { href: "/token-swap", label: "Token Swap (Custom)", icon: <IconArrowsExchange size={18} />, subtitle: "xy = k CPAMM ✅" },
    { href: "/amm/raydium-cpmm", label: "Raydium CPMM", icon: <IconArrowsExchange size={18} />, subtitle: "Constant product" },
    { href: "/amm/raydium-v4", label: "Raydium AMM v4", icon: <IconArrowsExchange size={18} />, subtitle: "Legacy AMM" },
    { href: "/amm/stableswap", label: "Saber StableSwap", icon: <IconScale size={18} />, subtitle: "Pegged assets" },
    { href: "/amm/raydium-clmm", label: "Raydium CLMM", icon: <IconDroplet size={18} />, subtitle: "Concentrated LP" },
    { href: "/amm/whirlpools", label: "Orca Whirlpools", icon: <IconDroplet size={18} />, subtitle: "CLMM positions" },
    { href: "/amm/meteora-dlmm", label: "Meteora DLMM", icon: <IconDroplet size={18} />, subtitle: "Dynamic bins" },
    { href: "/amm/lifinity", label: "Lifinity v2", icon: <IconTrendingUp size={18} />, subtitle: "Proactive MM" },
    { href: "/amm/pump-fun", label: "Pump.fun", icon: <IconCoin size={18} />, subtitle: "Bonding curves" },
  ];

  // Order book DEX programs
  const orderbookPrograms = [
    { href: "/orderbook/openbook-v2", label: "OpenBook v2", icon: <IconBook size={18} />, subtitle: "CLOB" },
    { href: "/orderbook/phoenix", label: "Phoenix", icon: <IconBolt size={18} />, subtitle: "High-performance" },
    { href: "/orderbook/manifest", label: "Manifest", icon: <IconBook size={18} />, subtitle: "CLOB primitive" },
    { href: "/orderbook/serum", label: "Serum DEX v3", icon: <IconBook size={18} />, subtitle: "Legacy CLOB" },
  ];

  // TWAMM programs
  const twammPrograms = [
    { href: "/twap/openbook", label: "OpenBook TWAP", icon: <IconClockHour3 size={18} />, subtitle: "Time-weighted" },
  ];

  // DeFi protocols
  const defiPrograms = [
    { href: "/defi/mango", label: "Mango v4", icon: <IconChartLine size={18} />, subtitle: "Margin trading" },
    { href: "/defi/drift", label: "Drift Protocol", icon: <IconTrendingUp size={18} />, subtitle: "Perpetuals" },
    { href: "/defi/marginfi", label: "MarginFi v2", icon: <IconCoins size={18} />, subtitle: "Lending" },
  ];

  // Infrastructure programs
  const infrastructurePrograms = [
    { href: "/infrastructure/multisig", label: "Multisig Wallet", icon: <IconLock size={18} />, subtitle: "Multi-sig ✅" },
    { href: "/infrastructure/merkle-distributor", label: "Merkle Distributor", icon: <IconBoxMultiple size={18} />, subtitle: "Airdrops" },
    { href: "/infrastructure/token-vesting", label: "Token Vesting", icon: <IconClock size={18} />, subtitle: "Time locks" },
    { href: "/infrastructure/clockwork", label: "Clockwork", icon: <IconClockHour3 size={18} />, subtitle: "Automation" },
  ];

  // Oracle programs
  const oraclePrograms = [
    { href: "/oracle/price", label: "TWAP Oracle", icon: <IconChartDots size={18} />, subtitle: "Custom oracle ✅" },
    { href: "/oracle/pyth", label: "Pyth Network", icon: <IconChartDots size={18} />, subtitle: "Pull feeds" },
    { href: "/oracle/switchboard", label: "Switchboard", icon: <IconChartDots size={18} />, subtitle: "Decentralized" },
  ];

  // Staking programs
  const stakingPrograms = [
    { href: "/staking/token", label: "Token Staking", icon: <IconCoins size={18} />, subtitle: "Custom staking ✅" },
    { href: "/staking/single-pool", label: "Single Pool", icon: <IconDroplet size={18} />, subtitle: "Basic rewards" },
    { href: "/staking/stake-pool", label: "Stake Pool", icon: <IconBoxMultiple size={18} />, subtitle: "Validator pool" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          backgroundColor: "rgba(30, 30, 46, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(88, 91, 112, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0 1.5rem",
          }}
        >
          <Title order={3} style={{ color: "rgb(203, 166, 247)" }}>
            Solana Programs
          </Title>
          <WalletBalance />
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: "rgba(30, 30, 46, 0.8)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(88, 91, 112, 0.3)",
          overflowY: "auto",
        }}
      >
        <Stack gap="xs">
          <AppShell.Section>
            <Text size="xs" fw={700} c="dimmed" mb="xs">
              CORE SOLANA
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
              AGGREGATION & ROUTING
            </Text>
            {aggregationPrograms.map((program) => (
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
              TWAMM
            </Text>
            {twammPrograms.map((program) => (
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
              STAKING & REWARDS
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
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
