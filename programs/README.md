# Solana Programs

This directory contains production-ready Solana programs for DeFi applications, organized by category with mainnet and devnet program IDs.

## 📋 Quick Reference

| Category       | Programs            | Status                |
| -------------- | ------------------- | --------------------- |
| Core Solana    | 7 programs          | 📋 Reference          |
| Aggregation    | 3 routers           | 📋 Reference          |
| AMMs           | 10+ implementations | ✅ Active + Reference |
| DEX (CLOB)     | 4 implementations   | 📋 Reference          |
| DeFi Protocols | 3 protocols         | 📋 Reference          |
| Staking        | 3 implementations   | ✅ Active + Reference |
| Oracles        | 3 implementations   | ✅ Active + Reference |
| Infrastructure | 4 programs          | ✅ Active + Reference |

---

## 🧬 Core Solana Programs (Required for All DeFi)

These are mandatory building blocks for swaps, LP, and order placement:

| Program              | Program ID                                     | Directory                   | Purpose                        |
| -------------------- | ---------------------------------------------- | --------------------------- | ------------------------------ |
| **System**           | `11111111111111111111111111111111`             | `system/`                   | Create accounts / transfer SOL |
| **Token Program**    | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`  | `token/`                    | SPL tokens (classic)           |
| **Token-2022**       | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`  | `token-2022/`               | SPL tokens w/ extensions       |
| **Associated Token** | `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL` | `associated-token-account/` | Create ATAs                    |
| **Compute Budget**   | `ComputeBudget111111111111111111111111111111`  | `compute-budget/`           | Priority fees / CU limits      |
| **Address Lookup**   | `AddressLookupTab1e1111111111111111111111111`  | `address-lookup-table/`     | Versioned tx expansion         |
| **Memo**             | `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`  | `memo/`                     | Attach memos (optional)        |

---

## 🔀 Aggregation & Routing Programs

### Jupiter (Mainnet Only)

Jupiter programs are deployed on Solana mainnet only.

| Feature            | Program ID                                     |
| ------------------ | ---------------------------------------------- |
| **Swap**           | `JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4`  |
| **Referral**       | `REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3`  |
| **Limit Order v2** | `j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X`  |
| **DCA**            | `DCA265Vj8a9CEuX1eb1LWRnDT7uK6q1xMipnNyatn23M` |
| **Perpetuals**     | `PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu`  |

### Raydium Routing

- **Mainnet**: `routeUGWgWzqBWFcrCfv8tritsqukccJPu3q5GPP3xS`
- **Devnet**: `DRaybByLpbUL57LJARs3j8BitTxVfzBg351EaMr5UTCd`
- **Use Case**: Route inside Raydium pools

### Meteora Zap

- **Program**: `zapvX9M3uf5pvy4wRPAbQgdQsM1xmuiFnkfHKPvwMiz`
- **Use Case**: Helper program for complex swaps

---

## 💱 Automated Market Makers (AMM)

### Raydium (Full Suite)

| Type               | Mainnet                                        | Devnet                                         | Directory          |
| ------------------ | ---------------------------------------------- | ---------------------------------------------- | ------------------ |
| **CPMM**           | `CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C` | `DRaycpLY18LhpbydsBWbVJtxpNv9oXPgjRSfpF2bWpYb` | `raydium-cp-swap/` |
| **Legacy AMM v4**  | `675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8` | `DRaya7Kj3aMWQSy19kSjvmuwq9docCHofyP9kanQGaav` | `raydium-amm/`     |
| **Stable Swap**    | `5quBtoiQqxF9Jv6KYKctB59NT3gtJD2Y65kdnB1Uev3h` | `DRayDdXc1NZQ9C3hRWmoSf8zK4iapgMnjdNZWrfwsP8m` | `stable-swap/`     |
| **CLMM**           | `CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK` | `DRayAUgENGQBKVaX8owNhgzkEDyoHTGVEGHVJT1E9pfH` | -                  |
| **LaunchLab**      | `LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj`  | `DRay6fNdQ5J82H7xV6uq2aV3mNrUZ1J4PgSKsWgptcm6` | -                  |
| **Burn & Earn**    | `LockrWmn6K5twhz3y9w1dQERbmgSaRkfnTeTKbpofwE`  | `DRay25Usp3YJAi7beckgpGUC7mGJ2cR1AVPxhYfwVCUX` | -                  |
| **Staking**        | `EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q` | `DRayWyrLmEW5KEeqs8kdTMMaBabapqagaBC7KWpGtJeZ` | -                  |
| **Farm Staking**   | `9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z` | `DRayiCGSZgku1GTK6rXD6mVDdingXy6APAH1R6R5L2LC` | -                  |
| **Ecosystem Farm** | `FarmqiPv5eAj3j1GMdMCMUGXqPUvmquZtMy86QH6rzhG` | `DRayzbYakXs45ELHkzH6vC3fuhQqTAnv5A68gdFuvZyZ` | -                  |

