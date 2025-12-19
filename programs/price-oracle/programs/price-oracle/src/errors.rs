use anchor_lang::prelude::*;

#[error_code]
pub enum OracleError {
    #[msg("Observation window must be greater than 0")]
    InvalidObservationWindow,
    #[msg("Not enough observations for TWAP calculation")]
    InsufficientObservations,
    #[msg("Time range exceeds available observations")]
    TimeRangeExceeded,
    #[msg("Price update too soon")]
    UpdateTooSoon,
    #[msg("Invalid price value")]
    InvalidPrice,
}
