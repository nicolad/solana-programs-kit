use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, Mint, Token, TokenAccount, Transfer};

use crate::constants::MINIMUM_LIQUIDITY;
use crate::state::Pool;

pub fn withdraw_liquidity(ctx: Context<WithdrawLiquidity>, amount: u64) -> Result<()> {
    let authority_bump = ctx.bumps.pool_authority;
    let authority_seeds = &[
        &ctx.accounts.pool.amm.to_bytes()[..],
        &ctx.accounts.pool.mint_a.to_bytes()[..],
        &ctx.accounts.pool.mint_b.to_bytes()[..],
        b"authority".as_ref(),
        &[authority_bump],
    ];
    let signer_seeds = &[&authority_seeds[..]];

    // Transfer tokens from pool
    let amount_a = (amount as u128)
        .checked_mul(ctx.accounts.pool_account_a.amount as u128)
        .unwrap()
        .checked_div((ctx.accounts.mint_liquidity.supply + MINIMUM_LIQUIDITY) as u128)
        .unwrap() as u64;

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.pool_account_a.to_account_info(),
                to: ctx.accounts.depositor_account_a.to_account_info(),
                authority: ctx.accounts.pool_authority.to_account_info(),
            },
            signer_seeds,
        ),
        amount_a,
    )?;

    let amount_b = (amount as u128)
        .checked_mul(ctx.accounts.pool_account_b.amount as u128)
        .unwrap()
        .checked_div((ctx.accounts.mint_liquidity.supply + MINIMUM_LIQUIDITY) as u128)
        .unwrap() as u64;

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.pool_account_b.to_account_info(),
                to: ctx.accounts.depositor_account_b.to_account_info(),
                authority: ctx.accounts.pool_authority.to_account_info(),
            },
            signer_seeds,
        ),
        amount_b,
    )?;

    // Burn liquidity tokens
    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.mint_liquidity.to_account_info(),
                from: ctx.accounts.depositor_account_liquidity.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        ),
        amount,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct WithdrawLiquidity<'info> {
    #[account(
        seeds = [
            pool.amm.as_ref(),
            pool.mint_a.as_ref(),
            pool.mint_b.as_ref(),
        ],
        bump,
    )]
    pub pool: Account<'info, Pool>,

    /// CHECK: Read only authority
    #[account(
        seeds = [
            pool.amm.as_ref(),
            pool.mint_a.as_ref(),
            pool.mint_b.as_ref(),
            b"authority",
        ],
        bump,
    )]
    pub pool_authority: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [
            pool.amm.as_ref(),
            pool.mint_a.as_ref(),
            pool.mint_b.as_ref(),
            b"liquidity",
        ],
        bump,
    )]
    pub mint_liquidity: Box<Account<'info, Mint>>,

    #[account(mut)]
    pub pool_account_a: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub pool_account_b: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub depositor_account_a: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub depositor_account_b: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub depositor_account_liquidity: Box<Account<'info, TokenAccount>>,

    pub depositor: Signer<'info>,

    pub token_program: Program<'info, Token>,
}
