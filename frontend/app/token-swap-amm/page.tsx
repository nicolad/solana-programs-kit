"use client";

import { Container, Title, Text, Stack, Tabs, TextInput, Button } from "@mantine/core";
import { IconPlus, IconArrowsExchange, IconPool, IconDroplet, IconMinus } from "@tabler/icons-react";
import { WalletRequired } from "@/components/WalletRequired";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateAMMForm } from "@/components/amm/CreateAMMForm";
import { CreatePoolForm } from "@/components/amm/CreatePoolForm";
import { TokenSwapForm } from "@/components/amm/TokenSwapForm";
import { DepositLiquidityForm } from "@/components/amm/DepositLiquidityForm";
import { WithdrawLiquidityForm } from "@/components/amm/WithdrawLiquidityForm";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";

export default function TokenSwapAMMPage() {
  const wallet = useWallet();
  const [ammId, setAmmId] = useState<PublicKey | null>(null);
  const [poolAddress, setPoolAddress] = useState<PublicKey | null>(null);
  const [mintA, setMintA] = useState<PublicKey | null>(null);
  const [mintB, setMintB] = useState<PublicKey | null>(null);

  const [ammIdInput, setAmmIdInput] = useState("");
  const [poolAddressInput, setPoolAddressInput] = useState("");
  const [mintAInput, setMintAInput] = useState("");
  const [mintBInput, setMintBInput] = useState("");

  const handleSetPoolInfo = () => {
    try {
      if (ammIdInput) setAmmId(new PublicKey(ammIdInput));
      if (poolAddressInput) setPoolAddress(new PublicKey(poolAddressInput));
      if (mintAInput) setMintA(new PublicKey(mintAInput));
      if (mintBInput) setMintB(new PublicKey(mintBInput));
    } catStack gap="md" mb="lg">
          <Title order={4}>Pool Configuration</Title>
          <Text size="sm" c="dimmed">
            Enter your AMM and Pool details to interact with the protocol
          </Text>
          <TextInput
            label="AMM ID"
            placeholder="Enter AMM Public Key"
            value={ammIdInput}
            onChange={(e) => setAmmIdInput(e.currentTarget.value)}
          />
          <TextInput
            label="Pool Address"
            placeholder="Enter Pool Public Key"
            value={poolAddressInput}
            onChange={(e) => setPoolAddressInput(e.currentTarget.value)}
          />
          <TextInput
            label="Mint A"
            placeholder="Enter Token A Mint Address"
            value={mintAInput}
            onChange={(e) => setMintAInput(e.currentTarget.value)}
          />
          <TextInput
            label="Mint B"
            placeholder="Enter Token B Mint Address"
            value={mintBInput}
            onChange={(e) => setMintBInput(e.currentTarget.value)}
          />
          <Button onClick={handleSetPoolInfo}>
            Set Pool Configuration
          </Button>
        </Stack>

        <Tabs defaultValue="create-amm">
          <Tabs.List>
            <Tabs.Tab value="create-amm" leftSection={<IconPlus size={16} />}>
              Create AMM
            </Tabs.Tab>
            <Tabs.Tab value="create-pool" leftSection={<IconPool size={16} />}>
              Create Pool
            </Tabs.Tab>
            <Tabs.Tab value="deposit" leftSection={<IconDroplet size={16} />}>
              Deposit Liquidity
            </Tabs.Tab>
            <Tabs.Tab value="withdraw" leftSection={<IconMinus size={16} />}>
              Withdraw Liquidity
            </Tabs.Tab>
            <Tabs.Tab
              value="swap"
              leftSection={<IconArrowsExchange size={16} />}
            >
              Swap
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="create-amm" pt="xl">
            <CreateAMMForm />
          </Tabs.Panel>

          <Tabs.Panel value="create-pool" pt="xl">
            <Stack gap="md">
              {ammId ? (
                <CreatePoolConstant Product AMM (CPAMM)</Title>
          <Text size="sm">
            This implementation uses the constant product formula: <strong>x × y = k</strong>
          </Text>
          <Text size="sm">
            <strong>Features:</strong>
          </Text>
          <Text size="sm">
            • <strong>Create AMM</strong>: Initialize AMM with configurable LP fees (in basis points: 30 = 0.3%)
          </Text>
          <Text size="sm">
            • <strong>Create Pool</strong>: Create liquidity pools for token pairs (automatically sorted)
          </Text>
          <Text size="sm">
            • <strong>Deposit Liquidity</strong>: Add tokens to pool and receive LP tokens
          </Text>
          <Text size="sm">
            • <strong>Withdraw Liquidity</strong>: Burn LP tokens to withdraw your share
          </Text>
          <Text size="sm">
            • <strong>Swap Tokens</strong>: Trade tokens with slippage protection using CPAMM formula
          </Text>
          <Text size="xs" c="dimmed" mt="md">
            LP fees are distributed to liquidity providers automatically through the constant product mechanism.
              ) : (
                <Text c="red">
                  Please set all pool configuration values above
                </Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="withdraw" pt="xl">
            <Stack gap="md">
              {ammId && poolAddress && mintA && mintB ? (
                <WithdrawLiquidityForm
                  ammId={ammId}
                  poolAddress={poolAddress}
                  mintA={mintA}
                  mintB={mintB}
                />
              ) : (
                <Text c="red">
                  Please set all pool configuration values above
                </Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="swap" pt="xl">
            <Stack gap="md">
              {ammId && poolAddress && mintA && mintB ? (
                <TokenSwapForm
                  ammId={ammId}
                  poolAddress={poolAddress}
                  mintA={mintA}
                  mintB={mintB}
                />
              ) : (
                <Text c="red">
                  Please set all pool configuration values above
                </Text>
              )}
            </Stackist>

          <Tabs.Panel value="create-amm" pt="xl">
            <CreateAMMForm />
          </Tabs.Panel>

          <Tabs.Panel value="create-pool" pt="xl">
            <Stack gap="md">
              <Text c="dimmed" size="sm">
                Enter the AMM ID that was created in the previous step
              </Text>
              {ammId ? (
                <CreatePoolForm ammId={ammId} />
              ) : (
                <Text c="red">Please provide an AMM ID to create a pool</Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="swap" pt="xl">
            <Text c="dimmed">
              Swap interface coming soon. First create an AMM and pool.
            </Text>
          </Tabs.Panel>
        </Tabs>

        <Stack gap="sm">
          <Title order={4}>How it works</Title>
          <Text size="sm">
            1. <strong>Create AMM</strong>: Set up a new Automated Market Maker
            with configurable fees (in basis points, where 100 = 1%)
          </Text>
          <Text size="sm">
            2. <strong>Create Pool</strong>: Create a liquidity pool for a
            specific token pair
          </Text>
          <Text size="sm">
            3. <strong>Add Liquidity</strong>: Deposit tokens to earn trading
            fees
          </Text>
          <Text size="sm">
            4. <strong>Swap</strong>: Trade tokens using the constant product
            formula (x × y = k)
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
