use anchor_lang::prelude::*;

/// Price observation with timestamp
#[account]
#[derive(Default)]
pub struct Oracle {
    /// Associated pool address
    pub pool: Pubkey,
    /// Authority that can update the oracle
    pub authority: Pubkey,
    /// Time window for TWAP calculation (in seconds)
    pub observation_window: i64,
    /// Ring buffer of observations
    pub observations: [Observation; 100],
    /// Current index in the ring buffer
    pub current_index: u16,
    /// Number of observations stored
    pub observation_count: u16,
    /// Last update timestamp
    pub last_update: i64,
}

impl Oracle {
    pub const LEN: usize = 8 + // discriminator
        32 + // pool
        32 + // authority
        8 + // observation_window
        (16 * 100) + // observations (100 observations)
        2 + // current_index
        2 + // observation_count
        8; // last_update
}

/// Individual price observation
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Default)]
pub struct Observation {
    /// Timestamp of observation
    pub timestamp: i64,
    /// Price at observation (token_a / token_b)
    pub price: u64,
    /// Cumulative price (for TWAP calculation)
    pub cumulative_price: u128,
    /// Liquidity at time of observation
    pub liquidity: u64,
}
