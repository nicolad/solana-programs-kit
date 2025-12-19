import { PublicKey } from "@solana/web3.js";

// Seed constants from the program
export const AUTHORITY_SEED = "authority";
export const LIQUIDITY_SEED = "liquidity";
export const MINIMUM_LIQUIDITY = 100;

export function getAmmPda(
  programId: PublicKey,
  ammId: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([ammId.toBuffer()], programId);
}

export function getPoolPda(
  programId: PublicKey,
  ammKey: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [ammKey.toBuffer(), mintA.toBuffer(), mintB.toBuffer()],
    programId
  );
}

export function getPoolAuthorityPda(
  programId: PublicKey,
  ammKey: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      ammKey.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
      Buffer.from(AUTHORITY_SEED),
    ],
    programId
  );
}

export function getLiquidityMintPda(
  programId: PublicKey,
  ammKey: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      ammKey.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
      Buffer.from(LIQUIDITY_SEED),
    ],
    programId
  );
}

export function calculateSwapOutput(
  inputAmount: number,
  inputReserve: number,
  outputReserve: number,
  fee: number
): number {
  // Apply fee (fee is in basis points)
  const taxedInput = inputAmount - (inputAmount * fee) / 10000;

  // Constant product formula: output = (taxedInput * outputReserve) / (inputReserve + taxedInput)
  const output = (taxedInput * outputReserve) / (inputReserve + taxedInput);

  return Math.floor(output);
}

export function calculateLiquidityAmount(
  amountA: number,
  amountB: number
): number {
  // Calculate sqrt(amountA * amountB)
  return Math.floor(Math.sqrt(amountA * amountB));
}
