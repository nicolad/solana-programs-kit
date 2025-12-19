use crate::errors::OracleError;
use crate::state::{Observation, Oracle};
use anchor_lang::prelude::*;

pub fn handler(ctx: Context<Initialize>, pool: Pubkey, observation_window: i64) -> Result<()> {
    require!(
        observation_window > 0,
        OracleError::InvalidObservationWindow
    );

    let oracle = &mut ctx.accounts.oracle;
    oracle.pool = pool;
    oracle.authority = ctx.accounts.authority.key();
    oracle.observation_window = observation_window;
    oracle.current_index = 0;
    oracle.observation_count = 0;
    oracle.last_update = Clock::get()?.unix_timestamp;
    oracle.observations = [Observation::default(); 100];

    msg!("Oracle initialized for pool: {}", pool);
    msg!("Observation window: {} seconds", observation_window);

    Ok(())
}

#[derive(Accounts)]
#[instruction(pool: Pubkey)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = Oracle::LEN,
        seeds = [
            b"oracle",
            pool.as_ref(),
        ],
        bump,
    )]
    pub oracle: Account<'info, Oracle>,

    /// CHECK: Authority account
    pub authority: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
