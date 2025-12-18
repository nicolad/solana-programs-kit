#!/bin/bash

# Transfer SOL from browser wallet back to CLI wallet
# This script shows the command to run in your terminal

echo "=========================="
echo "Transfer SOL to CLI Wallet"
echo "=========================="
echo ""
echo "Your CLI wallet needs ~1.3 SOL to deploy the transfer-sol program"
echo "Current balance: 0.028 SOL"
echo ""
echo "Option 1: Use web faucet"
echo "  1. Visit: https://faucet.solana.com"
echo "  2. Enter: $(solana address)"
echo "  3. Request 2 SOL"
echo ""
echo "Option 2: Transfer from browser wallet (if it has SOL)"
echo "  From browser: Send to $(solana address)"
echo ""
echo "After getting SOL, deploy with:"
echo "  cd /Users/vadimnicolai/Public/solana-lib/transfer-sol-program"
echo "  anchor deploy --provider.cluster devnet"
echo ""
