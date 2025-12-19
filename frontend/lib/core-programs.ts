/**
 * Core Solana Programs - Client Interaction Library
 *
 * This file provides utilities to interact with core Solana programs:
 * - Token Program (SPL Token)
 * - Token-2022 (Token Extensions)
 * - Associated Token Account
 * - System Program
 * - Memo Program
 * - Compute Budget
 * - Address Lookup Tables
 */

import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createMint,
  mintTo,
  transfer,
  getOrCreateAssociatedTokenAccount,
  createInitializeMintInstruction,
  createMintToInstruction,
  createTransferInstruction,
  getMint,
  getAccount,
} from "@solana/spl-token";

// Program IDs
export const CORE_PROGRAMS = {
  TOKEN: TOKEN_PROGRAM_ID,
  TOKEN_2022: TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN: ASSOCIATED_TOKEN_PROGRAM_ID,
  SYSTEM: SystemProgram.programId,
  MEMO: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
  COMPUTE_BUDGET: new PublicKey("ComputeBudget111111111111111111111111111111"),
  ADDRESS_LOOKUP: new PublicKey("AddressLookupTab1e1111111111111111111111111"),
} as const;

// ============================================
// SYSTEM PROGRAM
// ============================================

export class SystemProgramClient {
  constructor(private connection: Connection) {}

  /**
   * Transfer SOL from one account to another
   */
  async transferSol(
    from: PublicKey,
    to: PublicKey,
    amountInSol: number
  ): Promise<TransactionInstruction> {
    return SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amountInSol * LAMPORTS_PER_SOL,
    });
  }

  /**
   * Create a new account
   */
  createAccount(
    from: PublicKey,
    newAccount: PublicKey,
    space: number,
    programId: PublicKey,
    lamports?: number
  ): TransactionInstruction {
    return SystemProgram.createAccount({
      fromPubkey: from,
      newAccountPubkey: newAccount,
      space,
      lamports: lamports || 0,
      programId,
    });
  }

  /**
   * Get SOL balance
   */
  async getBalance(address: PublicKey): Promise<number> {
    const lamports = await this.connection.getBalance(address);
    return lamports / LAMPORTS_PER_SOL;
  }
}

// ============================================
// TOKEN PROGRAM (SPL)
// ============================================

export class TokenProgramClient {
  constructor(
    private connection: Connection,
    private programId: PublicKey = TOKEN_PROGRAM_ID
  ) {}

  /**
   * Create a new token mint
   */
  async createMint(
    payer: Keypair,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
    decimals: number
  ): Promise<PublicKey> {
    return await createMint(
      this.connection,
      payer,
      mintAuthority,
      freezeAuthority,
      decimals,
      undefined,
      undefined,
      this.programId
    );
  }

  /**
   * Get or create associated token account
   */
  async getOrCreateATA(payer: Keypair, mint: PublicKey, owner: PublicKey) {
    return await getOrCreateAssociatedTokenAccount(
      this.connection,
      payer,
      mint,
      owner,
      undefined,
      undefined,
      undefined,
      this.programId
    );
  }

  /**
   * Get associated token address
   */
  async getATAddress(mint: PublicKey, owner: PublicKey): Promise<PublicKey> {
    return await getAssociatedTokenAddress(
      mint,
      owner,
      undefined,
      this.programId
    );
  }

  /**
   * Mint tokens to an account
   */
  async mintTo(
    payer: Keypair,
    mint: PublicKey,
    destination: PublicKey,
    authority: Keypair,
    amount: number
  ): Promise<string> {
    return await mintTo(
      this.connection,
      payer,
      mint,
      destination,
      authority,
      amount,
      undefined,
      undefined,
      this.programId
    );
  }

  /**
   * Transfer tokens between accounts
   */
  async transfer(
    payer: Keypair,
    source: PublicKey,
    destination: PublicKey,
    owner: Keypair,
    amount: number
  ): Promise<string> {
    return await transfer(
      this.connection,
      payer,
      source,
      destination,
      owner,
      amount,
      undefined,
      undefined,
      this.programId
    );
  }

  /**
   * Get mint info
   */
  async getMintInfo(mint: PublicKey) {
    return await getMint(this.connection, mint, undefined, this.programId);
  }

  /**
   * Get token account info
   */
  async getAccountInfo(account: PublicKey) {
    return await getAccount(
      this.connection,
      account,
      undefined,
      this.programId
    );
  }

  /**
   * Get token balance
   */
  async getBalance(account: PublicKey): Promise<number> {
    const accountInfo = await this.getAccountInfo(account);
    return Number(accountInfo.amount);
  }
}

// ============================================
// MEMO PROGRAM
// ============================================

export class MemoProgramClient {
  readonly programId = CORE_PROGRAMS.MEMO;

