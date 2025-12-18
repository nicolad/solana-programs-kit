"use client";

import { Container, Stack, Title, Text, Card, SimpleGrid } from "@mantine/core";
import Link from "next/link";
import {
  IconHome,
  IconTransfer,
  IconHeart,
  IconHandGrab,
  IconShieldCheck,
  IconPlus,
} from "@tabler/icons-react";

export default function Home() {
  const programs = [
    {
      id: "favorites",
      name: "Favorites",
      description: "Store your favorite things",
      icon: <IconHeart size={24} />,
      href: "/favorites",
    },
    {
      id: "transfer-sol",
      name: "Transfer SOL",
      description: "Send SOL between accounts",
      icon: <IconTransfer size={24} />,
      href: "/transfer-sol",
    },
    {
      id: "cpi",
      name: "Cross-Program Invocation",
      description: "Pull lever via CPI",
      icon: <IconHandGrab size={24} />,
      href: "/cpi",
    },
    {
      id: "checking-accounts",
      name: "Checking Accounts",
      description: "Validate account constraints",
      icon: <IconShieldCheck size={24} />,
      href: "/checking-accounts",
    },
    {
      id: "create-account",
      name: "Create Account",
      description: "Create system-owned accounts",
      icon: <IconPlus size={24} />,
      href: "/create-account",
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
            Solana Programs
          </Title>
          <Text c="dimmed" size="lg">
            Select a program to interact with
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {programs.map((program) => (
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
      </Stack>
    </Container>
  );
}
