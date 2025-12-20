"use client";

import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  getAccount,
} from "@solana/spl-token";
import {
  Button,
  Select,
  Card,
  Stack,
  Title,
  Text,
  NumberInput,
  Group,
} from "@mantine/core";
import { IconArrowsExchange } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useTokenSwapProgram } from "@/lib/useTokenSwapProgram";
import {
  getAmmPda,
  getPoolPda,
  getPoolAuthorityPda,
  calculateSwapOutput,
} from "@/lib/token-swap-utils";
import { BN } from "@coral-xyz/anchor";

interface TokenSwapFormProps {
  ammId: PublicKey;
  poolAddress: PublicKey;
  mintA: PublicKey;
  mintB: PublicKey;
}

export function TokenSwapForm({
  ammId,
  poolAddress,
  mintA,
  mintB,
}: TokenSwapFormProps) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const program = useTokenSwapProgram();
  const [swapA, setSwapA] = useState(true);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(1); // 1% slippage tolerance
  const [swapping, setSwapping] = useState(false);
  const [poolReserveA, setPoolReserveA] = useState<number>(0);
  const [poolReserveB, setPoolReserveB] = useState<number>(0);
  const [ammFee, setAmmFee] = useState<number>(30);

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!program) return;

      try {
        const [ammPda] = getAmmPda(program.programId, ammId);
        const [poolAuthority] = getPoolAuthorityPda(
          program.programId,
          ammPda,
          mintA,
          mintB
        );

        const poolAccountA = getAssociatedTokenAddressSync(
          mintA,
          poolAuthority,
          true
        );
        const poolAccountB = getAssociatedTokenAddressSync(
          mintB,
          poolAuthority,
          true
        );

        const [accountAInfo, accountBInfo] = await Promise.all([
          getAccount(connection, poolAccountA),
          getAccount(connection, poolAccountB),
        ]);

        // Fetch AMM account data
        const ammAccountInfo = await connection.getAccountInfo(ammPda);
        let feeValue = 30; // default fee
        if (ammAccountInfo) {
          // Parse the AMM account (skip 8 byte discriminator, then 32+32 bytes for pubkeys, then 2 bytes for fee)
          const feeBuffer = ammAccountInfo.data.slice(72, 74);
          feeValue = feeBuffer.readUInt16LE(0);
        }

        setPoolReserveA(Number(accountAInfo.amount));
        setPoolReserveB(Number(accountBInfo.amount));
        setAmmFee(feeValue);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      }
    };

    fetchPoolData();
  }, [program, ammId, mintA, mintB, connection]);

  useEffect(() => {
    if (inputAmount > 0 && poolReserveA > 0 && poolReserveB > 0) {
      const output = swapA
        ? calculateSwapOutput(inputAmount, poolReserveA, poolReserveB, ammFee)
        : calculateSwapOutput(inputAmount, poolReserveB, poolReserveA, ammFee);
      setOutputAmount(output);
    } else {
      setOutputAmount(0);
    }
  }, [inputAmount, swapA, poolReserveA, poolReserveB, ammFee]);

  const handleSwap = async () => {
    if (!wallet.publicKey || !program) {
      notifications.show({
        title: "Error",
        message: "Please connect your wallet",
        color: "red",
      });
      return;
    }

    if (inputAmount <= 0) {
      notifications.show({
        title: "Error",
        message: "Please enter a valid amount",
        color: "red",
      });
      return;
    }

    setSwapping(true);
    try {
      const [ammPda] = getAmmPda(program.programId, ammId);
      const [poolAuthority] = getPoolAuthorityPda(
        program.programId,
        ammPda,
        mintA,
        mintB
      );

      const poolAccountA = getAssociatedTokenAddressSync(
        mintA,
        poolAuthority,
        true
      );
      const poolAccountB = getAssociatedTokenAddressSync(
        mintB,
        poolAuthority,
        true
      );

      const traderAccountA = getAssociatedTokenAddressSync(
        mintA,
        wallet.publicKey
      );
      const traderAccountB = getAssociatedTokenAddressSync(
        mintB,
        wallet.publicKey
      );

      const minOutputAmount = Math.floor(outputAmount * (1 - slippage / 100));

      const tx = await (program as any).methods
        .swapExactTokensForTokens(
          swapA,
          new BN(inputAmount),
          new BN(minOutputAmount)
        )
        .accounts({
          amm: ammPda,
          pool: poolAddress,
          poolAuthority,
          trader: wallet.publicKey,
          mintA,
          mintB,
          poolAccountA,
          poolAccountB,
          traderAccountA,
          traderAccountB,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      notifications.show({
        title: "Success",
        message: `Swap successful! TX: ${tx}`,
        color: "green",
      });

      setInputAmount(0);
    } catch (error: any) {
      console.error("Error swapping:", error);
      notifications.show({
        title: "Error",
        message: `Swap failed: ${error.message || error}`,
        color: "red",
      });
    } finally {
      setSwapping(false);
    }
  };

  const handleFlip = () => {
    setSwapA(!swapA);
    setInputAmount(0);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Swap Tokens</Title>

        <Group grow>
          <Select
            label="From"
            value={swapA ? "A" : "B"}
            onChange={(val) => setSwapA(val === "A")}
            data={[
              {
                value: "A",
                label: `Token A (${poolReserveA.toLocaleString()})`,
              },
              {
                value: "B",
                label: `Token B (${poolReserveB.toLocaleString()})`,
              },
            ]}
          />

          <Button
            onClick={handleFlip}
            variant="subtle"
            style={{ alignSelf: "flex-end" }}
          >
            <IconArrowsExchange size={20} />
          </Button>

          <Select
            label="To"
            value={!swapA ? "A" : "B"}
            onChange={(val) => setSwapA(val !== "A")}
            data={[
              {
                value: "A",
                label: `Token A (${poolReserveA.toLocaleString()})`,
              },
              {
                value: "B",
                label: `Token B (${poolReserveB.toLocaleString()})`,
              },
            ]}
          />
        </Group>

        <NumberInput
          label="Input Amount"
          value={inputAmount}
          onChange={(val) => setInputAmount(Number(val))}
          min={0}
        />

        <Text>
          Output: <strong>{outputAmount.toLocaleString()}</strong>
        </Text>

        <NumberInput
          label="Slippage Tolerance (%)"
          value={slippage}
          onChange={(val) => setSlippage(Number(val))}
          min={0.1}
          max={50}
          step={0.1}
        />

        <Button
          onClick={handleSwap}
          fullWidth
          disabled={
            !wallet.publicKey || !program || swapping || inputAmount <= 0
          }
          loading={swapping}
        >
          Swap
        </Button>
      </Stack>
    </Card>
  );
}