**Pool Creation Fees:**

- CPMM: `3oE58BKVt8KuYkGxx8zBojugnymWmBiyafWgMrnb6eYy`
- Legacy AMM v4: `9y8ENuuZ3b19quffx9hQvRVygG5ky6snHfRvGpuSfeJy`

### Orca Whirlpools (CLMM)

- **Program**: `whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc` (Mainnet + Devnet)
- **Type**: Concentrated Liquidity (Uniswap v3 style)
- **Features**: Capital efficient, position NFTs, tick-based
- **Directory**: `whirlpools/`

### Meteora (DLMM + Dynamic Pools)

| Program                 | ID                                             | Status    |
| ----------------------- | ---------------------------------------------- | --------- |
| **DLMM**                | `LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo`  | ✅ Active |
| **DAMM v2**             | `cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG`  | ✅ Active |
| **DBC (Bonding Curve)** | `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`  | ✅ Active |
| **Presale Vault**       | `presSVxnf9UU8jMxhgSMqaRwNiT36qeBdNeTRKjTdbj`  | ✅ Active |
| **Dynamic Fee Sharing** | `dfsdo2UqvwfN8DuUVrMRNfQe11VaiNoKcMqLHVvDPzh`  | ✅ Active |
| **DAMM v1 (Legacy)**    | `Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB` | 📋 Legacy |
| **Mercurial Stable**    | `MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky`  | 📋 Legacy |

### Saber StableSwap

- **Program**: `SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ`
- **Type**: Hybrid invariant for pegged assets
- **Use Case**: Low slippage for stablecoins/pegged assets

### Other AMMs

- **Lifinity v2** (PMM): `2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c`
- **Step Finance**: `SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1`
- **Pump.fun AMM**: `pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA`
- **Pump.fun Platform**: `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P`

### Custom Implementation

