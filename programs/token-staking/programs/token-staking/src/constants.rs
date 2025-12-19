use anchor_lang::prelude::*;

#[constant]
pub const POOL_SEED: &[u8] = b"pool";

#[constant]
pub const USER_STAKE_SEED: &[u8] = b"user_stake";

#[constant]
pub const REWARD_PRECISION: u128 = 1_000_000_000; // 1e9

#[constant]
pub const MIN_STAKE_AMOUNT: u64 = 1_000_000; // 1 token with 6 decimals
