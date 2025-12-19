use crate::errors::MultisigError;
use crate::state::Multisig;
use anchor_lang::prelude::*;

pub fn handler(ctx: Context<CreateMultisig>, owners: Vec<Pubkey>, threshold: u64) -> Result<()> {
    require!(
        owners.len() > 0 && owners.len() <= Multisig::MAX_OWNERS,
        MultisigError::InvalidOwners
    );
    require!(
        threshold > 0 && threshold <= owners.len() as u64,
        MultisigError::InvalidThreshold
    );

    let multisig = &mut ctx.accounts.multisig;
    multisig.owners = owners.clone();
    multisig.threshold = threshold;
    multisig.nonce = 0;
    multisig.bump = ctx.bumps.multisig;

    msg!("Multisig created with {} owners", owners.len());
    msg!("Threshold: {}", threshold);

    Ok(())
}

#[derive(Accounts)]
#[instruction(owners: Vec<Pubkey>)]
pub struct CreateMultisig<'info> {
    #[account(
        init,
        payer = payer,
        space = Multisig::LEN,
        seeds = [
            b"multisig",
            payer.key().as_ref(),
        ],
        bump,
    )]
    pub multisig: Account<'info, Multisig>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
