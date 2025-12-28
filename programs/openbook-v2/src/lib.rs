use anchor_lang::prelude::*;

declare_id!("opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb");

#[program]
pub mod openbook_v2 {
    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>) -> Result<()> {
        msg!("OpenBook v2: Create market");
        Ok(())
    }

    pub fn place_order(
        ctx: Context<PlaceOrder>,
        side: Side,
        price_lots: i64,
        max_base_lots: i64,
    ) -> Result<()> {
        msg!("OpenBook v2: Place {:?} order", side);
        Ok(())
    }

    pub fn cancel_order(ctx: Context<CancelOrder>, order_id: u128) -> Result<()> {
        msg!("OpenBook v2: Cancel order {}", order_id);
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub enum Side {
    Bid,
    Ask,
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceOrder<'info> {
    #[account(mut)]
    pub trader: Signer<'info>,
}

#[derive(Accounts)]
pub struct CancelOrder<'info> {
    #[account(mut)]
    pub trader: Signer<'info>,
}
