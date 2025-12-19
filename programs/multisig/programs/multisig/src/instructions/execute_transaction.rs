use anchor_lang::prelude::*;
use anchor_lang::solana_program::{instruction::Instruction, program::invoke_signed};
use crate::errors::MultisigError;
use crate::state::{Multisig, Transaction};

pub fn handler(ctx: Context<ExecuteTransaction>) -> Result<()> {
    let multisig = &ctx.accounts.multisig;
    let transaction = &mut ctx.accounts.transaction;

    require!(!transaction.executed, MultisigError::AlreadyExecuted);

    // Count signatures
    let sig_count = transaction.signers.iter().filter(|&&s| s).count() as u64;
    require!(
        sig_count >= multisig.threshold,
        MultisigError::NotEnoughSigners
    );

    // Build accounts for CPI
    let mut account_metas = Vec::new();
    for acc in &transaction.accounts {
        account_metas.push(anchor_lang::solana_program::instruction::AccountMeta {
            pubkey: acc.pubkey,
            is_signer: acc.is_signer,
            is_writable: acc.is_writable,
        });
    }

    // Create instruction
    let ix = Instruction {
        program_id: transaction.program_id,
        accounts: account_metas,
        data: transaction.data.clone(),
    };

    // Execute with PDA as signer
    let seeds = &[
        b"multisig".as_ref(),
        multisig.owners[0].as_ref(),
        &[multisig.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    // Get remaining accounts for CPI
    let accounts: Vec<AccountInfo> = ctx.remaining_accounts.to_vec();

    invoke_signed(&ix, &accounts, signer_seeds)?;

    transaction.executed = true;

    msg!("Transaction executed successfully");

    Ok(())
}

#[derive(Accounts)]
pub struct ExecuteTransaction<'info> {
    #[account(
        seeds = [
            b"multisig",
            multisig.owners[0].as_ref(),
        ],
        bump = multisig.bump,
    )]
    pub multisig: Account<'info, Multisig>,

    #[account(
        mut,
        seeds = [
            b"transaction",
            multisig.key().as_ref(),
            &transaction.nonce.to_le_bytes(),
        ],
        bump = transaction.bump,
    )]
    pub transaction: Account<'info, Transaction>,

    pub executor: Signer<'info>,
}
