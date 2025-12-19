use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};

use crate::constants::MINIMUM_LIQUIDITY;
use crate::errors::TutorialError;
use crate::state::Pool;

pub fn deposit_liquidity(
    ctx: Context<DepositLiquidity>,
    amount_a: u64,
    amount_b: u64,
) -> Result<()> {
    let mut amount_a = amount_a;
    let mut amount_b = amount_b;

    // Make sure deposit doesnt exceed user's token balance
    if ctx.accounts.depositor_account_a.amount < amount_a {
        amount_a = ctx.accounts.depositor_account_a.amount;
    }
    if ctx.accounts.depositor_account_b.amount < amount_b {
        amount_b = ctx.accounts.depositor_account_b.amount;
    }

    // Proportion tokens to deposit
    let pool_a = &ctx.accounts.pool_account_a;
    let pool_b = &ctx.accounts.pool_account_b;

    let (amount_a, amount_b) = if pool_a.amount == 0 && pool_b.amount == 0 {
        (amount_a, amount_b)
    } else {
        let ratio_a = amount_a as u128 * pool_b.amount as u128 / pool_a.amount as u128;
        let ratio_b = amount_b as u128 * pool_a.amount as u128 / pool_b.amount as u128;

        if ratio_a < amount_b as u128 {
            (amount_a, ratio_a as u64)
        } else {
            (ratio_b as u64, amount_b)
        }
    };

    // Calculate the amount of liquidity about to be deposited
    let liquidity = if ctx.accounts.mint_liquidity.supply == 0 {
        // Calculate square root using fixed-point arithmetic
        let product = (amount_a as u128).checked_mul(amount_b as u128).unwrap();
        (product as f64).sqrt() as u64
    } else {
        let liquidity_a =
            amount_a as u128 * ctx.accounts.mint_liquidity.supply as u128 / pool_a.amount as u128;
        let liquidity_b =
            amount_b as u128 * ctx.accounts.mint_liquidity.supply as u128 / pool_b.amount as u128;
        std::cmp::min(liquidity_a, liquidity_b) as u64
    };

    // Lock initial liquidity if this is the first deposit
    let liquidity = if ctx.accounts.mint_liquidity.supply == 0 {
        require!(liquidity > MINIMUM_LIQUIDITY, TutorialError::OutputTooSmall);
        liquidity - MINIMUM_LIQUIDITY
    } else {
        liquidity
    };

    // Transfer tokens to pool
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account_a.to_account_info(),
                to: ctx.accounts.pool_account_a.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        ),
        amount_a,
    )?;

    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account_b.to_account_info(),
                to: ctx.accounts.pool_account_b.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        ),
        amount_b,
    )?;

    // Mint liquidity tokens to user
    let authority_bump = ctx.bumps.pool_authority;
    let authority_seeds = &[
        &ctx.accounts.pool.amm.to_bytes()[..],
        &ctx.accounts.pool.mint_a.to_bytes()[..],
        &ctx.accounts.pool.mint_b.to_bytes()[..],
        b"authority".as_ref(),
        &[authority_bump],
    ];
    let signer_seeds = &[&authority_seeds[..]];

    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint_liquidity.to_account_info(),
                to: ctx.accounts.depositor_account_liquidity.to_account_info(),
                authority: ctx.accounts.pool_authority.to_account_info(),
            },
            signer_seeds,
        ),
        liquidity,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct DepositLiquidity<'info> {
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