  /**
   * Create a memo instruction
   */
  createMemo(memo: string, signers?: PublicKey[]): TransactionInstruction {
    return new TransactionInstruction({
      keys:
        signers?.map((signer) => ({
          pubkey: signer,
          isSigner: true,
          isWritable: false,
        })) || [],
      programId: this.programId,
      data: Buffer.from(memo, "utf-8"),
    });
  }

  /**
   * Add memo to transaction
   */
  addMemoToTx(
    tx: Transaction,
    memo: string,
    signers?: PublicKey[]
  ): Transaction {
    tx.add(this.createMemo(memo, signers));
    return tx;
  }
}

// ============================================
// COMPUTE BUDGET PROGRAM
// ============================================

export class ComputeBudgetClient {
  readonly programId = CORE_PROGRAMS.COMPUTE_BUDGET;

  /**
   * Set compute unit limit
   */
  setComputeUnitLimit(units: number): TransactionInstruction {
    return new TransactionInstruction({
      keys: [],
      programId: this.programId,
      data: Buffer.from([
        2, // SetComputeUnitLimit instruction
        ...new Uint8Array(new Uint32Array([units]).buffer),
      ]),
    });
  }

  /**
   * Set compute unit price (priority fee)
   */
  setComputeUnitPrice(microLamports: number): TransactionInstruction {
    return new TransactionInstruction({
      keys: [],
      programId: this.programId,
      data: Buffer.from([
        3, // SetComputeUnitPrice instruction
        ...new Uint8Array(new BigUint64Array([BigInt(microLamports)]).buffer),
      ]),
    });
  }

  /**
   * Add priority fee to transaction
   */
  addPriorityFee(
    tx: Transaction,
    computeUnits: number,
    priorityFee: number
  ): Transaction {
    tx.add(this.setComputeUnitLimit(computeUnits));
    tx.add(this.setComputeUnitPrice(priorityFee));
    return tx;
  }
}

// ============================================
// ASSOCIATED TOKEN ACCOUNT
// ============================================

export class AssociatedTokenClient {
  readonly programId = CORE_PROGRAMS.ASSOCIATED_TOKEN;

  /**
   * Get ATA address
   */
  async getAddress(
    mint: PublicKey,
    owner: PublicKey,
    programId: PublicKey = TOKEN_PROGRAM_ID
  ): Promise<PublicKey> {
    return await getAssociatedTokenAddress(mint, owner, undefined, programId);
  }

  /**
   * Derive ATA address (deterministic)
   */
  deriveAddress(
    mint: PublicKey,
    owner: PublicKey,
    programId: PublicKey = TOKEN_PROGRAM_ID
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
      this.programId
    )[0];
  }
}

// ============================================
// UNIFIED CLIENT
// ============================================

export class SolanaCoreClient {
  public system: SystemProgramClient;
  public token: TokenProgramClient;
  public token2022: TokenProgramClient;
  public memo: MemoProgramClient;
  public computeBudget: ComputeBudgetClient;
  public ata: AssociatedTokenClient;

  constructor(private connection: Connection) {
    this.system = new SystemProgramClient(connection);
    this.token = new TokenProgramClient(connection, TOKEN_PROGRAM_ID);
    this.token2022 = new TokenProgramClient(connection, TOKEN_2022_PROGRAM_ID);
    this.memo = new MemoProgramClient();
    this.computeBudget = new ComputeBudgetClient();
    this.ata = new AssociatedTokenClient();
  }

  /**
   * Get connection
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Update connection
   */
  setConnection(connection: Connection): void {
    this.connection = connection;
    this.system = new SystemProgramClient(connection);
    this.token = new TokenProgramClient(connection);
    this.token2022 = new TokenProgramClient(connection, TOKEN_2022_PROGRAM_ID);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a simple SOL transfer transaction
 */
export async function createSolTransfer(
  connection: Connection,
  from: PublicKey,
  to: PublicKey,
  amountInSol: number,
  memo?: string
): Promise<Transaction> {
  const tx = new Transaction();

  const client = new SolanaCoreClient(connection);
  tx.add(await client.system.transferSol(from, to, amountInSol));

  if (memo) {
    tx.add(client.memo.createMemo(memo));
  }

  return tx;
}

/**
 * Create a token transfer transaction
 */
export async function createTokenTransfer(
  connection: Connection,
  mint: PublicKey,
  from: PublicKey,
  to: PublicKey,
  amount: number,
  owner: PublicKey,
  memo?: string,
  programId: PublicKey = TOKEN_PROGRAM_ID
): Promise<Transaction> {
  const tx = new Transaction();
  const client = new SolanaCoreClient(connection);

  const sourceAta = await getAssociatedTokenAddress(
    mint,
    from,
    undefined,
    programId
  );
  const destAta = await getAssociatedTokenAddress(
    mint,
    to,
    undefined,
    programId
  );

  tx.add(
    createTransferInstruction(sourceAta, destAta, owner, amount, [], programId)
  );

  if (memo) {
    tx.add(client.memo.createMemo(memo));
  }

  return tx;
}
