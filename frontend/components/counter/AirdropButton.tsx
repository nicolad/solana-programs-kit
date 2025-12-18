"use client";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    } catch (error: any) {
      console.error("Airdrop error:", error);

      if (
        error.message?.includes("airdrop") ||
        error.message?.includes("429") ||
        error.message?.includes("limit")
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
          description: error.message || "Please try again later",
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
      className="text-xs border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-50"
    >
      {isAirdropping ? (
        <>
          <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-2"></div>
          Requesting...
        </>
      ) : cooldown > 0 ? (
        <>
          <span className="mr-1">⏳</span>
          Wait {cooldown}s
        </>
      ) : (
        <>
          <span className="mr-1">💧</span>
          Airdrop 1 SOL
        </>
      )}
    </Button>
  );
}
