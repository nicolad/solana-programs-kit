use anchor_lang::prelude::*;

declare_id!("StkPoo1Poo1Poo1Poo1Poo1Poo1Poo1Poo1Poo1");

#[program]
pub mod stake_pool {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Stake Pool: Initialize pool");
        Ok(())
    }

    pub fn deposit_sol(ctx: Context<DepositSol>, amount: u64) -> Result<()> {
        msg!("Stake Pool: Deposit {} SOL", amount);
        Ok(())
    }

    pub fn withdraw_sol(ctx: Context<WithdrawSol>, amount: u64) -> Result<()> {
        msg!("Stake Pool: Withdraw {} SOL", amount);
        Ok(())
    }

    pub fn update_pool(ctx: Context<UpdatePool>) -> Result<()> {
        msg!("Stake Pool: Update pool state");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositSol<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct WithdrawSol<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdatePool<'info> {
    #[account(mut)]
    pub manager: Signer<'info>,
}
