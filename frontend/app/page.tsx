"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";
import Link from "next/link";
import {
  IconArrowsExchange,
  IconChartLine,
  IconCurrencyDollar,
  IconDroplet,
  IconClock,
  IconChartDots,
  IconBook,
  IconShieldCheck,
  IconBolt,
  IconCoins,
  IconTrendingUp,
} from "@tabler/icons-react";

export default function Home() {
  const corePrograms = [
    {
      id: "core",
      name: "Core Solana Programs",
      description: "Token, System, Compute Budget, Address Lookup Tables",
      icon: <IconShieldCheck size={24} />,
      href: "/core/token",
    },
  ];

  const aggregationPrograms = [
    {
      id: "aggregation",
      name: "Aggregation & Routing",
      description: "Jupiter, Raydium Router, Meteora Zap",
      icon: <IconArrowsExchange size={24} />,
      href: "/aggregation/jupiter",
    },
  ];

  const dexPrograms = [
    {
      id: "orderbook",
      name: "Order Book DEX",
      description: "OpenBook v2, Phoenix, Manifest, Serum",
      icon: <IconBook size={24} />,
      href: "/orderbook/openbook-v2",
    },
    {
      id: "twamm",
      name: "TWAMM",
      description: "Time-weighted average price execution",
      icon: <IconClock size={24} />,
      href: "/twap/openbook",
    },
  ];

  const defiPrograms = [
    {
      id: "defi",
      name: "DeFi Protocols",
      description: "Mango v4, Drift Protocol, MarginFi - Perps & Margin",
      icon: <IconChartLine size={24} />,
      href: "/defi/mango",
    },
  ];

  const stakingPrograms = [
    {
      id: "staking",
      name: "Staking & Rewards",
      description: "Token staking, Single pool, Validator stake pools",
      icon: <IconDroplet size={24} />,
      href: "/staking/token",
      featured: true,
    },
  ];

  const oraclePrograms = [
    {
      id: "oracle",
      name: "Price Oracles",
      description: "TWAP, Pyth, Switchboard price feeds",
      icon: <IconChartDots size={24} />,
      href: "/oracle/price",
      featured: true,
    },
  ];

  const infrastructurePrograms = [
    {
      id: "infrastructure",
      name: "Infrastructure",
      description: "Multisig, Merkle distributor, Vesting, Clockwork",
      icon: <IconCurrencyDollar size={24} />,
      href: "/infrastructure/multisig",
      featured: true,
    },
  ];

  const ammPrograms = [
    {
      id: "token-swap",
      name: "Token Swap (Custom)",
      description: "Constant Product AMM (xy = k) - Fully Implemented ✅",
      icon: <IconArrowsExchange size={24} />,
      href: "/token-swap",
      featured: true,
    },
    {
      id: "amm-raydium",
      name: "Raydium AMMs",
      description: "CPMM, Legacy v4, Stable Swap, CLMM",
      icon: <IconChartLine size={24} />,
      href: "/amm/raydium-cpmm",
    },
    {
      id: "amm-orca",
      name: "Orca Whirlpools",
      description: "Concentrated Liquidity Market Maker (CLMM)",
      icon: <IconDroplet size={24} />,
      href: "/amm/whirlpools",
    },
    {
      id: "amm-meteora",
      name: "Meteora",
      description: "DLMM, DAMM, Dynamic pools",
      icon: <IconChartDots size={24} />,
      href: "/amm/meteora-dlmm",
    },
    {
      id: "amm-saber",
      name: "Saber StableSwap",
      description: "Curve-style for pegged assets",
      icon: <IconCurrencyDollar size={24} />,
      href: "/amm/stableswap",
    },
    {
      id: "amm-others",
      name: "Other AMMs",
      description: "Lifinity, Step Finance, Pump.fun",
      icon: <IconChartLine size={24} />,
      href: "/amm/lifinity",
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div style={{ textAlign: "center" }}>
          <Title
            order={1}
            mb="xs"
            style={{
              background: "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Solana Programs
          </Title>
          <Text c="dimmed" size="lg">
            Production-ready DeFi programs with mainnet & devnet support
          </Text>
        </div>

        {/* Core Programs Section */}
        <div>
          <Title order={2} mb="md">
            🧬 Core Solana Programs
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {corePrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(203, 166, 247)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* Aggregation Programs Section */}
        <div>
          <Title order={2} mb="md">
            🔀 Aggregation & Routing
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {aggregationPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(203, 166, 247)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* AMM Programs Section */}
        <div>
          <Title order={2} mb="md">
            💱 Automated Market Makers
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {ammPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: program.featured
                      ? "rgba(148, 187, 233, 0.1)"
                      : "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: program.featured
                      ? "rgba(148, 187, 233, 0.3)"
                      : "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div
                      style={{
                        color: program.featured
                          ? "rgb(148, 187, 233)"
                          : "rgb(203, 166, 247)",
                      }}
                    >
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* DEX Programs Section */}
        <div>
          <Title order={2} mb="md">
            📊 DEX & Trading
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {dexPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(203, 166, 247)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* DeFi Programs Section */}
        <div>
          <Title order={2} mb="md">
            💰 DeFi Protocols
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {defiPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(203, 166, 247)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* Staking Programs Section */}
        <div>
          <Title order={2} mb="md">
            🔒 Staking & Rewards
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {stakingPrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: program.featured
                      ? "rgba(148, 187, 233, 0.1)"
                      : "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: program.featured
                      ? "rgba(148, 187, 233, 0.3)"
                      : "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(148, 187, 233)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* Oracle Programs Section */}
        <div>
          <Title order={2} mb="md">
            🔮 Price Oracles
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {oraclePrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: program.featured
                      ? "rgba(148, 187, 233, 0.1)"
                      : "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: program.featured
                      ? "rgba(148, 187, 233, 0.3)"
                      : "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(148, 187, 233)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>

        {/* Infrastructure Programs Section */}
        <div>
          <Title order={2} mb="md">
            🏗️ Infrastructure
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {infrastructurePrograms.map((program) => (
              <Link
                key={program.id}
                href={program.href}
                style={{ textDecoration: "none" }}
              >
                <Card
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: program.featured
                      ? "rgba(148, 187, 233, 0.1)"
                      : "rgba(30, 30, 46, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: program.featured
                      ? "rgba(148, 187, 233, 0.3)"
                      : "rgba(88, 91, 112, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(180, 190, 254, 0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px -12px rgba(180, 190, 254, 0.15)";
                  }}
                >
                  <Stack gap="md">
                    <div style={{ color: "rgb(148, 187, 233)" }}>
                      {program.icon}
                    </div>
                    <div>
                      <Title order={3} mb="xs">
                        {program.name}
                      </Title>
                      <Text c="dimmed" size="sm">
                        {program.description}
                      </Text>
                    </div>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
}
