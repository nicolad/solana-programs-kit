import type { Program } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import type { Hand } from '../target/types/hand';
import type { Lever } from '../target/types/lever';
import { assert } from 'chai';

describe('Cross-Program Invocation Tests', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const hand = anchor.workspace.Hand as Program<Hand>;
  const lever = anchor.workspace.Lever as Program<Lever>;

  // Generate a new keypair for the power account
  const powerAccount = new anchor.web3.Keypair();
  const secondPowerAccount = new anchor.web3.Keypair();

  describe('Lever Program Direct Tests', () => {
    it('Should initialize the lever program', async () => {
      await lever.methods
        .initialize()
        .accounts({
          power: powerAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .signers([powerAccount])
        .rpc();

      // Verify the account was created
      const powerStatus = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(powerStatus.isOn, false, 'Power should be off initially');
    });

    it('Should switch power on directly', async () => {
      await lever.methods
        .switchPower('DirectUser')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const powerStatus = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(powerStatus.isOn, true, 'Power should be on after switch');
    });

    it('Should switch power off directly', async () => {
      await lever.methods
        .switchPower('DirectUser')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const powerStatus = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(powerStatus.isOn, false, 'Power should be off after switch');
    });
  });

  describe('CPI Tests - Hand calls Lever', () => {
    it('Should pull the lever via CPI and turn power on', async () => {
      const powerStatusBefore = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );

      await hand.methods
        .pullLever('Chris')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const powerStatusAfter = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(
        powerStatusAfter.isOn,
        !powerStatusBefore.isOn,
        'Power state should toggle'
      );
    });

    it('Should pull the lever via CPI multiple times', async () => {
      const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

      for (const name of names) {
        const powerStatusBefore = await lever.account.powerStatus.fetch(
          powerAccount.publicKey
        );

        await hand.methods
          .pullLever(name)
          .accounts({
            power: powerAccount.publicKey,
          })
          .rpc();

        const powerStatusAfter = await lever.account.powerStatus.fetch(
          powerAccount.publicKey
        );
        assert.equal(
          powerStatusAfter.isOn,
          !powerStatusBefore.isOn,
          `Power should toggle after ${name} pulls lever`
        );
      }
    });

    it('Should handle long names via CPI', async () => {
      const longName = 'A'.repeat(50);
      await hand.methods
        .pullLever(longName)
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const powerStatus = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.isBoolean(powerStatus.isOn);
    });

    it('Should handle empty name via CPI', async () => {
      await hand.methods
        .pullLever('')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const powerStatus = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.isBoolean(powerStatus.isOn);
    });

    it('Should handle special characters in name via CPI', async () => {
      const specialNames = ['🚀', '你好', 'مرحبا', 'Test-123_!@#'];

      for (const name of specialNames) {
        await hand.methods
          .pullLever(name)
          .accounts({
            power: powerAccount.publicKey,
          })
          .rpc();

        const powerStatus = await lever.account.powerStatus.fetch(
          powerAccount.publicKey
        );
        assert.isBoolean(powerStatus.isOn);
      }
    });
  });

  describe('Multiple Power Accounts Tests', () => {
    it('Should initialize second power account', async () => {
      await lever.methods
        .initialize()
        .accounts({
          power: secondPowerAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .signers([secondPowerAccount])
        .rpc();

      const powerStatus = await lever.account.powerStatus.fetch(
        secondPowerAccount.publicKey
      );
      assert.equal(powerStatus.isOn, false);
    });

    it('Should independently toggle multiple power accounts', async () => {
      // Toggle first account
      await hand.methods
        .pullLever('User1')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const power1Status = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      const power2StatusBefore = await lever.account.powerStatus.fetch(
        secondPowerAccount.publicKey
      );

      // Toggle second account
      await hand.methods
        .pullLever('User2')
        .accounts({
          power: secondPowerAccount.publicKey,
        })
        .rpc();

      const power2StatusAfter = await lever.account.powerStatus.fetch(
        secondPowerAccount.publicKey
      );

      // Verify first account state didn't change
      const power1StatusFinal = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(
        power1Status.isOn,
        power1StatusFinal.isOn,
        'First account should not change'
      );

      // Verify second account toggled
      assert.equal(
        power2StatusAfter.isOn,
        !power2StatusBefore.isOn,
        'Second account should toggle'
      );
    });

    it('Should rapidly toggle between accounts', async () => {
      const iterations = 10;
      for (let i = 0; i < iterations; i++) {
        const account = i % 2 === 0 ? powerAccount : secondPowerAccount;
        await hand.methods
          .pullLever(`User${i}`)
          .accounts({
            power: account.publicKey,
          })
          .rpc();
      }

      const power1 = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      const power2 = await lever.account.powerStatus.fetch(
        secondPowerAccount.publicKey
      );

      assert.isBoolean(power1.isOn);
      assert.isBoolean(power2.isOn);
    });
  });

  describe('Error Handling Tests', () => {
    it('Should fail with invalid power account', async () => {
      const fakePowerAccount = new anchor.web3.Keypair();

      try {
        await hand.methods
          .pullLever('FailTest')
          .accounts({
            power: fakePowerAccount.publicKey,
          })
          .rpc();
        assert.fail('Should have thrown error');
      } catch (error) {
        assert.include(error.toString(), 'Account does not exist');
      }
    });

    it('Should fail when trying to initialize same account twice', async () => {
      try {
        await lever.methods
          .initialize()
          .accounts({
            power: powerAccount.publicKey,
            user: provider.wallet.publicKey,
          })
          .signers([powerAccount])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (error) {
        assert.isDefined(error);
      }
    });
  });

  describe('State Consistency Tests', () => {
    it('Should maintain consistent state across CPI and direct calls', async () => {
      // Get initial state
      const initialState = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );

      // Call via CPI
      await hand.methods
        .pullLever('CPIUser')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const afterCPI = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(afterCPI.isOn, !initialState.isOn);

      // Call directly
      await lever.methods
        .switchPower('DirectUser')
        .accounts({
          power: powerAccount.publicKey,
        })
        .rpc();

      const afterDirect = await lever.account.powerStatus.fetch(
        powerAccount.publicKey
      );
      assert.equal(afterDirect.isOn, initialState.isOn);
    });

    it('Should verify state transitions', async () => {
      const transitions = [
        { name: 'First', expectedToggle: true },
        { name: 'Second', expectedToggle: true },
        { name: 'Third', expectedToggle: true },
        { name: 'Fourth', expectedToggle: true },
      ];

      for (const transition of transitions) {
        const before = await lever.account.powerStatus.fetch(
          powerAccount.publicKey
        );

        await hand.methods
          .pullLever(transition.name)
          .accounts({
            power: powerAccount.publicKey,
          })
          .rpc();

        const after = await lever.account.powerStatus.fetch(
          powerAccount.publicKey
        );

        assert.equal(
          after.isOn,
          !before.isOn,
          `State should toggle for ${transition.name}`
        );
      }
    });
  });

  describe('Performance Tests', () => {
    it('Should handle rapid sequential CPI calls', async () => {
      const startTime = Date.now();
      const numCalls = 5;

      for (let i = 0; i < numCalls; i++) {
        await hand.methods
          .pullLever(`Speed${i}`)
          .accounts({
            power: powerAccount.publicKey,
          })
          .rpc();
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`      ${numCalls} CPI calls completed in ${duration}ms`);
      assert.isBelow(duration, 30000, 'Should complete within 30 seconds');
    });
  });
});
