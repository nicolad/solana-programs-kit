use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("TokenStaking11111111111111111111111111111111");

#[program]
pub mod token_staking {
    use super::*;

    /// Initialize a new staking pool
    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        reward_rate: u64,
        lock_duration: i64,
    ) -> Result<()> {
        instructions::initialize_pool::handler(ctx, reward_rate, lock_duration)
    }

    /// Stake tokens into the pool
    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        instructions::stake::handler(ctx, amount)
    }

    /// Unstake tokens from the pool
    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        instructions::unstake::handler(ctx, amount)
    }

    /// Claim accumulated rewards
    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        instructions::claim_rewards::handler(ctx)
    }

    /// Fund the reward pool
    pub fn fund_rewards(ctx: Context<FundRewards>, amount: u64) -> Result<()> {
        instructions::fund_rewards::handler(ctx, amount)
    }
}
