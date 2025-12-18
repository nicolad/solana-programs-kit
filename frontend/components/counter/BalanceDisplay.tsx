"use client";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { useProgram } from "./hooks/useProgram";
import { AirdropButton } from "./AirdropButton";
import { TransferToCliButton } from "./TransferToCliButton";

export function BalanceDisplay() {
  const { publicKey, connection } = useProgram();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      try {
        const lamports = await connection.getBalance(publicKey);
        const solBalance = lamports / LAMPORTS_PER_SOL;
        setBalance(solBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();

    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);

    return () => clearInterval(interval);
  }, [publicKey, connection]);

  if (!publicKey) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Balance:</span>
        </div>
        {isLoading ? (
          <div className="h-5 w-20 bg-gray-700/50 rounded animate-pulse"></div>
        ) : (
          <span className="text-sm font-semibold text-purple-400">
            {balance !== null ? `${balance.toFixed(4)} SOL` : "—"}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <AirdropButton />
        <TransferToCliButton />
      </div>
    </div>
  );
}
