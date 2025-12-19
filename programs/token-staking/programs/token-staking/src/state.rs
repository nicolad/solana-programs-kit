use anchor_lang::prelude::*;

/// Staking pool account
#[account]
#[derive(Default)]
pub struct StakingPool {
    /// Authority that can update pool parameters
    pub authority: Pubkey,
    /// Token mint for staking
    pub stake_mint: Pubkey,
    /// Token mint for rewards
    pub reward_mint: Pubkey,
    /// Vault holding staked tokens
    pub stake_vault: Pubkey,
    /// Vault holding reward tokens
    pub reward_vault: Pubkey,
    /// Reward rate per second per staked token (scaled by 1e9)
    pub reward_rate: u64,
    /// Minimum lock duration in seconds
    pub lock_duration: i64,
    /// Total tokens staked
    pub total_staked: u64,
    /// Last time rewards were calculated
    pub last_update: i64,
    /// Accumulated reward per token (scaled by 1e9)
    pub reward_per_token_stored: u128,
    /// Bump seed for PDA
    pub bump: u8,
}

impl StakingPool {
    pub const LEN: usize = 8 + // discriminator
        32 + // authority
        32 + // stake_mint
        32 + // reward_mint
        32 + // stake_vault
        32 + // reward_vault
        8 + // reward_rate
        8 + // lock_duration
        8 + // total_staked
        8 + // last_update
        16 + // reward_per_token_stored
        1; // bump
}

/// User stake account
#[account]
#[derive(Default)]
pub struct UserStake {
    /// Staking pool this stake belongs to
    pub pool: Pubkey,
    /// User who owns this stake
    pub user: Pubkey,
    /// Amount of tokens staked
    pub amount: u64,
    /// Reward per token paid to user
    pub reward_per_token_paid: u128,
    /// Rewards earned but not yet claimed
    pub rewards_earned: u64,
    /// Timestamp when tokens were staked
    pub stake_timestamp: i64,
    /// Bump seed for PDA
    pub bump: u8,
}

impl UserStake {
    pub const LEN: usize = 8 + // discriminator
        32 + // pool
        32 + // user
        8 + // amount
        16 + // reward_per_token_paid
        8 + // rewards_earned
        8 + // stake_timestamp
        1; // bump
}
