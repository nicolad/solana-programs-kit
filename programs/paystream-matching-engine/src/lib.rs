use anchor_lang::prelude::*;
use anchor_spl::token::{
    self, CloseAccount, Mint, SetAuthority, Token, TokenAccount, Transfer,
};
use spl_token::instruction::AuthorityType;

declare_id!("PayStreaMMatch1111111111111111111111111111111");

const BPS_DENOM: u128 = 10_000;
const SECONDS_PER_YEAR: u128 = 31_536_000; // 365 days

#[program]
pub mod paystream_matching_engine {
    use super::*;

    // ---------------------------------------
    // Admin / config
    // ---------------------------------------
    pub fn initialize_config(ctx: Context<InitializeConfig>, protocol_fee_bps: u16) -> Result<()> {
        require!(protocol_fee_bps <= 10_000, PaystreamError::InvalidBps);

        let cfg = &mut ctx.accounts.config;
        cfg.admin = ctx.accounts.admin.key();
        cfg.loan_mint = ctx.accounts.loan_mint.key();
        cfg.fee_vault = ctx.accounts.fee_vault.key();
        cfg.protocol_fee_bps = protocol_fee_bps;
        cfg.next_offer_id = 0;
        cfg.next_request_id = 0;
        cfg.next_loan_id = 0;
        cfg.bump = ctx.bumps.config;
        cfg.fee_vault_bump = ctx.bumps.fee_vault;

        emit!(ConfigInitialized {
            admin: cfg.admin,
            loan_mint: cfg.loan_mint,
            fee_vault: cfg.fee_vault,
            protocol_fee_bps: cfg.protocol_fee_bps,
        });

        Ok(())
    }

