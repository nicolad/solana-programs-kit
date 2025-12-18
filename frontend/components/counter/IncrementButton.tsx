"use client";

import React, { useState } from "react";
import { Button } from "@mantine/core";
import { toast } from "sonner";
import { useProgram } from "./hooks/useProgram";
import { useTransactionToast } from "./hooks/useTransactionToast";

/**
 * IncrementButton component that handles its own transaction logic
 * for incrementing the counter.
 */
export function IncrementButton() {
  // Get program and wallet information from the hook
  const { program, publicKey, connected } = useProgram();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);

  // Use transaction toast hook
  useTransactionToast({ transactionSignature });

  // Handle increment button click
  const handleIncrement = async () => {
    if (!publicKey) return;

    try {
      setIsLoading(true);

      // Send the transaction
      const txSignature = await program.methods
        .increment()
        .accounts({
          user: publicKey,
        })
        .rpc();

      setTransactionSignature(txSignature);
    } catch (err) {
      console.error("Error incrementing counter:", err);
      toast.error("Transaction Failed", {
        description: `${err}`,
        style: {
          border: "1px solid rgba(239, 68, 68, 0.3)",
          background:
            "linear-gradient(to right, rgba(40, 27, 27, 0.95), rgba(28, 23, 23, 0.95))",
        },
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleIncrement}
      disabled={isLoading || !connected}
      w="85%"
      h={44}
      style={{
        background:
          "linear-gradient(135deg, rgb(203, 166, 247), rgb(148, 187, 233))",
      }}
      styles={{
        root: {
          "&:hover": {
            background:
              "linear-gradient(135deg, rgb(180, 190, 254), rgb(137, 220, 235))",
          },
        },
      }}
    >
      {isLoading ? (
        <>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              border: "2px solid rgba(216, 180, 254, 0.5)",
              borderTopColor: "rgb(216, 180, 254)",
              animation: "spin 1s linear infinite",
              marginRight: "8px",
            }}
          ></div>
          <span>Processing...</span>
        </>
      ) : (
        "Increment Counter"
      )}
    </Button>
  );
}
