"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Stack, Text, Loader } from "@mantine/core";
import { useProgram } from "./hooks/useProgram";

/**
 * CounterDisplay component that displays the current counter value
 * and handles its own data fetching logic.
 */
export function CounterDisplay() {
  // Get program information from the hook
  const { program, counterAddress, connection } = useProgram();

  // Local state
  const [counterValue, setCounterValue] = useState<number | null>(null);
  const [isFetchingCounter, setIsFetchingCounter] = useState(true);

  // Fetch counter account to get the count value
  const fetchCounterValue = useCallback(async () => {
    if (!connection || !program) return;

    try {
      setIsFetchingCounter(true);
      const counterAccount = await program.account.counter.fetch(
        counterAddress
      );
      setCounterValue(Number(counterAccount.count));
    } catch (err) {
      console.error("Error fetching counter value:", err);
      setCounterValue(null);
    } finally {
      setIsFetchingCounter(false);
    }
  }, [connection, counterAddress, program]);

  // Initial fetch and on connection change
  useEffect(() => {
    if (connection) {
      fetchCounterValue();
    }
  }, [connection, fetchCounterValue]);

  // Set up WebSocket subscription to listen for account changes
  useEffect(() => {
    if (!connection) return;

    try {
      // Subscribe to account changes
      const subscriptionId = connection.onAccountChange(
        counterAddress,
        (accountInfo) => {
          const decoded = program.coder.accounts.decode(
            "counter",
            accountInfo.data
          );
          console.log("Decoded counter value:", decoded);
          setCounterValue(Number(decoded.count));
        },
        {
          commitment: "confirmed",
          encoding: "base64",
        }
      );

      // Clean up subscription when component unmounts
      return () => {
        console.log("Unsubscribing from counter account");
        connection.removeAccountChangeListener(subscriptionId);
      };
    } catch (err) {
      console.error("Error setting up account subscription:", err);
      return () => {};
    }
  }, [connection, counterAddress, program]);

  return (
    <Stack align="center" w="100%" gap="xs">
      <Text size="sm" c="dimmed">
        Current Count:
      </Text>
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFetchingCounter ? (
          <Loader size="lg" color="purple" />
        ) : (
          <Text
            size="2.25rem"
            fw={700}
            style={{
              background:
                "linear-gradient(to right, rgb(168 85 247), rgb(96 165 250))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {counterValue}
          </Text>
        )}
      </div>
    </Stack>
  );
}