- **token-swap/** - Custom CPAMM implementation (xy = k)
  - Status: ✅ Active
  - Type: Constant Product AMM
  - Program ID: `5UDwqD9Y1pvEdjjPt5onqJ4RNimWzrivQ12KXk4pC2uH`

---

## 📊 Order Book DEX (CLOB)

| DEX              | Program ID                                     | Clusters                   | Directory      |
| ---------------- | ---------------------------------------------- | -------------------------- | -------------- |
| **OpenBook v2**  | `opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb`  | Mainnet + Devnet + Testnet | `openbook-v2/` |
| **Phoenix**      | `PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY`  | Mainnet + Devnet           | `phoenix-v1/`  |
| **Manifest**     | `MNFSTqtC93rEfYHB6hF82sKdZpUDFWkViLByLd1k1Ms`  | Mainnet                    | -              |
| **Serum DEX v3** | `9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin` | Mainnet (Legacy)           | -              |

**Features:**

- Full order book with maker/taker model
- Ultra-low latency matching engines
- Batch auctions (Phoenix)
- Traditional limit/market orders

---

## 📈 Time-Weighted AMM (TWAMM)

- **openbook-twap/** - Time-weighted average price execution
  - Source: Metaplex/OpenBook
  - Type: TWAMM for gradual order execution
  - Use Case: Large orders with reduced price impact
  - Directory: `openbook-twap/`

---

## 💰 DeFi Protocols (Perps & Margin)

| Protocol              | Type                        | Directory      | Features                                |
| --------------------- | --------------------------- | -------------- | --------------------------------------- |
| **Mango v4**          | Cross-margined perps + spot | `mango-v4/`    | Leverage trading, unified liquidity     |
| **Drift Protocol v2** | Perpetual futures           | `protocol-v2/` | Virtual AMM for perps, cross-collateral |
| **MarginFi v2**       | Margin lending              | `marginfi-v2/` | Cross-margined lending, leverage        |

---

## 🔒 Staking & Rewards

| Program           | Program ID                                     | Type                         | Directory        | Status       |
| ----------------- | ---------------------------------------------- | ---------------------------- | ---------------- | ------------ |
| **Token Staking** | `TokenStaking11111111111111111111111111111111` | Custom time-locked staking   | `token-staking/` | ✅ Active    |
| **Single Pool**   | -                                              | Single token staking/rewards | `single-pool/`   | 📋 Reference |
| **Stake Pool**    | `SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy`  | Multi-validator aggregation  | `stake-pool/`    | 📋 Reference |

**Features:**

- Time-locked staking with reward distribution
- Liquid staking for validators
- Token incentive programs

---

## 🔮 Price Oracles

| Oracle                 | Mainnet                                        | Devnet                                         | Directory       | Status       |
| ---------------------- | ---------------------------------------------- | ---------------------------------------------- | --------------- | ------------ |
| **Custom TWAP Oracle** | `PriceOracle111111111111111111111111111111111` | Same                                           | `price-oracle/` | ✅ Active    |
| **Pyth Receiver**      | `rec5EKMGg6MxZYaMdyBfgwp4d5rB9T1VQH5pJv5LtFJ`  | Same                                           | -               | 📋 Reference |
| **Switchboard**        | `SBondMDrcV3K4kxZR1HNVT7osZxAHVHgYXL5Ze1oMUv`  | `Aio4gaXjXzJNVLtzwtNVmSqGKpANtXhybbkhtAC94ji2` | -               | 📋 Reference |

**Features:**

- TWAP calculation with historical data
- Pull-model price feeds (Pyth)
- Decentralized oracle networks (Switchboard)

---

## 🏗️ Infrastructure Programs

| Program                | Program ID                                      | Directory             | Status       |
| ---------------------- | ----------------------------------------------- | --------------------- | ------------ |
| **Multisig**           | `MultiSig1111111111111111111111111111111111111` | `multisig/`           | ✅ Active    |
| **Merkle Distributor** | -                                               | `merkle-distributor/` | 📋 Reference |
| **Token Vesting**      | -                                               | `token-vesting/`      | 📋 Reference |
| **Clockwork**          | -                                               | `clockwork/`          | 📋 Reference |

**Features:**

- Multi-signature wallets with threshold signatures
- Efficient token airdrops via Merkle trees
- Linear vesting schedules with cliff periods
- Automated on-chain task execution

---

## 🗺️ Frontend Route Mappings

| Category        | Route                | Program Directory   | Status       |
| --------------- | -------------------- | ------------------- | ------------ |
| **Core**        | /core/system         | system/             | 📋 Reference |
| **Core**        | /core/token          | token/, token-2022/ | 📋 Reference |
| **Aggregation** | /swap/jupiter        | - (Mainnet only)    | 📋 Reference |
| **Aggregation** | /swap/raydium-router | -                   | 📋 Reference |
| **Aggregation** | /swap/meteora-zap    | -                   | 📋 Reference |
| **AMM**         | /amm/token-swap      | token-swap/         | ✅ Active    |
| **AMM**         | /amm/raydium-cpmm    | raydium-cp-swap/    | 📋 Reference |
| **AMM**         | /amm/raydium-v4      | raydium-amm/        | 📋 Reference |
| **AMM**         | /amm/stableswap      | stable-swap/        | 📋 Reference |
| **AMM**         | /amm/whirlpools      | whirlpools/         | 📋 Reference |
| **AMM**         | /amm/meteora         | -                   | 📋 Reference |
| **DEX**         | /dex/openbook        | openbook-v2/        | 📋 Reference |
| **DEX**         | /dex/phoenix         | phoenix-v1/         | 📋 Reference |
| **TWAMM**       | /amm/twap            | openbook-twap/      | 📋 Reference |
| **DeFi**        | /defi/perps-mango    | mango-v4/           | 📋 Reference |
| **DeFi**        | /defi/perps-drift    | protocol-v2/        | 📋 Reference |
| **DeFi**        | /defi/margin         | marginfi-v2/        | 📋 Reference |
| **Staking**     | /staking/token       | token-staking/      | ✅ Active    |
| **Staking**     | /staking/pool        | single-pool/        | 📋 Reference |
| **Staking**     | /staking/validator   | stake-pool/         | 📋 Reference |
| **Oracle**      | /oracle/twap         | price-oracle/       | ✅ Active    |
| **Oracle**      | /oracle/pyth         | -                   | 📋 Reference |
| **Oracle**      | /oracle/switchboard  | -                   | 📋 Reference |
| **Infra**       | /infra/multisig      | multisig/           | ✅ Active    |
| **Infra**       | /infra/vesting       | token-vesting/      | 📋 Reference |
| **Infra**       | /infra/distributor   | merkle-distributor/ | 📋 Reference |
| **Infra**       | /infra/clockwork     | clockwork/          | 📋 Reference |

---

## 🎯 Best Devnet Demo Pack

For fastest UI development with working programs on devnet:

✅ **Core**: All Solana core programs (same IDs everywhere)
✅ **AMMs**: Raydium devnet suite, Orca Whirlpools, Meteora
✅ **DEX**: OpenBook v2, Phoenix (same IDs on devnet)
✅ **Oracles**: Pyth Receiver, Switchboard devnet
✅ **Custom**: token-swap, token-staking, price-oracle, multisig

❌ **Mainnet-only**: Jupiter programs, Pump.fun, Lifinity v2

---

## 🔧 Development Workflow

1. **Study Reference Implementations**: Review code in reference programs
2. **Build Custom Versions**: Create simplified versions for learning
3. **Test Locally**: Use Anchor tests or native Rust tests
4. **Deploy to Devnet**: Test with real network conditions
5. **Integrate Frontend**: Wire up IDL and create UI components

---

## 📦 Building Programs

### Anchor Programs

```bash
cd <program-directory>
anchor build
anchor test
```

### Native Rust Programs

```bash
cd <program-directory>
cargo build-sbf
```

---

## 📚 Resources & Documentation

### Official Documentation

- [Solana Core Programs](https://solana.com/docs/core/programs)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Program Examples](https://github.com/solana-developers/program-examples)

### Protocol Documentation

- [Raydium Addresses](https://docs.raydium.io/raydium/protocol/developers/addresses)
- [Jupiter Developers](https://dev.jup.ag/get-started)
- [Orca Whirlpools](https://dev.orca.so/)
- [Meteora Guide](https://docs.meteora.ag/developer-guide/home)
- [OpenBook v2](https://github.com/openbook-dex/openbook-v2)
- [Phoenix v1](https://github.com/Ellipsis-Labs/phoenix-v1)
- [Pyth Solana](https://docs.pyth.network/price-feeds/core/contract-addresses/solana)
- [Switchboard](https://docs.switchboard.xyz/tooling-and-resources/technical-resources-and-documentation/solana-accounts)

### Explorer Tools

- [Solana Explorer](https://explorer.solana.com/)
- [Solscan](https://solscan.io/)
- [QuickNode Program Labels](https://www.quicknode.com/docs/solana/program-id-to-label)

---

## 📊 Program Status Legend

- ✅ **Active**: Fully implemented custom programs with complete source code
- 📋 **Reference**: Clone of production programs for study/integration
- 🔧 **Legacy**: Older versions maintained for compatibility