    pub fn withdraw_fees(ctx: Context<WithdrawFees>, amount: u64) -> Result<()> {
        let cfg = &ctx.accounts.config;

        let available = ctx.accounts.fee_vault.amount;
        let to_withdraw = if amount == 0 { available } else { amount };
        require!(to_withdraw <= available, PaystreamError::InsufficientFunds);

        let signer_seeds = config_signer_seeds(cfg);
        let signer = &[&signer_seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.fee_vault.to_account_info(),
                    to: ctx.accounts.admin_receive_ata.to_account_info(),
                    authority: ctx.accounts.config.to_account_info(),
                },
                signer,
            ),
            to_withdraw,
        )?;

        Ok(())
    }

    // ---------------------------------------
    // Lender flow
    // ---------------------------------------
    pub fn create_offer(
        ctx: Context<CreateOffer>,
        offer_id: u64,
        amount: u64,
        min_rate_bps: u16,
        max_duration_seconds: u32,
        expiry_ts: i64,
    ) -> Result<()> {
        require!(amount > 0, PaystreamError::AmountZero);
        require!(min_rate_bps <= 10_000, PaystreamError::InvalidBps);

        let now = Clock::get()?.unix_timestamp;
        require!(expiry_ts > now, PaystreamError::InvalidExpiry);
        require!(max_duration_seconds > 0, PaystreamError::InvalidDuration);

        let cfg = &mut ctx.accounts.config;
        require!(offer_id == cfg.next_offer_id, PaystreamError::InvalidId);
        cfg.next_offer_id = cfg
            .next_offer_id
            .checked_add(1)
            .ok_or(PaystreamError::MathOverflow)?;

        let offer = &mut ctx.accounts.offer;
        offer.id = offer_id;
        offer.config = cfg.key();
        offer.lender = ctx.accounts.lender.key();
        offer.amount_total = amount;
        offer.amount_remaining = amount;
        offer.min_rate_bps = min_rate_bps;
        offer.max_duration_seconds = max_duration_seconds;
        offer.expiry_ts = expiry_ts;
        offer.created_ts = now;
        offer.vault = ctx.accounts.offer_vault.key();
        offer.active = true;
        offer.offer_bump = ctx.bumps.offer;
        offer.vault_bump = ctx.bumps.offer_vault;

        // Move lender principal into offer escrow.
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.lender_deposit_ata.to_account_info(),
                    to: ctx.accounts.offer_vault.to_account_info(),
                    authority: ctx.accounts.lender.to_account_info(),
                },
            ),
            amount,
        )?;

        emit!(OfferCreated {
            offer: offer.key(),
            lender: offer.lender,
            amount,
            min_rate_bps,
            max_duration_seconds,
            expiry_ts,
        });

        Ok(())
    }

    pub fn cancel_offer(ctx: Context<CancelOffer>) -> Result<()> {
        let offer = &mut ctx.accounts.offer;

        require!(offer.active, PaystreamError::OfferInactive);

        // Transfer remaining principal back to lender (if any).
        let remaining = offer.amount_remaining;

        let signer_seeds = offer_signer_seeds(offer);
        let signer = &[&signer_seeds[..]];

        if remaining > 0 {
            token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.offer_vault.to_account_info(),
                        to: ctx.accounts.lender_receive_ata.to_account_info(),
                        authority: ctx.accounts.offer.to_account_info(),
                    },
                    signer,
                ),
                remaining,
            )?;
        }

        // Close the escrow vault to return rent.
        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            CloseAccount {
                account: ctx.accounts.offer_vault.to_account_info(),
                destination: ctx.accounts.lender.to_account_info(),
                authority: ctx.accounts.offer.to_account_info(),
            },
            signer,
        ))?;

        offer.active = false;

        emit!(OfferCancelled {
            offer: offer.key(),
            lender: offer.lender,
            returned_amount: remaining,
        });

        // Offer account will be closed by Anchor due to `close = lender`.
        Ok(())
    }

    // ---------------------------------------
    // Borrower flow
    // ---------------------------------------
    pub fn create_request(
        ctx: Context<CreateRequest>,
        request_id: u64,
        amount: u64,
        max_rate_bps: u16,
        duration_seconds: u32,
        collateral_amount: u64,
        expiry_ts: i64,
    ) -> Result<()> {
        require!(amount > 0, PaystreamError::AmountZero);
        require!(collateral_amount > 0, PaystreamError::CollateralZero);
        require!(max_rate_bps <= 10_000, PaystreamError::InvalidBps);
        require!(duration_seconds > 0, PaystreamError::InvalidDuration);

        let now = Clock::get()?.unix_timestamp;
        require!(expiry_ts > now, PaystreamError::InvalidExpiry);

        let cfg = &mut ctx.accounts.config;
        require!(request_id == cfg.next_request_id, PaystreamError::InvalidId);
        cfg.next_request_id = cfg
            .next_request_id
            .checked_add(1)
            .ok_or(PaystreamError::MathOverflow)?;

        let req = &mut ctx.accounts.request;
        req.id = request_id;
        req.config = cfg.key();
        req.borrower = ctx.accounts.borrower.key();
        req.amount = amount;
        req.max_rate_bps = max_rate_bps;
        req.duration_seconds = duration_seconds;
        req.collateral_mint = ctx.accounts.collateral_mint.key();
        req.collateral_amount = collateral_amount;
        req.expiry_ts = expiry_ts;
        req.created_ts = now;
        req.collateral_vault = ctx.accounts.collateral_vault.key();
        req.active = true;
        req.request_bump = ctx.bumps.request;
        req.vault_bump = ctx.bumps.collateral_vault;

        // Lock collateral into escrow.
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.borrower_collateral_ata.to_account_info(),
                    to: ctx.accounts.collateral_vault.to_account_info(),
                    authority: ctx.accounts.borrower.to_account_info(),
                },
            ),
            collateral_amount,
        )?;

        emit!(RequestCreated {
            request: req.key(),
            borrower: req.borrower,
            amount,
            max_rate_bps,
            duration_seconds,
            collateral_mint: req.collateral_mint,
            collateral_amount,
            expiry_ts,
        });

        Ok(())
    }

    pub fn cancel_request(ctx: Context<CancelRequest>) -> Result<()> {
        let req = &mut ctx.accounts.request;
        require!(req.active, PaystreamError::RequestInactive);

        let signer_seeds = request_signer_seeds(req);
        let signer = &[&signer_seeds[..]];

        // Return collateral
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.collateral_vault.to_account_info(),
                    to: ctx.accounts.borrower_collateral_receive_ata.to_account_info(),
                    authority: ctx.accounts.request.to_account_info(),
                },
                signer,
            ),
            req.collateral_amount,
        )?;

        // Close vault (return rent)
        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            CloseAccount {
                account: ctx.accounts.collateral_vault.to_account_info(),
                destination: ctx.accounts.borrower.to_account_info(),
                authority: ctx.accounts.request.to_account_info(),
            },
            signer,
        ))?;

        req.active = false;

        emit!(RequestCancelled {
            request: req.key(),
            borrower: req.borrower,
            returned_collateral: req.collateral_amount,
        });

        // Request account closed by Anchor due to `close = borrower`.
        Ok(())
    }

    // ---------------------------------------
    // Matching engine core
    // ---------------------------------------
    pub fn match_offer_and_request(ctx: Context<MatchOfferAndRequest>, loan_id: u64) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        let cfg = &mut ctx.accounts.config;
        require!(loan_id == cfg.next_loan_id, PaystreamError::InvalidId);
        cfg.next_loan_id = cfg
            .next_loan_id
            .checked_add(1)
            .ok_or(PaystreamError::MathOverflow)?;

        let offer = &mut ctx.accounts.offer;
        let req = &mut ctx.accounts.request;

        require!(offer.active, PaystreamError::OfferInactive);
        require!(req.active, PaystreamError::RequestInactive);

        require!(offer.expiry_ts > now, PaystreamError::OfferExpired);
        require!(req.expiry_ts > now, PaystreamError::RequestExpired);

        require!(
            req.amount <= offer.amount_remaining,
            PaystreamError::InsufficientOfferLiquidity
        );

        require!(
            req.duration_seconds <= offer.max_duration_seconds,
            PaystreamError::DurationTooLong
        );

        require!(
            req.max_rate_bps >= offer.min_rate_bps,
            PaystreamError::RateMismatch
        );

        // "Optimized" matched rate: average of lender min and borrower max.
        let rate_bps_u32 = (offer.min_rate_bps as u32)
            .checked_add(req.max_rate_bps as u32)
            .ok_or(PaystreamError::MathOverflow)?;
        let matched_rate_bps: u16 = (rate_bps_u32 / 2)
            .try_into()
            .map_err(|_| PaystreamError::MathOverflow)?;

        // Transfer principal to borrower from offer vault.
        let offer_signer_seeds = offer_signer_seeds(offer);
        let offer_signer = &[&offer_signer_seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.offer_vault.to_account_info(),
                    to: ctx.accounts.borrower_receive_ata.to_account_info(),
                    authority: ctx.accounts.offer.to_account_info(),
                },
                offer_signer,
            ),
            req.amount,
        )?;

        // Move collateral vault authority from REQUEST PDA -> LOAN PDA,
        // so we can close the request account safely.
        let req_signer_seeds = request_signer_seeds(req);
        let req_signer = &[&req_signer_seeds[..]];

        token::set_authority(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                SetAuthority {
                    account_or_mint: ctx.accounts.collateral_vault.to_account_info(),
                    current_authority: ctx.accounts.request.to_account_info(),
                },
                req_signer,
            ),
            AuthorityType::AccountOwner,
            Some(ctx.accounts.loan.key()),
        )?;

        // Create loan state.
        let loan = &mut ctx.accounts.loan;
        loan.id = loan_id;
        loan.config = cfg.key();
        loan.offer = offer.key();
        loan.lender = offer.lender;
        loan.borrower = req.borrower;
        loan.principal = req.amount;
        loan.rate_bps = matched_rate_bps;
        loan.start_ts = now;
        loan.due_ts = now
            .checked_add(req.duration_seconds as i64)
            .ok_or(PaystreamError::MathOverflow)?;
        loan.loan_mint = cfg.loan_mint;
        loan.collateral_mint = req.collateral_mint;
        loan.collateral_amount = req.collateral_amount;
        loan.collateral_vault = ctx.accounts.collateral_vault.key();
        loan.status = LoanStatus::Active;
        loan.bump = ctx.bumps.loan;

        // Accounting updates
        offer.amount_remaining = offer
            .amount_remaining
            .checked_sub(req.amount)
            .ok_or(PaystreamError::MathOverflow)?;
        if offer.amount_remaining == 0 {
            offer.active = false; // no longer matchable
        }
        req.active = false; // will be closed by Anchor

        emit!(LoanCreated {
            loan: loan.key(),
            offer: offer.key(),
            request: req.key(),
            lender: loan.lender,
            borrower: loan.borrower,
            principal: loan.principal,
            rate_bps: loan.rate_bps,
            start_ts: loan.start_ts,
            due_ts: loan.due_ts,
            collateral_mint: loan.collateral_mint,
            collateral_amount: loan.collateral_amount,
        });

        Ok(())
    }

    // ---------------------------------------
    // Repay / liquidate
    // ---------------------------------------
    pub fn repay_loan(ctx: Context<RepayLoan>) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        let cfg = &ctx.accounts.config;
        let loan = &mut ctx.accounts.loan;
        require!(loan.status == LoanStatus::Active, PaystreamError::LoanNotActive);

        // Interest accrues linearly until due_ts (cap).
        let end_ts = if now > loan.due_ts { loan.due_ts } else { now };
        let interest = compute_simple_interest(loan.principal, loan.rate_bps, loan.start_ts, end_ts)?;
        let total_due = loan
            .principal
            .checked_add(interest)
            .ok_or(PaystreamError::MathOverflow)?;

        // Protocol fee is charged on INTEREST (common pattern).
        let fee = if cfg.protocol_fee_bps == 0 {
            0u64
        } else {
            ((interest as u128)
                .checked_mul(cfg.protocol_fee_bps as u128)
                .ok_or(PaystreamError::MathOverflow)?
                / BPS_DENOM) as u64
        };

        let to_lender = total_due
            .checked_sub(fee)
            .ok_or(PaystreamError::MathOverflow)?;

        // Borrower pays lender.
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.borrower_pay_ata.to_account_info(),
                    to: ctx.accounts.lender_receive_ata.to_account_info(),
                    authority: ctx.accounts.borrower.to_account_info(),
                },
            ),
            to_lender,
        )?;

        // Borrower pays protocol fee (if any).
        if fee > 0 {
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.borrower_pay_ata.to_account_info(),
                        to: ctx.accounts.fee_vault.to_account_info(),
                        authority: ctx.accounts.borrower.to_account_info(),
                    },
                ),
                fee,
            )?;
        }

        // Release collateral back to borrower.
        let loan_signer_seeds = loan_signer_seeds(loan);
        let loan_signer = &[&loan_signer_seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.collateral_vault.to_account_info(),
                    to: ctx.accounts.borrower_collateral_receive_ata.to_account_info(),
                    authority: ctx.accounts.loan.to_account_info(),
                },
                loan_signer,
            ),
            loan.collateral_amount,
        )?;

        // Close collateral vault (return rent to borrower).
        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            CloseAccount {
                account: ctx.accounts.collateral_vault.to_account_info(),
                destination: ctx.accounts.borrower.to_account_info(),
                authority: ctx.accounts.loan.to_account_info(),
            },
            loan_signer,
        ))?;

        loan.status = LoanStatus::Repaid;

        emit!(LoanRepaid {
            loan: loan.key(),
            borrower: loan.borrower,
            lender: loan.lender,
            principal: loan.principal,
            interest,
            fee,
            repaid_total: total_due,
            repaid_ts: now,
        });

        // Loan account closed by Anchor due to `close = borrower`.
        Ok(())
    }

    pub fn liquidate_loan(ctx: Context<LiquidateLoan>) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        let loan = &mut ctx.accounts.loan;
        require!(loan.status == LoanStatus::Active, PaystreamError::LoanNotActive);
        require!(now > loan.due_ts, PaystreamError::LoanNotDue);

        // Transfer collateral to lender.
        let loan_signer_seeds = loan_signer_seeds(loan);
        let loan_signer = &[&loan_signer_seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.collateral_vault.to_account_info(),
                    to: ctx.accounts.lender_collateral_receive_ata.to_account_info(),
                    authority: ctx.accounts.loan.to_account_info(),
                },
                loan_signer,
            ),
            loan.collateral_amount,
        )?;

        // Close collateral vault (rent -> lender).
        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            CloseAccount {
                account: ctx.accounts.collateral_vault.to_account_info(),
                destination: ctx.accounts.lender.to_account_info(),
                authority: ctx.accounts.loan.to_account_info(),
            },
            loan_signer,
        ))?;

        loan.status = LoanStatus::Liquidated;

        emit!(LoanLiquidated {
            loan: loan.key(),
            lender: loan.lender,
            borrower: loan.borrower,
            liquidated_ts: now,
            seized_collateral: loan.collateral_amount,
            collateral_mint: loan.collateral_mint,
        });

        // Loan closed by Anchor due to `close = lender`.
        Ok(())
    }
}

