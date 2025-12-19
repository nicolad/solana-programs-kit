"use client";

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";
import { Button } from "@mantine/core";
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
    } catch (error: unknown) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed", {
        description:
          error instanceof Error ? error.message : "Please try again",
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
      styles={{
        root: {
          borderColor: "rgba(59, 130, 246, 0.3)",
          "&:hover": {
            borderColor: "rgba(59, 130, 246, 0.5)",
            background: "rgba(59, 130, 246, 0.1)",
          },
        },
      }}
    >
      {isTransferring ? (
        <>
          <div
            style={{
              width: "12px",
              height: "12px",
              border: "2px solid rgb(96 165 250)",
              borderTopColor: "transparent",
              borderRadius: "9999px",
              animation: "spin 1s linear infinite",
              marginRight: "8px",
            }}
          ></div>
          Sending...
        </>
      ) : (
        <>
          <span style={{ marginRight: "4px" }}>📤</span>
          Fund CLI (1.5 SOL)
        </>
      )}
    </Button>
  );
}
