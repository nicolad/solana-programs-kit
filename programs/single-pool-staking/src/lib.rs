use anchor_lang::prelude::*;

declare_id!("StkPoo111111111111111111111111111111111111");

#[program]
pub mod single_pool_staking {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>, reward_rate: u64) -> Result<()> {
        msg!("Single Pool Staking: Initialize with reward rate {}", reward_rate);
        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        msg!("Single Pool Staking: Stake {}", amount);
        Ok(())
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        msg!("Single Pool Staking: Unstake {}", amount);
        Ok(())
    }

    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        msg!("Single Pool Staking: Claim rewards");
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
pub struct Stake<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}
