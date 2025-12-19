"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Button,
  TextInput,
  NumberInput,
  Code,
  Tabs,
  Table,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { WalletRequired } from "./WalletRequired";
import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getMint,
  getAccount,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
} from "@solana/spl-token";

export default function TokenProgramDemo() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [loading, setLoading] = useState(false);
  const [mintAddress, setMintAddress] = useState("");
  const [decimals, setDecimals] = useState(9);
  const [mintAmount, setMintAmount] = useState(1000);
  const [transferAmount, setTransferAmount] = useState(100);
  const [transferRecipient, setTransferRecipient] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [mintInfo, setMintInfo] = useState<any>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);

  // Create a new token mint
  const handleCreateMint = async () => {
    if (!publicKey) {
      notifications.show({
        title: "Wallet not connected",
        message: "Please connect your wallet first",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      // Generate new mint keypair
      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      // Create transaction
      const transaction = new Transaction().add(
        // Create account for mint
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        // Initialize mint
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          decimals,
          publicKey, // mint authority
          publicKey, // freeze authority
          TOKEN_PROGRAM_ID
        )
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection, {
        signers: [mintKeypair],
      });

      await connection.confirmTransaction(signature, "confirmed");

      setMintAddress(mintKeypair.publicKey.toString());

      notifications.show({
        title: "Success!",
        message: `Token mint created: ${mintKeypair.publicKey.toString()}`,
        color: "green",
      });
    } catch (error: any) {
      console.error("Error creating mint:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create mint",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create associated token account
  const handleCreateTokenAccount = async () => {
    if (!publicKey || !mintAddress) {
      notifications.show({
        title: "Missing information",
        message: "Please connect wallet and enter mint address",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const associatedToken = await getAssociatedTokenAddress(
        mint,
        publicKey,
        false,
        TOKEN_PROGRAM_ID
      );

      // Check if account already exists
      const accountInfo = await connection.getAccountInfo(associatedToken);
      if (accountInfo) {
        setTokenAccount(associatedToken.toString());
        notifications.show({
          title: "Account exists",
          message: "Token account already exists",
          color: "blue",
        });
        setLoading(false);
        return;
      }

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          publicKey,
          associatedToken,
          publicKey,
          mint,
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setTokenAccount(associatedToken.toString());

      notifications.show({
        title: "Success!",
        message: `Token account created: ${associatedToken.toString()}`,
        color: "green",
      });
    } catch (error: any) {
      console.error("Error creating token account:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create token account",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mint tokens
  const handleMintTokens = async () => {
    if (!publicKey || !mintAddress || !tokenAccount) {
      notifications.show({
        title: "Missing information",
        message: "Please create mint and token account first",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const destination = new PublicKey(tokenAccount);

      const transaction = new Transaction().add(
        createMintToInstruction(
          mint,
          destination,
          publicKey, // mint authority
          mintAmount * Math.pow(10, decimals),
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      notifications.show({
        title: "Success!",
        message: `Minted ${mintAmount} tokens`,
        color: "green",
      });

      // Refresh account info
      await handleGetAccountInfo();
    } catch (error: any) {
      console.error("Error minting tokens:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to mint tokens",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Transfer tokens
  const handleTransferTokens = async () => {
    if (!publicKey || !mintAddress || !tokenAccount || !transferRecipient) {
      notifications.show({
        title: "Missing information",
        message: "Please fill in all fields",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const source = new PublicKey(tokenAccount);
      const recipient = new PublicKey(transferRecipient);

      // Get destination token account
      const destination = await getAssociatedTokenAddress(
        mint,
        recipient,
        false,
        TOKEN_PROGRAM_ID
      );

      const transaction = new Transaction();

      // Check if destination account exists, create if not
      const destAccountInfo = await connection.getAccountInfo(destination);
      if (!destAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            destination,
            recipient,
            mint,
            TOKEN_PROGRAM_ID
          )
        );
      }

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          source,
          destination,
          publicKey,
          transferAmount * Math.pow(10, decimals),
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      notifications.show({
        title: "Success!",
        message: `Transferred ${transferAmount} tokens`,
        color: "green",
      });

      // Refresh account info
      await handleGetAccountInfo();
    } catch (error: any) {
      console.error("Error transferring tokens:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to transfer tokens",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get mint info
  const handleGetMintInfo = async () => {
    if (!mintAddress) {
      notifications.show({
        title: "Missing mint address",
        message: "Please enter a mint address",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const mint = new PublicKey(mintAddress);
      const info = await getMint(
        connection,
        mint,
        "confirmed",
        TOKEN_PROGRAM_ID
      );
      setMintInfo(info);

      notifications.show({
        title: "Success!",
        message: "Mint info retrieved",
        color: "green",
      });
    } catch (error: any) {
      console.error("Error getting mint info:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to get mint info",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get token account info
  const handleGetAccountInfo = async () => {
    if (!tokenAccount) {
      notifications.show({
        title: "Missing account address",
        message: "Please enter a token account address",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const account = new PublicKey(tokenAccount);
      const info = await getAccount(
        connection,
        account,
        "confirmed",
        TOKEN_PROGRAM_ID
      );
      setAccountInfo(info);

      notifications.show({
        title: "Success!",
        message: "Account info retrieved",
        color: "green",
      });
    } catch (error: any) {
      console.error("Error getting account info:", error);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to get account info",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Token Program (SPL Token)
          </Title>
          <Text c="dimmed" size="lg">
            Create, mint, and transfer SPL tokens
          </Text>
        </div>

        <WalletRequired message="Please connect your wallet to interact with the Token Program" />

        <Tabs defaultValue="create">
          <Tabs.List>
            <Tabs.Tab value="create">Create Mint</Tabs.Tab>
            <Tabs.Tab value="mint">Mint Tokens</Tabs.Tab>
            <Tabs.Tab value="transfer">Transfer</Tabs.Tab>
            <Tabs.Tab value="query">Query</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="create" pt="xl">
            <Paper p="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Create New Token Mint</Title>
                <Text size="sm" c="dimmed">
                  Create a new SPL token with custom decimals
                </Text>

                <NumberInput
                  label="Decimals"
                  description="Number of decimal places (usually 9 for regular tokens)"
                  value={decimals}
                  onChange={(val) => setDecimals(Number(val))}
                  min={0}
                  max={9}
                  disabled={loading}
                />

                <Button
                  onClick={handleCreateMint}
                  loading={loading}
                  disabled={!publicKey}
                  fullWidth
                >
                  Create Token Mint
                </Button>

                {mintAddress && (
                  <div>
                    <Text size="sm" fw={500} mb={5}>
                      Mint Address:
                    </Text>
                    <Code block>{mintAddress}</Code>
                  </div>
                )}
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="mint" pt="xl">
            <Stack gap="md">
              <Paper p="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Create Token Account</Title>
                  <Text size="sm" c="dimmed">
                    Create an associated token account for the mint
                  </Text>

                  <TextInput
                    label="Mint Address"
                    placeholder="Enter mint address"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.currentTarget.value)}
                    disabled={loading}
                  />

                  <Button
                    onClick={handleCreateTokenAccount}
                    loading={loading}
                    disabled={!publicKey || !mintAddress}
                    fullWidth
                  >
                    Create Token Account
                  </Button>

                  {tokenAccount && (
                    <div>
                      <Text size="sm" fw={500} mb={5}>
                        Token Account:
                      </Text>
                      <Code block>{tokenAccount}</Code>
                    </div>
                  )}
                </Stack>
              </Paper>

              <Paper p="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Mint Tokens</Title>
                  <Text size="sm" c="dimmed">
                    Mint tokens to your token account
                  </Text>

                  <NumberInput
                    label="Amount"
                    description="Number of tokens to mint"
                    value={mintAmount}
                    onChange={(val) => setMintAmount(Number(val))}
                    min={0}
                    disabled={loading}
                  />

                  <Button
                    onClick={handleMintTokens}
                    loading={loading}
                    disabled={!publicKey || !mintAddress || !tokenAccount}
                    fullWidth
                  >
                    Mint Tokens
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="transfer" pt="xl">
            <Paper p="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Transfer Tokens</Title>
                <Text size="sm" c="dimmed">
                  Send tokens to another wallet
                </Text>

                <TextInput
                  label="Your Token Account"
                  placeholder="Your token account address"
                  value={tokenAccount}
                  onChange={(e) => setTokenAccount(e.currentTarget.value)}
                  disabled={loading}
                />

                <TextInput
                  label="Recipient Address"
                  placeholder="Recipient wallet address"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.currentTarget.value)}
                  disabled={loading}
                />

                <NumberInput
                  label="Amount"
                  description="Number of tokens to transfer"
                  value={transferAmount}
                  onChange={(val) => setTransferAmount(Number(val))}
                  min={0}
                  disabled={loading}
                />

                <Button
                  onClick={handleTransferTokens}
                  loading={loading}
                  disabled={!publicKey || !tokenAccount || !transferRecipient}
                  fullWidth
                >
                  Transfer Tokens
                </Button>
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="query" pt="xl">
            <Stack gap="md">
              <Paper p="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Query Mint Info</Title>
                  <TextInput
                    label="Mint Address"
                    placeholder="Enter mint address"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.currentTarget.value)}
                    disabled={loading}
                  />

                  <Button
                    onClick={handleGetMintInfo}
                    loading={loading}
                    fullWidth
                  >
                    Get Mint Info
                  </Button>

                  {mintInfo && (
                    <Table>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td fw={500}>Supply</Table.Td>
                          <Table.Td>
                            {(
                              Number(mintInfo.supply) /
                              Math.pow(10, mintInfo.decimals)
                            ).toLocaleString()}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Decimals</Table.Td>
                          <Table.Td>{mintInfo.decimals}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Mint Authority</Table.Td>
                          <Table.Td>
                            <Code>
                              {mintInfo.mintAuthority?.toString() || "None"}
                            </Code>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Freeze Authority</Table.Td>
                          <Table.Td>
                            <Code>
                              {mintInfo.freezeAuthority?.toString() || "None"}
                            </Code>
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  )}
                </Stack>
              </Paper>

              <Paper p="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Query Token Account</Title>
                  <TextInput
                    label="Token Account Address"
                    placeholder="Enter token account address"
                    value={tokenAccount}
                    onChange={(e) => setTokenAccount(e.currentTarget.value)}
                    disabled={loading}
                  />

                  <Button
                    onClick={handleGetAccountInfo}
                    loading={loading}
                    fullWidth
                  >
                    Get Account Info
                  </Button>

                  {accountInfo && (
                    <Table>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td fw={500}>Balance</Table.Td>
                          <Table.Td>
                            {(
                              Number(accountInfo.amount) /
                              Math.pow(10, decimals)
                            ).toLocaleString()}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Mint</Table.Td>
                          <Table.Td>
                            <Code>{accountInfo.mint.toString()}</Code>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Owner</Table.Td>
                          <Table.Td>
                            <Code>{accountInfo.owner.toString()}</Code>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500}>Frozen</Table.Td>
                          <Table.Td>
                            {accountInfo.isFrozen ? "Yes" : "No"}
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Paper p="xl" radius="md" withBorder>
          <Title order={3} mb="md">
            About SPL Token Program
          </Title>
          <Stack gap="sm">
            <Text size="sm">
              <strong>Program ID:</strong>{" "}
              <Code>TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA</Code>
            </Text>
            <Text size="sm">
              The Token Program is Solana&apos;s standard for creating and
              managing fungible tokens. All SPL tokens use this program, making
              them interoperable across the ecosystem.
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
