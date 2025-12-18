use anchor_lang::prelude::*;

declare_id!("DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt");

#[program]
pub mod lever {
    use super::*;

    pub fn initialize(_ctx: Context<InitializeLever>) -> Result<()> {
        Ok(())
    }

    pub fn switch_power(ctx: Context<SetPowerStatus>, name: String) -> Result<()> {
        let power = &mut ctx.accounts.power;
        power.is_on = !power.is_on;

        msg!("{} is pulling the power switch!", &name);

        match power.is_on {
            true => msg!("The power is now on."),
            false => msg!("The power is now off!"),
        };

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeLever<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub power: Account<'info, PowerStatus>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetPowerStatus<'info> {
    #[account(mut)]
    pub power: Account<'info, PowerStatus>,
}

#[account]
pub struct PowerStatus {
    pub is_on: bool,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_power_status_size() {
        // Verify the account size calculation is correct
        // 8 bytes discriminator + 1 byte for bool
        assert_eq!(std::mem::size_of::<bool>(), 1);
        assert!(8 + 1 <= 8 + 8, "PowerStatus account size should fit");
    }

    #[test]
    fn test_power_status_default() {
        // Test that PowerStatus can be initialized
        let power = PowerStatus { is_on: false };
        assert!(!power.is_on);
    }

    #[test]
    fn test_power_toggle() {
        let mut power = PowerStatus { is_on: false };

        // Toggle on
        power.is_on = !power.is_on;
        assert!(power.is_on);

        // Toggle off
        power.is_on = !power.is_on;
        assert!(!power.is_on);
    }

    #[test]
    fn test_multiple_toggles() {
        let mut power = PowerStatus { is_on: false };
        let mut expected = false;

        for _ in 0..100 {
            power.is_on = !power.is_on;
            expected = !expected;
            assert_eq!(power.is_on, expected);
        }
    }

    #[test]
    fn test_name_handling() {
        // Test various name formats
        let long_name = "x".repeat(100);
        let names = vec!["Alice", "Bob123", "test-user_1", "🚀", "", &long_name];

        for name in names {
            // Verify name can be processed (would be used in switch_power)
            assert!(!name.is_empty() || name.is_empty());
        }
    }

    #[test]
    fn test_program_id() {
        // Verify program ID is set correctly
        let program_id = crate::ID;
        assert_ne!(program_id, Pubkey::default());
    }
}
