use crate::errors::StakingError;
use crate::state::StakingPool;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

pub fn handler(ctx: Context<InitializePool>, reward_rate: u64, lock_duration: i64) -> Result<()> {
    require!(reward_rate > 0, StakingError::InvalidRewardRate);
    require!(lock_duration >= 0, StakingError::InvalidLockDuration);

    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;

    pool.authority = ctx.accounts.authority.key();
    pool.stake_mint = ctx.accounts.stake_mint.key();
    pool.reward_mint = ctx.accounts.reward_mint.key();
    pool.stake_vault = ctx.accounts.stake_vault.key();
    pool.reward_vault = ctx.accounts.reward_vault.key();
    pool.reward_rate = reward_rate;
    pool.lock_duration = lock_duration;
    pool.total_staked = 0;
    pool.last_update = clock.unix_timestamp;
    pool.reward_per_token_stored = 0;
    pool.bump = ctx.bumps.pool;

    msg!("Staking pool initialized");
    msg!("Reward rate: {} per second", reward_rate);
    msg!("Lock duration: {} seconds", lock_duration);

    Ok(())
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(
        init,
        payer = payer,
        space = StakingPool::LEN,
        seeds = [
            b"pool",
            stake_mint.key().as_ref(),
            reward_mint.key().as_ref(),
        ],
        bump,
    )]
    pub pool: Account<'info, StakingPool>,

    pub stake_mint: Account<'info, Mint>,
    pub reward_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = payer,
        associated_token::mint = stake_mint,
        associated_token::authority = pool,
    )]
    pub stake_vault: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = payer,
        associated_token::mint = reward_mint,
        associated_token::authority = pool,
    )]
    pub reward_vault: Account<'info, TokenAccount>,

    /// CHECK: Authority account
    pub authority: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
