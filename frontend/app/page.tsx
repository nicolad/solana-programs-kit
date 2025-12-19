"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";
import Link from "next/link";
import {
  IconShieldCheck,
  IconCoins,
  IconBolt,
  IconTable,
  IconReceipt,
  IconCpu,
  IconWallet,
} from "@tabler/icons-react";

export default function Home() {
  const corePrograms = [
    {
      id: "token",
      name: "Token Program",
      description: "SPL Token - Create and manage fungible tokens",
      icon: <IconCoins size={24} />,
      href: "/core/token",
    },
    {
      id: "token-2022",
      name: "Token-2022",
      description: "Token Extensions - Advanced token features",
      icon: <IconShieldCheck size={24} />,
      href: "/core/token-2022",
    },
    {
      id: "associated-token",
      name: "Associated Token Account",
      description: "ATA - Deterministic token account addresses",
      icon: <IconWallet size={24} />,
      href: "/core/associated-token",
    },
    {
      id: "system",
      name: "System Program",
      description: "SOL transfers and account creation",
      icon: <IconBolt size={24} />,
      href: "/core/system",
    },
    {
      id: "memo",
      name: "Memo Program",
      description: "On-chain notes and messages",
      icon: <IconReceipt size={24} />,
      href: "/core/memo",
    },
    {
      id: "compute-budget",
      name: "Compute Budget",
      description: "Set compute units and priority fees",
      icon: <IconCpu size={24} />,
      href: "/core/compute-budget",
    },
    {
      id: "address-lookup",
      name: "Address Lookup Tables",
      description: "Optimize transaction size with lookup tables",
      icon: <IconTable size={24} />,
      href: "/core/address-lookup",
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
              background:
                "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Core Solana Programs
          </Title>
          <Text c="dimmed" size="lg">
            Interact with essential Solana blockchain programs
          </Text>
        </div>

        <div>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
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
                      <Title order={3} mb="xs" size="h4">
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