// =========================================================
// Accounts
// =========================================================

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = admin,
        space = GlobalConfig::SPACE,
        seeds = [b"config", loan_mint.key().as_ref()],
        bump
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        init,
        payer = admin,
        seeds = [b"fee_vault", config.key().as_ref()],
        bump,
        token::mint = loan_mint,
        token::authority = config
    )]
    pub fee_vault: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(offer_id: u64)]
pub struct CreateOffer<'info> {
    #[account(mut)]
    pub lender: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        init,
        payer = lender,
        space = Offer::SPACE,
        seeds = [
            b"offer",
            config.key().as_ref(),
            lender.key().as_ref(),
            &offer_id.to_le_bytes()
        ],
        bump
    )]
    pub offer: Account<'info, Offer>,

    #[account(
        init,
        payer = lender,
        seeds = [b"offer_vault", offer.key().as_ref()],
        bump,
        token::mint = loan_mint,
        token::authority = offer
    )]
    pub offer_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = lender_deposit_ata.mint == loan_mint.key(),
        constraint = lender_deposit_ata.owner == lender.key()
    )]
    pub lender_deposit_ata: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CancelOffer<'info> {
    #[account(mut)]
    pub lender: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        close = lender,
        has_one = lender,
        has_one = config,
        seeds = [
            b"offer",
            config.key().as_ref(),
            lender.key().as_ref(),
            &offer.id.to_le_bytes()
        ],
        bump = offer.offer_bump
    )]
    pub offer: Account<'info, Offer>,

    #[account(
        mut,
        seeds = [b"offer_vault", offer.key().as_ref()],
        bump = offer.vault_bump,
        constraint = offer_vault.mint == loan_mint.key(),
        constraint = offer_vault.owner == offer.key()
    )]
    pub offer_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = lender_receive_ata.mint == loan_mint.key(),
        constraint = lender_receive_ata.owner == lender.key()
    )]
    pub lender_receive_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(request_id: u64)]
