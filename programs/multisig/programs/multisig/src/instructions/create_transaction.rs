use anchor_lang::prelude::*;
use crate::errors::MultisigError;
use crate::state::{Multisig, Transaction, TransactionAccount};

pub fn handler(
    ctx: Context<CreateTransaction>,
    program_id: Pubkey,
    accounts: Vec<TransactionAccount>,
    data: Vec<u8>,
) -> Result<()> {
    require!(
        accounts.len() <= Transaction::MAX_ACCOUNTS,
        MultisigError::TooManyAccounts
    );
    require!(
        data.len() <= Transaction::MAX_DATA,
        MultisigError::DataTooLarge
    );

    let multisig = &mut ctx.accounts.multisig;
    let transaction = &mut ctx.accounts.transaction;

    // Verify proposer is an owner
    let proposer_key = ctx.accounts.proposer.key();
    require!(
        multisig.owners.contains(&proposer_key),
        MultisigError::NotOwner
    );

    transaction.multisig = multisig.key();
    transaction.program_id = program_id;
    transaction.accounts = accounts;
    transaction.data = data;
    transaction.signers = vec![false; multisig.owners.len()];
    transaction.executed = false;
    transaction.nonce = multisig.nonce;
    transaction.bump = ctx.bumps.transaction;

    // Increment nonce
    multisig.nonce = multisig.nonce.checked_add(1).unwrap();

    msg!("Transaction proposal created");
    msg!("Program: {}", program_id);
    msg!("Nonce: {}", transaction.nonce);

    Ok(())
}

#[derive(Accounts)]
pub struct CreateTransaction<'info> {
    #[account(
        mut,
        seeds = [
            b"multisig",
            multisig.owners[0].as_ref(),
        ],
        bump = multisig.bump,
    )]
    pub multisig: Account<'info, Multisig>,

    #[account(
        init,
        payer = proposer,
        space = Transaction::LEN,
        seeds = [
            b"transaction",
            multisig.key().as_ref(),
            &multisig.nonce.to_le_bytes(),
        ],
        bump,
    )]
    pub transaction: Account<'info, Transaction>,

    #[account(mut)]
    pub proposer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
