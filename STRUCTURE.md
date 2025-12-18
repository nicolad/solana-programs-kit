# Project Structure

```
solana-lib/
├── programs/                       # All deployable programs
│   ├── counter-program/           # Counter dApp
│   └── transfer-sol-program/      # SOL transfer program
│
├── frontend/                       # Next.js frontend
│   └── components/counter/        # UI components
│
├── inspiration/                    # 95 reference programs (not deployed)
│   ├── program-examples/
│   ├── raydium-amm/
│   ├── whirlpools/
│   └── ...
│
└── CONTRACT_GUIDE.md              # Guide to explore inspiration programs
```

## Paths Update

- **Old**: `/program/` and `/transfer-sol-program/`
- **New**: `/programs/counter-program/` and `/programs/transfer-sol-program/`

All programs are now organized in the `programs/` directory for easier management.
