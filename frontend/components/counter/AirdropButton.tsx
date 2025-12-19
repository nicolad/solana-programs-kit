"use client";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { useProgram } from "./hooks/useProgram";
import { toast } from "sonner";

export function AirdropButton() {
  const { publicKey, connection, connected } = useProgram();
  const [isAirdropping, setIsAirdropping] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleAirdrop = async () => {
    if (!publicKey || !connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (cooldown > 0) {
      toast.error("Please wait", {
        description: `Cooldown: ${cooldown}s remaining`,
      });
      return;
    }

    setIsAirdropping(true);
    try {
      const signature = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      toast.success("Airdrop successful!", {
        description: `1 SOL has been added to your wallet`,
      });

      // Set 30 second cooldown
      setCooldown(30);
    } catch (error: unknown) {
      console.error("Airdrop error:", error);

      if (
        error instanceof Error &&
        (error.message?.includes("airdrop") ||
          error.message?.includes("429") ||
          error.message?.includes("limit"))
      ) {
        toast.error("Airdrop Limit Reached", {
          description: "Daily limit exceeded. Use CLI: solana airdrop 1",
          duration: 10000,
          action: {
            label: "Web Faucet",
            onClick: () => window.open("https://faucet.solana.com", "_blank"),
          },
        });
        // Set longer cooldown on rate limit
        setCooldown(300); // 5 minutes
      } else {
        toast.error("Airdrop failed", {
          description:
            error instanceof Error ? error.message : "Please try again later",
        });
        setCooldown(60);
      }
    } finally {
      setIsAirdropping(false);
    }
  };

  if (!connected) {
    return null;
  }

  return (
    <Button
      onClick={handleAirdrop}
      disabled={isAirdropping || cooldown > 0}
      variant="outline"
      size="sm"
      styles={{
        root: {
          borderColor: "rgba(147, 51, 234, 0.3)",
          "&:hover": {
            borderColor: "rgba(147, 51, 234, 0.5)",
            background: "rgba(147, 51, 234, 0.1)",
          },
          "&:disabled": {
            opacity: 0.5,
          },
        },
      }}
    >
      {isAirdropping ? (
        <>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              border: "2px solid rgb(192, 132, 252)",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
              marginRight: "8px",
            }}
          ></div>
          Requesting...
        </>
      ) : cooldown > 0 ? (
        <>
          <span style={{ marginRight: "4px" }}>⏳</span>
          Wait {cooldown}s
        </>
      ) : (
        <>
          <span style={{ marginRight: "4px" }}>💧</span>
          Airdrop 1 SOL
        </>
      )}
    </Button>
  );
}
