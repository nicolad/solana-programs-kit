use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::constants::{MIN_STAKE_AMOUNT, REWARD_PRECISION};
use crate::errors::StakingError;
use crate::state::{StakingPool, UserStake};

pub fn handler(ctx: Context<Stake>, amount: u64) -> Result<()> {
    require!(amount >= MIN_STAKE_AMOUNT, StakingError::InsufficientStake);

    let pool = &mut ctx.accounts.pool;
    let user_stake = &mut ctx.accounts.user_stake;
    let clock = Clock::get()?;

    // Update pool rewards
    update_pool_rewards(pool, clock.unix_timestamp)?;

    // Update user rewards
    if user_stake.amount > 0 {
        update_user_rewards(pool, user_stake)?;
    }

    // Transfer tokens to vault
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_stake_account.to_account_info(),
                to: ctx.accounts.stake_vault.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        amount,
    )?;

    // Update state
    user_stake.amount = user_stake
        .amount
        .checked_add(amount)
        .ok_or(StakingError::MathOverflow)?;
    user_stake.stake_timestamp = clock.unix_timestamp;
    user_stake.reward_per_token_paid = pool.reward_per_token_stored;

    pool.total_staked = pool
        .total_staked
        .checked_add(amount)
        .ok_or(StakingError::MathOverflow)?;

    msg!("Staked {} tokens", amount);

    Ok(())
}

fn update_pool_rewards(pool: &mut StakingPool, current_time: i64) -> Result<()> {
    if pool.total_staked == 0 {
        pool.last_update = current_time;
        return Ok(());
    }

    let time_elapsed = current_time
        .checked_sub(pool.last_update)
        .ok_or(StakingError::MathOverflow)? as u64;

    let reward_per_token_increase = (time_elapsed as u128)
        .checked_mul(pool.reward_rate as u128)
        .ok_or(StakingError::MathOverflow)?
        .checked_mul(REWARD_PRECISION)
        .ok_or(StakingError::MathOverflow)?
        .checked_div(pool.total_staked as u128)
        .ok_or(StakingError::MathOverflow)?;

    pool.reward_per_token_stored = pool
        .reward_per_token_stored
        .checked_add(reward_per_token_increase)
        .ok_or(StakingError::MathOverflow)?;

    pool.last_update = current_time;

    Ok(())
}

fn update_user_rewards(pool: &StakingPool, user_stake: &mut UserStake) -> Result<()> {
    let reward_per_token_delta = pool
        .reward_per_token_stored
        .checked_sub(user_stake.reward_per_token_paid)
        .ok_or(StakingError::MathOverflow)?;

    let earned = (user_stake.amount as u128)
        .checked_mul(reward_per_token_delta)
        .ok_or(StakingError::MathOverflow)?
        .checked_div(REWARD_PRECISION)
        .ok_or(StakingError::MathOverflow)? as u64;

    user_stake.rewards_earned = user_stake
        .rewards_earned
        .checked_add(earned)
        .ok_or(StakingError::MathOverflow)?;

    Ok(())
}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(
        mut,
        seeds = [
            b"pool",
            pool.stake_mint.as_ref(),
            pool.reward_mint.as_ref(),
        ],
        bump = pool.bump,
    )]
    pub pool: Account<'info, StakingPool>,

    #[account(
        init_if_needed,
        payer = user,
        space = UserStake::LEN,
        seeds = [
            b"user_stake",
            pool.key().as_ref(),
            user.key().as_ref(),
        ],
        bump,
    )]
    pub user_stake: Account<'info, UserStake>,

    #[account(mut)]
    pub stake_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_stake_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
