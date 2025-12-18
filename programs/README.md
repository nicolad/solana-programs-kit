# Solana Programs Directory

This directory contains all deployable Solana programs for this project.

## Structure

```
programs/
├── counter-program/          # Counter dApp (deployed on devnet)
│   └── Program ID: 8PY1q5J3Aq2z7TBDLBrVjv77mYzjXSCz6iHQaFEFw9hY
│
└── transfer-sol-program/     # SOL transfer program (pending deployment)
    └── Program ID: 4fQVnLWKKKYxtxgGn7Haw8v2g2Hzbu8K61JvWKvqAi7W
```

## Quick Commands

### Build All Programs

```bash
cd programs/counter-program && anchor build
cd ../transfer-sol-program && anchor build
```

### Deploy a Program

```bash
cd programs/<program-name>
anchor deploy --provider.cluster devnet
```

### Check Deployment Status

```bash
solana program show <PROGRAM_ID>
```

## Adding New Programs

1. Clone from inspiration folder:

```bash
cp -r inspiration/<program-path> programs/<new-program-name>
```

1. Update Anchor.toml with devnet cluster:

```toml
[provider]
cluster = "devnet"
wallet = "~/.config/solana/id.json"
```

1. Build and deploy:

```bash
cd programs/<new-program-name>
anchor build
anchor deploy --provider.cluster devnet
```

## Program Status

| Program | Status | Program ID | Network |
|---------|--------|------------|---------|
| counter-program | ✅ Deployed | 8PY1q5...Fw9hY | devnet |
| transfer-sol-program | ⏳ Pending | 4fQVnL...qAi7W | devnet |

## Inspiration Folder

The `inspiration/` directory contains 95 reference implementations from the Solana ecosystem. These are not deployed but serve as learning resources and templates.

To explore: `ls -1 inspiration/`
