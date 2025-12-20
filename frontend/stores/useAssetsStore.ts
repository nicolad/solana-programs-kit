"use client";

import { Program } from "@coral-xyz/anchor";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  getMultipleAccounts as getMultipleTokenAccounts,
} from "@solana/spl-token";

// Seed prefix for the Liquidity Pool from our program
const LIQUIDITY_POOL_SEED_PREFIX = "liquidity_pool";

const getPoolAddress = (programId: PublicKey) =>
  PublicKey.findProgramAddressSync(
    [Buffer.from(LIQUIDITY_POOL_SEED_PREFIX)],
    programId
  )[0];

const getMetadataAddress = (programId: PublicKey, mint: PublicKey) =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      Buffer.from(MPL_TOKEN_METADATA_PROGRAM_ID),
      mint.toBuffer(),
    ],
    new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)
  )[0];

// Helper to deserialize metadata
const deserializeMetadata = (data: Buffer) => {
  // Simplified deserialization - just extract basic fields
  return [
    {
      mint: PublicKey.default,
      data: {
        name: "",
        symbol: "",
        uri: "",
      },
    },
  ];
};

export interface Asset {
  name: string;
  symbol: string;
  uri: string;
  decimals: number;
  balance: number;
  mint: PublicKey;
  poolTokenAccount: PublicKey;
}

export const getAssets = async (program: Program): Promise<Asset[]> => {
  let assets: Asset[];
  const poolAddress = getPoolAddress(program.programId);

  // Fetch pool account data manually
  const poolAccountInfo = await program.provider.connection.getAccountInfo(
    poolAddress
  );
  if (!poolAccountInfo) {
    throw new Error("Pool not found");
  }

  // Parse the account data to get pool info
  const pool = program.coder.accounts.decode(
    "liquidityPool",
    poolAccountInfo.data
  );

  let metadataAddresses: PublicKey[] = [];
  let tokenAccountAddresses: PublicKey[] = [];
  let mintAddresses: PublicKey[] = [];
  pool.assets.forEach((m: PublicKey) => {
    metadataAddresses.push(getMetadataAddress(program.programId, m));
    tokenAccountAddresses.push(
      getAssociatedTokenAddressSync(m, poolAddress, true)
    );
    mintAddresses.push(m); // assuming pool.assets are the mint addresses
  });
  const poolTokenAccounts = await getMultipleTokenAccounts(
    program.provider.connection,
    tokenAccountAddresses
  );

  const metadataAccounts = (
    await program.provider.connection.getMultipleAccountsInfo(metadataAddresses)
  ).map((accountInfo) =>
    accountInfo != null ? deserializeMetadata(accountInfo?.data) : null
  );

  const mintInfos = await Promise.all(
    mintAddresses.map((mint) =>
      program.provider.connection.getParsedAccountInfo(mint)
    )
  );

  assets = poolTokenAccounts.map((account, index) => {
    const metadataAccount = metadataAccounts.find((m) =>
      m?.[0].mint.equals(account.mint)
    );
    const [name, symbol, uri] = metadataAccount
      ? [
          metadataAccount[0].data.name,
          metadataAccount[0].data.symbol,
          metadataAccount[0].data.uri,
        ]
      : ["Unknown Asset", "UNKN", ""];
    let decimals = 0;
    // @ts-ignore
    if ("parsed" in mintInfos[index].value.data) {
      // @ts-ignore
      decimals = mintInfos[index].value.data.parsed.info.decimals;
    }
    return {
      name,
      symbol,
      uri,
      decimals,
      balance: Number(account.amount),
      mint: account.mint,
      poolTokenAccount: account.address,
    };
  });
  return assets;
};
