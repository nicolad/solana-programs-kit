use anchor_lang::prelude::*;
use crate::errors::OracleError;
use crate::state::Oracle;

pub fn handler(ctx: Context<GetTwap>, seconds_ago: i64) -> Result<u64> {
    let oracle = &ctx.accounts.oracle;
    let clock = Clock::get()?;
    let current_time = clock.unix_timestamp;

    require!(
        oracle.observation_count >= 2,
        OracleError::InsufficientObservations
    );

    let target_time = current_time - seconds_ago;

    // Find the two observations that bracket the target time
    let mut older_observation = None;
    let mut newer_observation = None;

    for i in 0..oracle.observation_count {
        let observation = &oracle.observations[i as usize];
        
        if observation.timestamp <= target_time {
            if older_observation.is_none() || observation.timestamp > older_observation.unwrap().timestamp {
                older_observation = Some(observation);
            }
        }
        
        if observation.timestamp >= target_time {
            if newer_observation.is_none() || observation.timestamp < newer_observation.unwrap().timestamp {
                newer_observation = Some(observation);
            }
        }
    }

    require!(
        older_observation.is_some() && newer_observation.is_some(),
        OracleError::TimeRangeExceeded
    );

    let older = older_observation.unwrap();
    let newer = newer_observation.unwrap();

    // Calculate TWAP
    let time_diff = newer.timestamp - older.timestamp;
    if time_diff == 0 {
        return Ok(newer.price);
    }

    let price_diff = newer.cumulative_price - older.cumulative_price;
    let twap = (price_diff / time_diff as u128) as u64;

    msg!("TWAP calculated: {} over {} seconds", twap, seconds_ago);

    Ok(twap)
}

#[derive(Accounts)]
pub struct GetTwap<'info> {
    #[account(
        seeds = [
            b"oracle",
            oracle.pool.as_ref(),
        ],
        bump,
    )]
    pub oracle: Account<'info, Oracle>,
}