pub struct CreateRequest<'info> {
    #[account(mut)]
    pub borrower: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    pub collateral_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = borrower,
        space = Request::SPACE,
        seeds = [
            b"request",
            config.key().as_ref(),
            borrower.key().as_ref(),
            &request_id.to_le_bytes()
        ],
        bump
    )]
    pub request: Account<'info, Request>,

    #[account(
        init,
        payer = borrower,
        seeds = [b"collateral_vault", request.key().as_ref()],
        bump,
        token::mint = collateral_mint,
        token::authority = request
    )]
    pub collateral_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = borrower_collateral_ata.mint == collateral_mint.key(),
        constraint = borrower_collateral_ata.owner == borrower.key()
    )]
    pub borrower_collateral_ata: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CancelRequest<'info> {
    #[account(mut)]
    pub borrower: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        close = borrower,
        has_one = borrower,
        has_one = config,
        seeds = [
            b"request",
            config.key().as_ref(),
            borrower.key().as_ref(),
            &request.id.to_le_bytes()
        ],
        bump = request.request_bump
    )]
    pub request: Account<'info, Request>,

    #[account(
        mut,
        seeds = [b"collateral_vault", request.key().as_ref()],
        bump = request.vault_bump,
        constraint = collateral_vault.owner == request.key()
    )]
    pub collateral_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = borrower_collateral_receive_ata.mint == request.collateral_mint,
        constraint = borrower_collateral_receive_ata.owner == borrower.key()
    )]
    pub borrower_collateral_receive_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(loan_id: u64)]
