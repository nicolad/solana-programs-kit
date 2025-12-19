use anchor_lang::prelude::*;

/// Multisig wallet account
#[account]
#[derive(Default)]
pub struct Multisig {
    /// Owners of the multisig
    pub owners: Vec<Pubkey>,
    /// Number of signatures required for execution
    pub threshold: u64,
    /// Transaction counter
    pub nonce: u64,
    /// Bump seed for PDA
    pub bump: u8,
}

impl Multisig {
    pub const MAX_OWNERS: usize = 10;
    pub const LEN: usize = 8 + // discriminator
        4 + (32 * Self::MAX_OWNERS) + // owners (vec)
        8 + // threshold
        8 + // nonce
        1; // bump
}

/// Transaction proposal
#[account]
#[derive(Default)]
pub struct Transaction {
    /// Multisig account
    pub multisig: Pubkey,
    /// Program to execute
    pub program_id: Pubkey,
    /// Accounts for the transaction
    pub accounts: Vec<TransactionAccount>,
    /// Instruction data
    pub data: Vec<u8>,
    /// Signers who have approved
    pub signers: Vec<bool>,
    /// Whether the transaction has been executed
    pub executed: bool,
    /// Transaction nonce
    pub nonce: u64,
    /// Bump seed for PDA
    pub bump: u8,
}

impl Transaction {
    pub const MAX_ACCOUNTS: usize = 20;
    pub const MAX_DATA: usize = 1024;
    pub const LEN: usize = 8 + // discriminator
        32 + // multisig
        32 + // program_id
        4 + (Self::MAX_ACCOUNTS * TransactionAccount::LEN) + // accounts
        4 + Self::MAX_DATA + // data
        4 + (Multisig::MAX_OWNERS) + // signers (bool vec)
        1 + // executed
        8 + // nonce
        1; // bump
}

/// Account metadata for transaction
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct TransactionAccount {
    /// Public key of the account
    pub pubkey: Pubkey,
    /// Is this account a signer
    pub is_signer: bool,
    /// Is this account writable
    pub is_writable: bool,
}

impl TransactionAccount {
    pub const LEN: usize = 32 + 1 + 1;
}
