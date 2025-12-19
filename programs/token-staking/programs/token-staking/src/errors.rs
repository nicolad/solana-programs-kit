use anchor_lang::prelude::*;

#[error_code]
pub enum StakingError {
    #[msg("Invalid reward rate")]
    InvalidRewardRate,
    #[msg("Invalid lock duration")]
    InvalidLockDuration,
    #[msg("Insufficient stake amount")]
    InsufficientStake,
    #[msg("Tokens are still locked")]
    TokensLocked,
    #[msg("No rewards to claim")]
    NoRewards,
    #[msg("Insufficient rewards in pool")]
    InsufficientRewards,
    #[msg("Math overflow")]
    MathOverflow,
}
