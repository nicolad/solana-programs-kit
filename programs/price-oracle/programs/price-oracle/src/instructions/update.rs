use anchor_lang::prelude::*;
use crate::constants::MIN_UPDATE_INTERVAL;
use crate::errors::OracleError;
use crate::state::Oracle;

pub fn handler(ctx: Context<Update>, price: u64, liquidity: u64) -> Result<()> {
    require!(price > 0, OracleError::InvalidPrice);

    let oracle = &mut ctx.accounts.oracle;
    let clock = Clock::get()?;
    let current_time = clock.unix_timestamp;

    // Enforce minimum update interval
    require!(
        current_time >= oracle.last_update + MIN_UPDATE_INTERVAL,
        OracleError::UpdateTooSoon
    );

    // Calculate cumulative price
    let time_elapsed = current_time - oracle.last_update;
    let cumulative_price = if oracle.observation_count > 0 {
        let last_index = if oracle.current_index == 0 {
            oracle.observation_count - 1
        } else {
            oracle.current_index - 1
        };
        let last_observation = &oracle.observations[last_index as usize];
        last_observation.cumulative_price + (price as u128 * time_elapsed as u128)
    } else {
        price as u128 * time_elapsed as u128
    };

    // Update observation
    oracle.observations[oracle.current_index as usize] = crate::state::Observation {
        timestamp: current_time,
        price,
        cumulative_price,
        liquidity,
    };

    // Update indices
    oracle.current_index = (oracle.current_index + 1) % 100;
    if oracle.observation_count < 100 {
        oracle.observation_count += 1;
    }
    oracle.last_update = current_time;

    msg!("Oracle updated - Price: {}, Liquidity: {}", price, liquidity);

    Ok(())
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(
        mut,
        seeds = [
            b"oracle",
            oracle.pool.as_ref(),
        ],
        bump,
        constraint = oracle.authority == authority.key(),
    )]
    pub oracle: Account<'info, Oracle>,

    pub authority: Signer<'info>,
}
