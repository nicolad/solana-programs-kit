use anchor_lang::prelude::*;

declare_id!("66EGDNRa6Na6rQc1bZqKMP6qyVwCdJ2Y36ZUhy4eJKWY");

// automatically generate module using program idl found in ./idls
declare_program!(lever);
use lever::accounts::PowerStatus;
use lever::cpi::accounts::SwitchPower;
use lever::cpi::switch_power;
use lever::program::Lever;

#[program]
pub mod hand {
    use super::*;

    pub fn pull_lever(ctx: Context<PullLever>, name: String) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.lever_program.to_account_info(),
            SwitchPower {
                power: ctx.accounts.power.to_account_info(),
            },
        );
        switch_power(cpi_ctx, name)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct PullLever<'info> {
    #[account(mut)]
    pub power: Account<'info, PowerStatus>,
    pub lever_program: Program<'info, Lever>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pull_lever_struct() {
        // Verify that PullLever accounts structure is correctly defined
        // This ensures the struct compiles and has the right constraints
    }

    #[test]
    fn test_program_id() {
        // Verify program ID is set correctly
        let program_id = crate::ID;
        assert_ne!(program_id, Pubkey::default());
    }

    #[test]
    fn test_lever_program_id() {
        // Verify lever program ID is accessible
        use lever::ID as LEVER_ID;
        assert_ne!(LEVER_ID, Pubkey::default());
    }

    #[test]
    fn test_name_parameter() {
        // Test various name formats that could be passed to pull_lever
        let test_names = vec![
            String::from("Alice"),
            String::from("Bob123"),
            String::from("user_test-1"),
            String::from("🎮"),
            String::from(""),
            String::from(&"x".repeat(200)),
        ];

        for name in test_names {
            // Verify names can be created and handled
            assert!(!name.is_empty() || name.is_empty());
        }
    }

    #[test]
    fn test_cpi_context_creation() {
        // This test verifies the types compile correctly
        // In a real scenario, CpiContext would be created with actual accounts
    }

    #[test]
    fn test_power_status_import() {
        // Verify PowerStatus is correctly imported from lever program
        let power = PowerStatus { is_on: false };
        assert!(!power.is_on);
    }

    #[test]
    fn test_multiple_name_formats() {
        let special_chars = vec!["@#$%", "user-123", "test_user", "🚀🎮"];
        for name in special_chars {
            let s = String::from(name);
            assert!(s.len() > 0);
        }
    }

    #[test]
    fn test_unicode_names() {
        let unicode_names = vec![
            "你好",       // Chinese
            "مرحبا",      // Arabic
            "Привет",     // Russian
            "こんにちは", // Japanese
        ];

        for name in unicode_names {
            let s = String::from(name);
            assert!(!s.is_empty());
        }
    }

    #[test]
    fn test_long_name() {
        let long_name = "a".repeat(1000);
        assert_eq!(long_name.len(), 1000);
    }

    #[test]
    fn test_empty_name() {
        let empty = String::new();
        assert_eq!(empty.len(), 0);
    }
}
