use anchor_lang::prelude::*;

declare_id!("MRKLEGrn5jzPEU8vTz65fvhp7r2YqJnVnHkKGaUPLWA");

#[program]
pub mod merkle_distributor {
    use super::*;

    pub fn new_distributor(ctx: Context<NewDistributor>, root: [u8; 32], max_total_claim: u64) -> Result<()> {
        msg!("Merkle Distributor: Create new distributor with max claim {}", max_total_claim);
        Ok(())
    }

    pub fn claim(ctx: Context<Claim>, amount: u64, proof: Vec<[u8; 32]>) -> Result<()> {
        msg!("Merkle Distributor: Claim {} tokens with {} proof nodes", amount, proof.len());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewDistributor<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(mut)]
    pub claimant: Signer<'info>,
}
