use anchor_lang::prelude::*;

declare_id!("CLoCKWorK111111111111111111111111111111111");

#[program]
pub mod clockwork {
    use super::*;

    pub fn create_thread(ctx: Context<CreateThread>, schedule: String) -> Result<()> {
        msg!("Clockwork: Create thread with schedule: {}", schedule);
        Ok(())
    }

    pub fn execute_thread(ctx: Context<ExecuteThread>) -> Result<()> {
        msg!("Clockwork: Execute scheduled thread");
        Ok(())
    }

    pub fn delete_thread(ctx: Context<DeleteThread>) -> Result<()> {
        msg!("Clockwork: Delete thread");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateThread<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExecuteThread<'info> {
    #[account(mut)]
    pub executor: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteThread<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
}
