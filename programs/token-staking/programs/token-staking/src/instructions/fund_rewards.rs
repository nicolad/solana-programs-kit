use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::state::StakingPool;

pub fn handler(ctx: Context<FundRewards>, amount: u64) -> Result<()> {
    // Transfer reward tokens to vault
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.funder_account.to_account_info(),
                to: ctx.accounts.reward_vault.to_account_info(),
                authority: ctx.accounts.funder.to_account_info(),
            },
        ),
        amount,
    )?;

    msg!("Funded reward pool with {} tokens", amount);

    Ok(())
}

#[derive(Accounts)]
pub struct FundRewards<'info> {
    #[account(
        seeds = [
            b"pool",
            pool.stake_mint.as_ref(),
            pool.reward_mint.as_ref(),
        ],
        bump = pool.bump,
    )]
    pub pool: Account<'info, StakingPool>,

    #[account(mut)]
    pub reward_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub funder_account: Account<'info, TokenAccount>,

    pub funder: Signer<'info>,

    pub token_program: Program<'info, Token>,
}
