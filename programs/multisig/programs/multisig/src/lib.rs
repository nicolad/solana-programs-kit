use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("MultiSig1111111111111111111111111111111111111");

#[program]
pub mod multisig {
    use super::*;

    /// Create a new multisig wallet
    pub fn create_multisig(
        ctx: Context<CreateMultisig>,
        owners: Vec<Pubkey>,
        threshold: u64,
    ) -> Result<()> {
        instructions::create_multisig::handler(ctx, owners, threshold)
    }

    /// Create a new transaction proposal
    pub fn create_transaction(
        ctx: Context<CreateTransaction>,
        program_id: Pubkey,
        accounts: Vec<TransactionAccount>,
        data: Vec<u8>,
    ) -> Result<()> {
        instructions::create_transaction::handler(ctx, program_id, accounts, data)
    }

    /// Approve a transaction
    pub fn approve(ctx: Context<Approve>) -> Result<()> {
        instructions::approve::handler(ctx)
    }

    /// Execute an approved transaction
    pub fn execute_transaction(ctx: Context<ExecuteTransaction>) -> Result<()> {
        instructions::execute_transaction::handler(ctx)
    }
}
