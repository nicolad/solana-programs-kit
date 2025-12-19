use anchor_lang::prelude::*;
use crate::errors::MultisigError;
use crate::state::{Multisig, Transaction};

pub fn handler(ctx: Context<Approve>) -> Result<()> {
    let multisig = &ctx.accounts.multisig;
    let transaction = &mut ctx.accounts.transaction;
    let owner = ctx.accounts.owner.key();

    require!(!transaction.executed, MultisigError::AlreadyExecuted);

    // Find owner index
    let owner_index = multisig
        .owners
        .iter()
        .position(|&o| o == owner)
        .ok_or(MultisigError::NotOwner)?;

    require!(
        !transaction.signers[owner_index],
        MultisigError::AlreadySigned
    );

    transaction.signers[owner_index] = true;

    msg!("Transaction approved by owner {}", owner);

    Ok(())
}

#[derive(Accounts)]
pub struct Approve<'info> {
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

    pub owner: Signer<'info>,
}
