"use client";

import { AppShell, Stack, NavLink, Title } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconHome,
  IconTransfer,
  IconHeart,
  IconHandGrab,
  IconDashboard,
  IconShieldCheck,
  IconPlus,
} from "@tabler/icons-react";
import { WalletBalance } from "./WalletBalance";

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <IconDashboard size={18} /> },
    { href: "/favorites", label: "Favorites", icon: <IconHeart size={18} /> },
    {
      href: "/transfer-sol",
      label: "Transfer SOL",
      icon: <IconTransfer size={18} />,
    },
    {
      href: "/cpi",
      label: "Cross-Program Invocation",
      icon: <IconHandGrab size={18} />,
    },
    {
      href: "/checking-accounts",
      label: "Checking Accounts",
      icon: <IconShieldCheck size={18} />,
    },
    {
      href: "/create-account",
      label: "Create Account",
      icon: <IconPlus size={18} />,
    },
  ];

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
      padding="md"
      style={{
        background: "rgb(3, 7, 18)",
      }}
    >
      <AppShell.Navbar
        p="md"
        style={{
          background: "rgba(24, 24, 37, 0.9)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(88, 91, 112, 0.2)",
        }}
      >
        <AppShell.Section mb="md">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Title
              order={3}
              mb="md"
              style={{
                background:
                  "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                cursor: "pointer",
              }}
            >
              Solana Programs
            </Title>
          </Link>
          <WalletBalance />
        </AppShell.Section>

        <AppShell.Section grow>
          <Stack gap="xs">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <NavLink
                  label={item.label}
                  leftSection={item.icon}
                  active={pathname === item.href}
                  variant="subtle"
                  style={{
                    borderRadius: "0.5rem",
                  }}
                />
              </Link>
            ))}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
