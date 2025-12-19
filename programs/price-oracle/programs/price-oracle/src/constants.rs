use anchor_lang::prelude::*;

#[constant]
pub const ORACLE_SEED: &[u8] = b"oracle";

#[constant]
pub const MIN_UPDATE_INTERVAL: i64 = 60; // 1 minute minimum between updates

#[constant]
pub const MAX_OBSERVATIONS: usize = 100;
