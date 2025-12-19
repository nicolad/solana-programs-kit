"use client";

import { useState } from "react";
import {
  Stack,
  TextInput,
  NumberInput,
  Button,
  Text,
  Alert,
  Tabs,
} from "@mantine/core";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { idl } from "@/anchor-idl/token-swap-idl";
import type { TokenSwap } from "@/anchor-idl/token-swap-types";
import { IconCheck, IconX } from "@tabler/icons-react";

export function LiquidityForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("deposit");

  // Common fields
  const [ammId, setAmmId] = useState("");
  const [mintA, setMintA] = useState("");
  const [mintB, setMintB] = useState("");

  // Deposit fields
  const [amountA, setAmountA] = useState<number>(0);
  const [amountB, setAmountB] = useState<number>(0);
  const [minLiquidity, setMinLiquidity] = useState<number>(0);

  // Withdraw fields
  const [liquidityAmount, setLiquidityAmount] = useState<number>(0);
  const [minAmountA, setMinAmountA] = useState<number>(0);
  const [minAmountB, setMinAmountB] = useState<number>(0);

  const handleDeposit = async () => {
    if (!wallet.publicKey) return;

    setLoading(true);
    setResult(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const program = new Program(idl as any, provider) as Program<TokenSwap>;

      const ammIdPubkey = new PublicKey(ammId);
      const mintAPubkey = new PublicKey(mintA);
      const mintBPubkey = new PublicKey(mintB);

      const [ammPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("amm"), ammIdPubkey.toBuffer()],
        program.programId
      );

      const [poolPda] = PublicKey.findProgramAddressSync(
        [ammPda.toBuffer(), mintAPubkey.toBuffer(), mintBPubkey.toBuffer()],
        program.programId
      );

      const [poolAuthority] = PublicKey.findProgramAddressSync(
        [
          ammPda.toBuffer(),
          mintAPubkey.toBuffer(),
          mintBPubkey.toBuffer(),
          Buffer.from("authority"),
        ],
        program.programId
      );

      const poolAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        poolAuthority,
        true
      );

      const poolAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        poolAuthority,
        true
      );

      const depositorAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        wallet.publicKey
      );

      const depositorAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        wallet.publicKey
      );

      // Note: You'll need to get the mintLiquidity from the pool account
      // This is a simplified version - in production, fetch this from pool state
      const mintLiquidity = new PublicKey("REPLACE_WITH_ACTUAL_MINT");

      const depositorAccountLiquidity = getAssociatedTokenAddressSync(
        mintLiquidity,
        wallet.publicKey
      );

      const tx = await program.methods
        .depositLiquidity(
          new BN(amountA),
          new BN(amountB),
          new BN(minLiquidity)
        )
        .accounts({
          pool: poolPda,
          poolAuthority,
          depositor: wallet.publicKey,
          mintLiquidity,
          mintA: mintAPubkey,
          mintB: mintBPubkey,
          poolAccountA,
          poolAccountB,
          depositorAccountLiquidity,
          depositorAccountA,
          depositorAccountB,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      setResult({
        type: "success",
        message: `Liquidity deposited! Tx: ${tx.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Deposit error:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to deposit liquidity",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!wallet.publicKey) return;

    setLoading(true);
    setResult(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const program = new Program(idl as any, provider) as Program<TokenSwap>;

      const ammIdPubkey = new PublicKey(ammId);
      const mintAPubkey = new PublicKey(mintA);
      const mintBPubkey = new PublicKey(mintB);

      const [ammPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("amm"), ammIdPubkey.toBuffer()],
        program.programId
      );

      const [poolPda] = PublicKey.findProgramAddressSync(
        [ammPda.toBuffer(), mintAPubkey.toBuffer(), mintBPubkey.toBuffer()],
        program.programId
      );

      const [poolAuthority] = PublicKey.findProgramAddressSync(
        [
          ammPda.toBuffer(),
          mintAPubkey.toBuffer(),
          mintBPubkey.toBuffer(),
          Buffer.from("authority"),
        ],
        program.programId
      );

      const poolAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        poolAuthority,
        true
      );

      const poolAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        poolAuthority,
        true
      );

      const depositorAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        wallet.publicKey
      );

      const depositorAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        wallet.publicKey
      );

      // Note: Replace with actual liquidity mint from pool state
      const mintLiquidity = new PublicKey("REPLACE_WITH_ACTUAL_MINT");

      const depositorAccountLiquidity = getAssociatedTokenAddressSync(
        mintLiquidity,
        wallet.publicKey
      );

      const tx = await program.methods
        .withdrawLiquidity(
          new BN(liquidityAmount),
          new BN(minAmountA),
          new BN(minAmountB)
        )
        .accounts({
          pool: poolPda,
          poolAuthority,
          depositor: wallet.publicKey,
          mintLiquidity,
          mintA: mintAPubkey,
          mintB: mintBPubkey,
          poolAccountA,
          poolAccountB,
          depositorAccountLiquidity,
          depositorAccountA,
          depositorAccountB,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      setResult({
        type: "success",
        message: `Liquidity withdrawn! Tx: ${tx.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Withdraw error:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to withdraw liquidity",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="deposit">Deposit</Tabs.Tab>
        <Tabs.Tab value="withdraw">Withdraw</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="deposit" pt="md">
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Deposit tokens to the pool and receive liquidity tokens.
          </Text>

          <TextInput
            label="AMM ID"
            placeholder="Enter AMM ID..."
            value={ammId}
            onChange={(e) => setAmmId(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Token A Mint"
            placeholder="Enter token A mint address..."
            value={mintA}
            onChange={(e) => setMintA(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Token B Mint"
            placeholder="Enter token B mint address..."
            value={mintB}
            onChange={(e) => setMintB(e.currentTarget.value)}
            required
          />

          <NumberInput
            label="Amount A"
            placeholder="Enter amount of token A..."
            value={amountA}
            onChange={(value) => setAmountA(Number(value))}
            min={0}
            required
          />

          <NumberInput
            label="Amount B"
            placeholder="Enter amount of token B..."
            value={amountB}
            onChange={(value) => setAmountB(Number(value))}
            min={0}
            required
          />

          <NumberInput
            label="Min Liquidity"
            description="Minimum LP tokens to receive"
            placeholder="Enter minimum liquidity..."
            value={minLiquidity}
            onChange={(value) => setMinLiquidity(Number(value))}
            min={0}
            required
          />

          <Button onClick={handleDeposit} loading={loading} fullWidth>
            Deposit Liquidity
          </Button>

          {result && (
            <Alert
              icon={
                result.type === "success" ? (
                  <IconCheck size={16} />
                ) : (
                  <IconX size={16} />
                )
              }
              title={result.type === "success" ? "Success" : "Error"}
              color={result.type === "success" ? "green" : "red"}
            >
              {result.message}
            </Alert>
          )}
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="withdraw" pt="md">
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Withdraw your liquidity by burning LP tokens.
          </Text>

          <TextInput
            label="AMM ID"
            placeholder="Enter AMM ID..."
            value={ammId}
            onChange={(e) => setAmmId(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Token A Mint"
            placeholder="Enter token A mint address..."
            value={mintA}
            onChange={(e) => setMintA(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Token B Mint"
            placeholder="Enter token B mint address..."
            value={mintB}
            onChange={(e) => setMintB(e.currentTarget.value)}
            required
          />

          <NumberInput
            label="Liquidity Amount"
            description="Amount of LP tokens to burn"
            placeholder="Enter LP token amount..."
            value={liquidityAmount}
            onChange={(value) => setLiquidityAmount(Number(value))}
            min={0}
            required
          />

          <NumberInput
            label="Min Amount A"
            description="Minimum token A to receive"
            placeholder="Enter minimum amount A..."
            value={minAmountA}
            onChange={(value) => setMinAmountA(Number(value))}
            min={0}
            required
          />

          <NumberInput
            label="Min Amount B"
            description="Minimum token B to receive"
            placeholder="Enter minimum amount B..."
            value={minAmountB}
            onChange={(value) => setMinAmountB(Number(value))}
            min={0}
            required
          />

          <Button onClick={handleWithdraw} loading={loading} fullWidth>
            Withdraw Liquidity
          </Button>

          {result && (
            <Alert
              icon={
                result.type === "success" ? (
                  <IconCheck size={16} />
                ) : (
                  <IconX size={16} />
                )
              }
              title={result.type === "success" ? "Success" : "Error"}
              color={result.type === "success" ? "green" : "red"}
            >
              {result.message}
            </Alert>
          )}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
}
