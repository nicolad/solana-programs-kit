use anchor_lang::prelude::*;

declare_id!("MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac");

#[program]
pub mod mango {
    use super::*;

    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        msg!("Mango: Create trading account");
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        msg!("Mango: Deposit {}", amount);
        Ok(())
    }

    pub fn place_perp_order(
        ctx: Context<PlacePerpOrder>,
        side: PerpOrderSide,
        price: i64,
        quantity: i64,
    ) -> Result<()> {
        msg!("Mango: Place {:?} perp order", side);
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub enum PerpOrderSide {
    Bid,
    Ask,
}

#[derive(Accounts)]
pub struct CreateAccount<'info> {
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
pub struct PlacePerpOrder<'info> {
    #[account(mut)]
    pub trader: Signer<'info>,
}
