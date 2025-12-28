use anchor_lang::prelude::*;

declare_id!("whir1poo1s111111111111111111111111111111111");

#[program]
pub mod whirlpools {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>) -> Result<()> {
        msg!("Whirlpools: Initialize concentrated liquidity pool");
        Ok(())
    }

    pub fn open_position(ctx: Context<OpenPosition>, tick_lower: i32, tick_upper: i32) -> Result<()> {
        msg!("Whirlpools: Open position from tick {} to {}", tick_lower, tick_upper);
        Ok(())
    }

    pub fn swap(ctx: Context<Swap>, amount: u64, sqrt_price_limit: u128) -> Result<()> {
        msg!("Whirlpools: Swap {} with price limit {}", amount, sqrt_price_limit);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OpenPosition<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}
