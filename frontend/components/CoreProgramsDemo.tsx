"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Keypair } from "@solana/web3.js";
import { SolanaCoreClient } from "../lib/core-programs";

export default function CoreProgramsDemo() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const client = new SolanaCoreClient(connection);

  // System Program - Transfer SOL
  const handleTransferSol = async () => {
    if (!publicKey) {
      setStatus("Please connect wallet");
      return;
    }

    setLoading(true);
    try {
      const recipient = Keypair.generate().publicKey;
      const ix = await client.system.transferSol(publicKey, recipient, 0.001);

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = {
        recentBlockhash: blockhash,
        feePayer: publicKey,
        instructions: [ix],
      } as any;

      const signature = await sendTransaction(tx, connection);
      setStatus(`SOL transferred! Tx: ${signature}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get SOL Balance
  const handleCheckBalance = async () => {
    if (!publicKey) {
      setStatus("Please connect wallet");
      return;
    }

    setLoading(true);
    try {
      const balance = await client.system.getBalance(publicKey);
      setStatus(`Balance: ${balance} SOL`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Send with Memo
  const handleSendWithMemo = async () => {
    if (!publicKey) {
      setStatus("Please connect wallet");
      return;
    }

    setLoading(true);
    try {
      const recipient = Keypair.generate().publicKey;

      const transferIx = await client.system.transferSol(
        publicKey,
        recipient,
        0.001
      );
      const memoIx = client.memo.createMemo("Hello from Solana! 🚀", [
        publicKey,
      ]);

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = {
        recentBlockhash: blockhash,
        feePayer: publicKey,
        instructions: [transferIx, memoIx],
      } as any;

      const signature = await sendTransaction(tx, connection);
      setStatus(`Sent with memo! Tx: ${signature}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Priority Fee Example
  const handlePriorityFee = async () => {
    if (!publicKey) {
      setStatus("Please connect wallet");
      return;
    }

    setLoading(true);
    try {
      const recipient = Keypair.generate().publicKey;

      const computeLimitIx = client.computeBudget.setComputeUnitLimit(200_000);
      const computePriceIx = client.computeBudget.setComputeUnitPrice(1000);
      const transferIx = await client.system.transferSol(
        publicKey,
        recipient,
        0.001
      );

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = {
        recentBlockhash: blockhash,
        feePayer: publicKey,
        instructions: [computeLimitIx, computePriceIx, transferIx],
      } as any;

      const signature = await sendTransaction(tx, connection);
      setStatus(`Transaction with priority fee! Tx: ${signature}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Core Solana Programs</h1>
        <p className="opacity-90">
          Interact with system, token, memo, and compute budget programs
        </p>
      </div>

      {/* System Program */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">💰</span> System Program
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Transfer SOL and manage accounts
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCheckBalance}
            disabled={loading || !publicKey}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Check Balance
          </button>
          <button
            onClick={handleTransferSol}
            disabled={loading || !publicKey}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Transfer SOL
          </button>
        </div>
      </div>

      {/* Memo Program */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span> Memo Program
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Add on-chain notes to transactions
        </p>
        <button
          onClick={handleSendWithMemo}
          disabled={loading || !publicKey}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Send with Memo
        </button>
      </div>

      {/* Compute Budget */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Compute Budget
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Set compute units and priority fees
        </p>
        <button
          onClick={handlePriorityFee}
          disabled={loading || !publicKey}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Send with Priority Fee
        </button>
      </div>

      {/* Program IDs */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">📋 Program IDs</h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">System:</span>
            <span className="text-xs">11111111111111111111111111111111</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Token:</span>
            <span className="text-xs">
              TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Token-2022:
            </span>
            <span className="text-xs">
              TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Memo:</span>
            <span className="text-xs">
              MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Compute Budget:
            </span>
            <span className="text-xs">
              ComputeBudget111111111111111111111111111111
            </span>
          </div>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div
          className={`p-4 rounded-lg ${
            status.includes("Error")
              ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          }`}
        >
          <p className="text-sm font-mono break-all">{status}</p>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
}