pub struct MatchOfferAndRequest<'info> {
    /// Pays rent for the Loan account. Typically a keeper/matchmaker.
    #[account(mut)]
    pub matcher: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        has_one = config,
        seeds = [
            b"offer",
            config.key().as_ref(),
            offer.lender.as_ref(),
            &offer.id.to_le_bytes()
        ],
        bump = offer.offer_bump
    )]
    pub offer: Account<'info, Offer>,

    #[account(
        mut,
        seeds = [b"offer_vault", offer.key().as_ref()],
        bump = offer.vault_bump,
        constraint = offer_vault.owner == offer.key(),
        constraint = offer_vault.mint == loan_mint.key()
    )]
    pub offer_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        close = borrower, // request rent refund goes to borrower
        has_one = config,
        seeds = [
            b"request",
            config.key().as_ref(),
            request.borrower.as_ref(),
            &request.id.to_le_bytes()
        ],
        bump = request.request_bump
    )]
    pub request: Account<'info, Request>,

    /// Borrower system account used only as close destination (doesn't need to sign).
    #[account(mut, address = request.borrower)]
    pub borrower: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [b"collateral_vault", request.key().as_ref()],
        bump = request.vault_bump,
        constraint = collateral_vault.owner == request.key(),
        constraint = collateral_vault.mint == request.collateral_mint
    )]
    pub collateral_vault: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = matcher,
        space = Loan::SPACE,
        seeds = [b"loan", config.key().as_ref(), &loan_id.to_le_bytes()],
        bump
    )]
    pub loan: Account<'info, Loan>,

    #[account(
        mut,
        constraint = borrower_receive_ata.mint == loan_mint.key(),
        constraint = borrower_receive_ata.owner == request.borrower
    )]
    pub borrower_receive_ata: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct RepayLoan<'info> {
    #[account(mut)]
    pub borrower: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint,
        constraint = fee_vault.key() == config.fee_vault
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        close = borrower,
        has_one = borrower,
        has_one = config,
        seeds = [b"loan", config.key().as_ref(), &loan.id.to_le_bytes()],
        bump = loan.bump
    )]
    pub loan: Account<'info, Loan>,

    #[account(
        mut,
        constraint = borrower_pay_ata.mint == loan_mint.key(),
        constraint = borrower_pay_ata.owner == borrower.key()
    )]
    pub borrower_pay_ata: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = lender_receive_ata.mint == loan_mint.key(),
        constraint = lender_receive_ata.owner == loan.lender
    )]
    pub lender_receive_ata: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"fee_vault", config.key().as_ref()],
        bump = config.fee_vault_bump
    )]
    pub fee_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = collateral_vault.key() == loan.collateral_vault,
        constraint = collateral_vault.owner == loan.key(),
        constraint = collateral_vault.mint == loan.collateral_mint
    )]
    pub collateral_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = borrower_collateral_receive_ata.mint == loan.collateral_mint,
        constraint = borrower_collateral_receive_ata.owner == borrower.key()
    )]
    pub borrower_collateral_receive_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct LiquidateLoan<'info> {
    #[account(mut)]
    pub lender: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        close = lender,
        has_one = lender,
        has_one = config,
        seeds = [b"loan", config.key().as_ref(), &loan.id.to_le_bytes()],
        bump = loan.bump
    )]
    pub loan: Account<'info, Loan>,

    #[account(
        mut,
        constraint = collateral_vault.key() == loan.collateral_vault,
        constraint = collateral_vault.owner == loan.key(),
        constraint = collateral_vault.mint == loan.collateral_mint
    )]
    pub collateral_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = lender_collateral_receive_ata.mint == loan.collateral_mint,
        constraint = lender_collateral_receive_ata.owner == lender.key()
    )]
    pub lender_collateral_receive_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct WithdrawFees<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    pub loan_mint: Account<'info, Mint>,

    #[account(
        seeds = [b"config", loan_mint.key().as_ref()],
        bump = config.bump,
        has_one = loan_mint,
        has_one = admin,
        constraint = fee_vault.key() == config.fee_vault
    )]
    pub config: Account<'info, GlobalConfig>,

    #[account(
        mut,
        seeds = [b"fee_vault", config.key().as_ref()],
        bump = config.fee_vault_bump
    )]
    pub fee_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = admin_receive_ata.mint == loan_mint.key(),
        constraint = admin_receive_ata.owner == admin.key()
    )]
    pub admin_receive_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

