"use client";

import { Tooltip } from "@mantine/core";
import React from "react";
import dynamic from "next/dynamic";

// Nextjs hydration error fix
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
    loading: () => {
      return (
        <div
          style={{
            width: "173.47px",
            height: "48px",
            padding: "0 12px",
            gap: "8px",
            background: "rgb(0, 0, 0)",
            border: "1px solid rgba(31, 41, 55, 1)",
            borderRadius: "6px",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "9999px",
              background: "rgba(192, 132, 252, 0.3)",
            }}
          ></div>
          <div
            style={{
              width: "100px",
              height: "16px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
            }}
          ></div>
        </div>
      );
    },
  }
);

export function WalletButton() {
  return (
    <Tooltip label="Devnet Only">
      <div style={{ display: "inline-block" }}>
        <WalletMultiButton />
      </div>
    </Tooltip>
  );
}
