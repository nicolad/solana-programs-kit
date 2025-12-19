use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::errors::TutorialError;
use crate::state::{Amm, Pool};

pub fn swap_exact_tokens_for_tokens(
    ctx: Context<SwapExactTokensForTokens>,
    swap_a: bool,
    input_amount: u64,
    min_output_amount: u64,
) -> Result<()> {
    // Prevent depositing assets the depositor does not own
    let input = if swap_a {
        input_amount.min(ctx.accounts.trader_account_a.amount)
    } else {
        input_amount.min(ctx.accounts.trader_account_b.amount)
    };

    // Apply trading fee, used to compute the output
    let taxed_input = input - input * ctx.accounts.amm.fee as u64 / 10000;

    let pool_a = &ctx.accounts.pool_account_a;
    let pool_b = &ctx.accounts.pool_account_b;

    let output = if swap_a {
        taxed_input
            .checked_mul(pool_b.amount)
            .unwrap()
            .checked_div(pool_a.amount.checked_add(taxed_input).unwrap())
            .unwrap()
    } else {
        taxed_input
            .checked_mul(pool_a.amount)
            .unwrap()
            .checked_div(pool_b.amount.checked_add(taxed_input).unwrap())
            .unwrap()
    };

    require!(output >= min_output_amount, TutorialError::OutputTooSmall);

    // Compute the invariant before the trade
    let invariant = pool_a.amount.checked_mul(pool_b.amount).unwrap();

    // Transfer tokens to the pool
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: if swap_a {
                    ctx.accounts.trader_account_a.to_account_info()
                } else {
                    ctx.accounts.trader_account_b.to_account_info()
                },
                to: if swap_a {
                    ctx.accounts.pool_account_a.to_account_info()
                } else {
                    ctx.accounts.pool_account_b.to_account_info()
                },
                authority: ctx.accounts.trader.to_account_info(),
            },
        ),
        input,
    )?;

    // Transfer tokens from the pool
    let authority_bump = ctx.bumps.pool_authority;
    let authority_seeds = &[
        &ctx.accounts.pool.amm.to_bytes()[..],
        &ctx.accounts.pool.mint_a.to_bytes()[..],
        &ctx.accounts.pool.mint_b.to_bytes()[..],
        b"authority".as_ref(),
        &[authority_bump],
    ];
    let signer_seeds = &[&authority_seeds[..]];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: if swap_a {
                    ctx.accounts.pool_account_b.to_account_info()
                } else {
                    ctx.accounts.pool_account_a.to_account_info()
                },
                to: if swap_a {
                    ctx.accounts.trader_account_b.to_account_info()
                } else {
                    ctx.accounts.trader_account_a.to_account_info()
                },
                authority: ctx.accounts.pool_authority.to_account_info(),
            },
            signer_seeds,
        ),
        output,
    )?;

    msg!(
        "Traded {} tokens (with a fee of {}) for {} tokens",
        input,
        input - taxed_input,
        output
    );

    // Check the invariant still holds
    // Reload accounts because of the CPIs
    ctx.accounts.pool_account_a.reload()?;
    ctx.accounts.pool_account_b.reload()?;

    let new_invariant = ctx
        .accounts
        .pool_account_a
        .amount
        .checked_mul(ctx.accounts.pool_account_b.amount)
        .unwrap();
    require!(new_invariant >= invariant, TutorialError::InvariantViolated);

    Ok(())
}

#[derive(Accounts)]
pub struct SwapExactTokensForTokens<'info> {
    #[account(
        seeds = [
            b"amm".as_ref(),
            amm.id.as_ref(),
        ],
        bump,
    )]
    pub amm: Account<'info, Amm>,

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

    #[account(mut)]
    pub trader_account_a: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub trader_account_b: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub pool_account_a: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub pool_account_b: Box<Account<'info, TokenAccount>>,

    pub trader: Signer<'info>,

    pub token_program: Program<'info, Token>,
}