// =========================================================
// State
// =========================================================

#[account]
pub struct GlobalConfig {
    pub admin: Pubkey,
    pub loan_mint: Pubkey,
    pub fee_vault: Pubkey,
    pub protocol_fee_bps: u16,

    pub next_offer_id: u64,
    pub next_request_id: u64,
    pub next_loan_id: u64,

    pub bump: u8,
    pub fee_vault_bump: u8,
}

impl GlobalConfig {
    // Add padding for future upgrades.
    pub const SPACE: usize = 8  // anchor discriminator
        + 32 + 32 + 32
        + 2
        + 8 + 8 + 8
        + 1 + 1
        + 64; // padding
}

#[account]
pub struct Offer {
    pub id: u64,
    pub config: Pubkey,
    pub lender: Pubkey,

    pub amount_total: u64,
    pub amount_remaining: u64,

    pub min_rate_bps: u16,
    pub max_duration_seconds: u32,

    pub expiry_ts: i64,
    pub created_ts: i64,

    pub vault: Pubkey,
    pub active: bool,

    pub offer_bump: u8,
    pub vault_bump: u8,
}

impl Offer {
    pub const SPACE: usize = 8
        + 8
        + 32 + 32
        + 8 + 8
        + 2 + 4
        + 8 + 8
        + 32
        + 1
        + 1 + 1
        + 64; // padding
}

