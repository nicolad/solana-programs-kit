"use client";

import { useState } from "react";
import {
  Stack,
  TextInput,
  NumberInput,
  Button,
  Text,
  Alert,
  Switch,
  Group,
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
import { IconCheck, IconX, IconArrowsExchange } from "@tabler/icons-react";

export function SwapForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [ammId, setAmmId] = useState("");
  const [mintA, setMintA] = useState("");
  const [mintB, setMintB] = useState("");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [minOutputAmount, setMinOutputAmount] = useState<number>(0);
  const [swapA, setSwapA] = useState(true); // true = swap A for B, false = swap B for A

  const handleSwap = async () => {
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

      const traderAccountA = getAssociatedTokenAddressSync(
        mintAPubkey,
        wallet.publicKey
      );

      const traderAccountB = getAssociatedTokenAddressSync(
        mintBPubkey,
        wallet.publicKey
      );

      const tx = await program.methods
        .swapExactTokensForTokens(
          swapA,
          new BN(inputAmount),
          new BN(minOutputAmount)
        )
        .accounts({
          amm: ammPda,
          pool: poolPda,
          poolAuthority,
          traderAccountA,
          traderAccountB,
          poolAccountA,
          poolAccountB,
          trader: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      setResult({
        type: "success",
        message: `Swap successful! Tx: ${tx.slice(0, 8)}...`,
      });
    } catch (error: unknown) {
      console.error("Swap error:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to swap tokens",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Swap tokens using the constant product formula (xy = k).
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

      <Group justify="space-between">
        <Text size="sm" fw={500}>
          Swap Direction
        </Text>
        <Switch
          checked={swapA}
          onChange={(e) => setSwapA(e.currentTarget.checked)}
          label={swapA ? "A → B" : "B → A"}
          onLabel={<IconArrowsExchange size={12} />}
          offLabel={<IconArrowsExchange size={12} />}
        />
      </Group>

      <NumberInput
        label="Input Amount"
        description={`Amount of ${swapA ? "Token A" : "Token B"} to swap`}
        placeholder="Enter amount..."
        value={inputAmount}
        onChange={(value) => setInputAmount(Number(value))}
        min={0}
        required
      />

      <NumberInput
        label="Minimum Output Amount"
        description="Minimum amount to receive (slippage protection)"
        placeholder="Enter minimum amount..."
        value={minOutputAmount}
        onChange={(value) => setMinOutputAmount(Number(value))}
        min={0}
        required
      />

      <Button onClick={handleSwap} loading={loading} fullWidth>
        Swap Tokens
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
  );
}
