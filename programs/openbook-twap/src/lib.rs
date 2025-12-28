use anchor_lang::prelude::*;

declare_id!("TWAP11111111111111111111111111111111111111");

#[program]
pub mod openbook_twap {
    use super::*;

    pub fn initialize_oracle(ctx: Context<InitializeOracle>) -> Result<()> {
        msg!("OpenBook TWAP: Initialize price oracle");
        Ok(())
    }

    pub fn update_price(ctx: Context<UpdatePrice>) -> Result<()> {
        msg!("OpenBook TWAP: Update TWAP price");
        Ok(())
    }

    pub fn get_price(ctx: Context<GetPrice>) -> Result<()> {
        msg!("OpenBook TWAP: Get current TWAP");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeOracle<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub updater: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetPrice<'info> {
    pub reader: Signer<'info>,
}
