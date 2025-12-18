"use client";

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProgram } from "./hooks/useProgram";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";

const CLI_WALLET = "6rBxApAMAdrTQMvQsi6w6sWDjaDDwf2Bu35gRzebNP4b";

export function TransferToCliButton() {
  const { publicKey, connection } = useProgram();
  const wallet = useWallet();
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async () => {
    if (!publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsTransferring(true);
    try {
      const amount = 1.5 * LAMPORTS_PER_SOL; // Transfer 1.5 SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(CLI_WALLET),
          lamports: amount,
        })
      );

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      const signed = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature, "confirmed");

      toast.success("Transfer successful!", {
        description: `1.5 SOL sent to CLI wallet for deployment`,
      });
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  if (!publicKey) {
    return null;
  }

  return (
    <Button
      onClick={handleTransfer}
      disabled={isTransferring}
      variant="outline"
      size="sm"
      className="text-xs border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/10"
    >
      {isTransferring ? (
        <>
          <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
          Sending...
        </>
      ) : (
        <>
          <span className="mr-1">📤</span>
          Fund CLI (1.5 SOL)
        </>
      )}
    </Button>
  );
}
