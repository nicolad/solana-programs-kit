use anchor_lang::prelude::*;

declare_id!("MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA");

#[program]
pub mod marginfi {
    use super::*;

    pub fn initialize_account(ctx: Context<InitializeAccount>) -> Result<()> {
        msg!("MarginFi: Initialize lending account");
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        msg!("MarginFi: Deposit {} for lending", amount);
        Ok(())
    }

    pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
        msg!("MarginFi: Borrow {}", amount);
        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        msg!("MarginFi: Repay {}", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAccount<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Borrow<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Repay<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}
