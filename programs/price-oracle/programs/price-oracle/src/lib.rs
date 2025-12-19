use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("PriceOracle111111111111111111111111111111111");

#[program]
pub mod price_oracle {
    use super::*;

    /// Initialize a new price oracle
    pub fn initialize(
        ctx: Context<Initialize>,
        pool: Pubkey,
        observation_window: i64,
    ) -> Result<()> {
        instructions::initialize::handler(ctx, pool, observation_window)
    }

    /// Update the oracle with a new price observation
    pub fn update(ctx: Context<Update>, price: u64, liquidity: u64) -> Result<()> {
        instructions::update::handler(ctx, price, liquidity)
    }

    /// Get the time-weighted average price
    pub fn get_twap(ctx: Context<GetTwap>, seconds_ago: i64) -> Result<u64> {
        instructions::get_twap::handler(ctx, seconds_ago)
    }
}
