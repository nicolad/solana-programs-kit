import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Geist, Geist_Mono } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import type { Metadata } from "next";
import { SolanaProvider } from "@/components/counter/provider/Solana";
import { Toaster } from "sonner";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Counter App",
  description: "A minimal frontend for Anchor counter program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-mantine-color-scheme="dark"
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          background: "rgb(3, 7, 18)",
          color: "white",
        }}
      >
        <MantineProvider defaultColorScheme="dark">
          <Notifications position="bottom-right" />
          <SolanaProvider>
            <Navigation>{children}</Navigation>
            <Toaster
              position="bottom-right"
              theme="dark"
              closeButton
              richColors={false}
              toastOptions={{
                style: {
                  background: "#171717",
                  color: "white",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                },
                className: "toast-container",
              }}
            />
          </SolanaProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
