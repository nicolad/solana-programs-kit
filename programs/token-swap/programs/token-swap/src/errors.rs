use anchor_lang::prelude::*;

#[error_code]
pub enum TutorialError {
    #[msg("Invalid fee value")]
    InvalidFee,
    #[msg("Output is too small")]
    OutputTooSmall,
    #[msg("Invariant does not hold")]
    InvariantViolated,
}
