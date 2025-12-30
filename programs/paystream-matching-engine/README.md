# Paystream Matching Engine

A Solana-based P2P lending matching engine that compresses APY spread through direct lender-borrower matching.

## Overview

This program implements a **canonical Paystream-style P2P lending layer** that demonstrates how direct matching can compress the interest rate spread seen in traditional utilization-curve-based lending protocols.

### The Problem: APY Spread

In many lending protocols (Kamino, Marginfi, etc.), there's often a significant difference between:
- **Borrow APR**: What borrowers pay (~24.62% in the example)
- **Supply APY**: What lenders receive (~14.07% in the example)

This spread exists due to:
- Utilization curves (not all capital is always deployed)
- Protocol reserves and take-rates
- Incentive mismatches
- Operational overhead

### The Solution: P2P Matching

This matching engine enables:
- **Lenders** post offers with minimum acceptable APR and available capital
- **Borrowers** post requests with maximum willing APR and collateral
- **Keepers/Matchmakers** execute matches when terms align
- **Optimized Rate**: The matched rate is the **average** of lender min and borrower max
  - Example: (14.07% + 24.62%) / 2 = **19.345%** (1934 bps)
  - Both parties benefit vs traditional pools
  - Lender gets more than pool supply APY
  - Borrower pays less than pool borrow APR

## Key Features

### Core Functionality

1. **Lender Flow**
   - `create_offer`: Lock principal, set minimum rate and max duration
   - `cancel_offer`: Withdraw unlocked capital, close the offer

2. **Borrower Flow**
   - `create_request`: Lock collateral, specify max rate and duration
   - `cancel_request`: Withdraw collateral if not matched

3. **Matching Engine**
   - `match_offer_and_request`: Validates terms and creates loan at averaged rate
   - Checks: rate compatibility, duration, liquidity availability, expiry

4. **Loan Settlement**
   - `repay_loan`: Borrower repays principal + interest, unlocks collateral
   - `liquidate_loan`: Lender seizes collateral if loan exceeds due date
   - Protocol fees charged on interest (configurable basis points)

### Security Features

- PDA-based escrow for principals and collateral
- Strict term validation (rate, duration, expiry)
- Atomic collateral vault authority transfer during matching
- Integer-safe interest calculations with overflow checks
- Time-based liquidation enforcement

## Architecture

### State Accounts

- **GlobalConfig**: Admin settings, fee configuration, ID counters
- **Offer**: Lender's capital offer with terms
- **Request**: Borrower's loan request with collateral
- **Loan**: Active loan with matched terms and settlement state

### Interest Calculation

Linear interest formula:
```
interest = principal × rate_bps × elapsed_seconds / (10_000 × 31_536_000)
```

All calculations use integer math with overflow protection.

## Testing

Run the Rust test suite to verify spread compression and matching logic:

```bash
cd programs/paystream-matching-engine
cargo test
```

### Test Coverage

1. ✅ Config initialization
2. ✅ Offer and request creation with escrow
3. ✅ Successful matching with rate averaging (14.07% + 24.62% → 19.34%)
4. ✅ Loan repayment with interest and fee calculation
5. ✅ Time-based liquidation
6. ✅ Invalid match rejection (rate mismatch)
7. ✅ Spread compression calculation validation

Run with verbose output:
```bash
cargo test -- --nocapture
```

## Production Enhancements

For production deployment, consider adding:

### 1. Oracle-Based Liquidation
- Add collateral configuration with LTV ratios
- Integrate price oracles (Pyth, Switchboard)
- Allow liquidation when undercollateralized, not just time-based

### 2. Partial Fills
- Support partial matching of offers
- Split requests into multiple lots
- Track `amount_remaining` on both sides

### 3. Adapter Layer (Capital Efficiency)
- CPI integration with Kamino/Marginfi for idle capital
- Deploy unmatched funds to yield protocols
- Withdraw on-demand for matching
- "Capital never sleeps" architecture

### 4. Yield-Bearing Collateral
- Accept Kamino vault receipt tokens as collateral
- Borrower earns yield on locked collateral via receipt exchange rate
- Further reduces effective borrowing cost

### 5. Keeper Incentives
- Reward keepers for executing matches
- Priority queues for optimal matching
- MEV protection

## Program ID

```
PayStreaMMatch1111111111111111111111111111111
```

⚠️ **Note**: This is a vanity address for testing. Generate a new program ID for deployment.

## Dependencies

- Anchor Framework: ^0.32.1
- anchor-spl: ^0.32.1
- Solana Web3.js
- SPL Token

## License

MIT

## Related Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana SPL Token](https://spl.solana.com/token)
- [Anchor SPL Docs](https://docs.rs/anchor-spl/)

---

**Building the future of efficient P2P lending on Solana** 🚀