#[account]
pub struct Request {
    pub id: u64,
    pub config: Pubkey,
    pub borrower: Pubkey,

    pub amount: u64,
    pub max_rate_bps: u16,
    pub duration_seconds: u32,

    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
    pub collateral_vault: Pubkey,

    pub expiry_ts: i64,
    pub created_ts: i64,

    pub active: bool,
    pub request_bump: u8,
    pub vault_bump: u8,
}

impl Request {
    pub const SPACE: usize = 8
        + 8
        + 32 + 32
        + 8 + 2 + 4
        + 32 + 8 + 32
        + 8 + 8
        + 1 + 1 + 1
        + 64; // padding
}

#[account]
pub struct Loan {
    pub id: u64,
    pub config: Pubkey,
    pub offer: Pubkey,

    pub lender: Pubkey,
    pub borrower: Pubkey,

    pub principal: u64,
    pub rate_bps: u16,

    pub start_ts: i64,
    pub due_ts: i64,

    pub loan_mint: Pubkey,

    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
    pub collateral_vault: Pubkey,

    pub status: LoanStatus,
    pub bump: u8,
}

impl Loan {
    pub const SPACE: usize = 8
        + 8
        + 32 + 32
        + 32 + 32
        + 8 + 2
        + 8 + 8
        + 32
        + 32 + 8 + 32
        + 1 + 1
        + 64; // padding
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum LoanStatus {
    Active,
    Repaid,
    Liquidated,
}

// =========================================================
// Events
// =========================================================

#[event]
pub struct ConfigInitialized {
    pub admin: Pubkey,
    pub loan_mint: Pubkey,
    pub fee_vault: Pubkey,
    pub protocol_fee_bps: u16,
}

#[event]
pub struct OfferCreated {
    pub offer: Pubkey,
    pub lender: Pubkey,
    pub amount: u64,
    pub min_rate_bps: u16,
    pub max_duration_seconds: u32,
    pub expiry_ts: i64,
}

#[event]
pub struct OfferCancelled {
    pub offer: Pubkey,
    pub lender: Pubkey,
    pub returned_amount: u64,
}

#[event]
pub struct RequestCreated {
    pub request: Pubkey,
    pub borrower: Pubkey,
    pub amount: u64,
    pub max_rate_bps: u16,
    pub duration_seconds: u32,
    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
    pub expiry_ts: i64,
}

#[event]
pub struct RequestCancelled {
    pub request: Pubkey,
    pub borrower: Pubkey,
    pub returned_collateral: u64,
}

#[event]
pub struct LoanCreated {
    pub loan: Pubkey,
    pub offer: Pubkey,
    pub request: Pubkey,
    pub lender: Pubkey,
    pub borrower: Pubkey,
    pub principal: u64,
    pub rate_bps: u16,
    pub start_ts: i64,
    pub due_ts: i64,
    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
}

#[event]
pub struct LoanRepaid {
    pub loan: Pubkey,
    pub borrower: Pubkey,
    pub lender: Pubkey,
    pub principal: u64,
    pub interest: u64,
    pub fee: u64,
    pub repaid_total: u64,
    pub repaid_ts: i64,
}

#[event]
pub struct LoanLiquidated {
    pub loan: Pubkey,
    pub lender: Pubkey,
    pub borrower: Pubkey,
    pub liquidated_ts: i64,
    pub seized_collateral: u64,
    pub collateral_mint: Pubkey,
}

// =========================================================
// Errors
// =========================================================

#[error_code]
pub enum PaystreamError {
    #[msg("Invalid basis points value.")]
    InvalidBps,
    #[msg("Invalid id (must equal next id).")]
    InvalidId,
    #[msg("Invalid expiry timestamp.")]
    InvalidExpiry,
    #[msg("Offer is expired.")]
    OfferExpired,
    #[msg("Request is expired.")]
    RequestExpired,
    #[msg("Offer is inactive.")]
    OfferInactive,
    #[msg("Request is inactive.")]
    RequestInactive,
    #[msg("Amount must be > 0.")]
    AmountZero,
    #[msg("Collateral must be > 0.")]
    CollateralZero,
    #[msg("Invalid duration.")]
    InvalidDuration,
    #[msg("Insufficient offer liquidity.")]
    InsufficientOfferLiquidity,
    #[msg("Borrower max rate is below lender min rate.")]
    RateMismatch,
    #[msg("Request duration exceeds offer maximum.")]
    DurationTooLong,
    #[msg("Math overflow.")]
    MathOverflow,
    #[msg("Loan is not active.")]
    LoanNotActive,
    #[msg("Loan is not due yet.")]
    LoanNotDue,
    #[msg("Insufficient funds.")]
    InsufficientFunds,
}

// =========================================================
// Helpers
// =========================================================

fn compute_simple_interest(
    principal: u64,
    rate_bps: u16,
    start_ts: i64,
    end_ts: i64,
) -> Result<u64> {
    require!(end_ts >= start_ts, PaystreamError::MathOverflow);

    let elapsed: u128 = (end_ts - start_ts) as u128;

    let num: u128 = (principal as u128)
        .checked_mul(rate_bps as u128)
        .ok_or(PaystreamError::MathOverflow)?
        .checked_mul(elapsed)
        .ok_or(PaystreamError::MathOverflow)?;

    let denom: u128 = BPS_DENOM
        .checked_mul(SECONDS_PER_YEAR)
        .ok_or(PaystreamError::MathOverflow)?;

    let interest: u128 = num / denom;
    Ok(interest as u64)
}

fn config_signer_seeds(cfg: &GlobalConfig) -> [Vec<u8>; 2] {
    // return as owned buffers so we can safely create references
    let mint_bytes = cfg.loan_mint.to_bytes().to_vec();
    [b"config".to_vec(), mint_bytes]
}

fn offer_signer_seeds(offer: &Offer) -> Vec<Vec<u8>> {
    vec![
        b"offer".to_vec(),
        offer.config.to_bytes().to_vec(),
        offer.lender.to_bytes().to_vec(),
        offer.id.to_le_bytes().to_vec(),
        vec![offer.offer_bump],
    ]
}

fn request_signer_seeds(req: &Request) -> Vec<Vec<u8>> {
    vec![
        b"request".to_vec(),
        req.config.to_bytes().to_vec(),
        req.borrower.to_bytes().to_vec(),
        req.id.to_le_bytes().to_vec(),
        vec![req.request_bump],
    ]
}

fn loan_signer_seeds(loan: &Loan) -> Vec<Vec<u8>> {
    vec![
        b"loan".to_vec(),
        loan.config.to_bytes().to_vec(),
        loan.id.to_le_bytes().to_vec(),
        vec![loan.bump],
    ]
}
