# Smart Contract Analysis Guide

This guide helps you explore the 95+ Solana smart contracts in the inspiration folder.

## Categories

### 1. **Basic Programs** (Learn First)

- `hello-solana` - Simplest program
- `counter` - State management
- `transfer-sol` - SOL transfers
- `create-account` - Account creation
- `pda` - Program Derived Addresses
- `cpi` - Cross-program invocations

### 2. **Token Programs**

- `token` - SPL Token standard
- `token-2022` - Token Extensions
- `token-metadata` - NFT metadata
- `associated-token-account` - ATA pattern

### 3. **DeFi Protocols**

- `raydium-amm` - Automated Market Maker
- `whirlpools` - Concentrated liquidity (Orca)
- `stable-swap` - Stablecoin swaps
- `openbook-v2` - Order book DEX

### 4. **NFT/Metaplex**

- `mpl-token-metadata` - NFT standard
- `mpl-core` - Core NFT program
- `mpl-candy-machine` - NFT minting
- `mpl-bubblegum` - Compressed NFTs

### 5. **Staking & Governance**

- `stake-pool` - Liquid staking
- `liquid-staking-program` - Marinade
- `modular-governance` - Helium governance
- `v4` - Squads multisig

### 6. **Advanced**

- `account-compression` - State compression
- `merkle-distributor` - Token airdrops
- `clockwork` - Automation
- `protocol-v2` - Drift perpetuals

## Quick Commands

```bash
# List all contracts
ls -1 /Users/vadimnicolai/Public/solana-lib/inspiration/

# Explore a specific contract
cd /Users/vadimnicolai/Public/solana-lib/inspiration/<CONTRACT_NAME>

# Find program files
find . -name "lib.rs" -o -name "processor.rs"

# Search for specific patterns
grep -r "pub fn" --include="*.rs" | head -20
```

## Next Steps

1. **Start Simple**: Begin with `program-examples/basics/`
2. **Study Patterns**: Look at `anchor-examples/` for Anchor framework
3. **Build DeFi**: Explore `raydium-amm` or `whirlpools`
4. **Advanced**: Check `account-compression` or `clockwork`

Would you like me to:

- Analyze a specific contract?
- Extract key functions from a program?
- Create a comparison between contracts?
