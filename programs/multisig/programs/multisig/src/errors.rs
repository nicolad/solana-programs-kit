use anchor_lang::prelude::*;

#[error_code]
pub enum MultisigError {
    #[msg("Invalid threshold")]
    InvalidThreshold,
    #[msg("Invalid number of owners")]
    InvalidOwners,
    #[msg("Not an owner")]
    NotOwner,
    #[msg("Already signed")]
    AlreadySigned,
    #[msg("Not enough signers")]
    NotEnoughSigners,
    #[msg("Already executed")]
    AlreadyExecuted,
    #[msg("Too many accounts")]
    TooManyAccounts,
    #[msg("Data too large")]
    DataTooLarge,
}
