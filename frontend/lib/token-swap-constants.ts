import { PublicKey } from "@solana/web3.js";

export const AUTHORITY_SEED = "authority";
export const LIQUIDITY_SEED = "liquidity";
export const MINIMUM_LIQUIDITY = 100;

// You'll need to replace this with your deployed program ID
export const TOKEN_SWAP_PROGRAM_ID = new PublicKey(
  "C3ti6PFK6PoYShRFx1BNNTQU3qeY1iVwjwCA6SjJhiuW"
);

// PDA helper functions
export function getAmmPda(programId: PublicKey, id: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("amm"), id.toBuffer()],
    programId
  );
}

export function getPoolPda(
  programId: PublicKey,
  ammId: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool"),
      ammId.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
    ],
    programId
  );
}

export function getPoolAuthorityPda(
  programId: PublicKey,
  ammId: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(AUTHORITY_SEED),
      ammId.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
    ],
    programId
  );
}

export function getLiquidityMintPda(
  programId: PublicKey,
  ammId: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(LIQUIDITY_SEED),
      ammId.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
    ],
    programId
  );
}
