"use client";

import React, { useState } from "react";
import { useProgram } from "./hooks/useProgram";
import { toast } from "sonner";

export function WalletAddress() {
  const { publicKey, connected } = useProgram();
  const [copied, setCopied] = useState(false);

  if (!connected || !publicKey) {
    return null;
  }

  const address = publicKey.toBase58();
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied!", {
        description: "Paste this in your terminal to receive SOL",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-xs text-gray-400 text-center">Your Wallet</span>
      <button
        onClick={copyAddress}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-all text-xs font-mono group"
      >
        <span className="text-gray-300">{shortAddress}</span>
        <span className="text-gray-500 group-hover:text-purple-400 transition-colors">
          {copied ? "✓" : "📋"}
        </span>
      </button>
      <div className="text-xs text-center text-gray-500 mt-1">
        CLI:{" "}
        <code className="text-purple-400">
          solana transfer {shortAddress} 0.5
        </code>
      </div>
    </div>
  );
}
