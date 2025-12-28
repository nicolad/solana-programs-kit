use anchor_lang::prelude::*;

declare_id!("VestingProgram11111111111111111111111111111");

#[program]
pub mod token_vesting {
    use super::*;

    pub fn create_vesting_schedule(
        ctx: Context<CreateVestingSchedule>,
        start_time: i64,
        end_time: i64,
        amount: u64,
    ) -> Result<()> {
        msg!("Token Vesting: Create schedule from {} to {} for {}", start_time, end_time, amount);
        Ok(())
    }

    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        msg!("Token Vesting: Claim vested tokens");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateVestingSchedule<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(mut)]
    pub beneficiary: Signer<'info>,
}
