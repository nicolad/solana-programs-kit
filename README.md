A full-stack Solana "programs + frontend" playground: Rust programs in `programs/`, CPI helpers in `CPI/`, and a TypeScript UI in `frontend/` for experimenting with token swaps and AMM integrations (incl. Raydium).

> **Status:** WIP / early-stage.  
> **Safety:** Not audited. Don't use with mainnet funds.

---

## Why this exists

Building on Solana often means stitching together:
- on-chain programs (Rust),
- CPI interfaces to external protocols,
- and a frontend that proves everything works end-to-end.

This repo aims to be a practical, composable kit that makes it easy to:
- run and iterate locally/devnet,
- swap tokens through a clean UI,
- and extend the stack by adding new programs and integrations.

---

## What's inside

- **`programs/token-swap/`**  
  A token swap program workspace (Rust) and supporting code for swap flows.
- **`CPI/`**  
  CPI helpers/interfaces for external programs (used for protocol integrations).
- **`frontend/`**  
  A TypeScript frontend that includes:
  - wallet connect
  - swap UI
  - AMM overview / integration surfaces

---

## Quick start

### Prerequisites
- Node.js + pnpm
- Rust toolchain
- Solana CLI
- (Optional) Anchor CLI — only if your programs use Anchor workflows

### Install dependencies
From the repo root:

```bash
pnpm install
```

### Run the frontend

Depending on how your workspace scripts are set up, one of these will work:

```bash
pnpm --filter frontend dev
# or
pnpm -C frontend dev
```

Open the printed local URL in your browser.

---

## Build programs

### If the program uses Anchor

```bash
anchor build
```

### If it's a native Solana program (no Anchor)

```bash
cargo build-bpf
# or (newer toolchains)
cargo build-sbf
```

> If you're not sure which applies: check for `Anchor.toml` and the program scaffolding in `programs/`.

---

## Localnet / Devnet setup notes

For integrations that depend on external programs (e.g., Raydium), you typically have two options:

1. **Use devnet directly** (fastest path for UI + integration testing).
2. **Run a local validator and clone required programs/accounts** from devnet (best for repeatable testing).

If you choose local cloning, document the required program IDs + accounts here once finalized:

* Raydium program IDs: **TODO**
* Accounts to clone: **TODO**
* Validator command: **TODO**

---

## How to extend this kit

### Add a new on-chain program

* Create a new folder under `programs/<your-program>/`
* Add build/test scripts
* Add a minimal client (TS) and wire it into the frontend

### Add a new CPI integration

* Add interfaces/helpers under `CPI/<protocol>/`
* Provide a minimal example call path + tests
* Expose the feature in the frontend behind a clear UI boundary

---

## Roadmap (good for grants + contributors)

* [ ] Document a fully reproducible localnet setup (validator + cloning + scripts)
* [ ] Add deterministic integration tests for swap flows
* [ ] Produce a small TS client SDK layer for reuse across apps
* [ ] Add "example recipes" docs (swap, pool discovery, quoting, execution)
* [ ] Publish tagged releases and changelog

---

## Contributing

PRs and issues welcome. If you plan a meaningful contribution:

* open an issue first with scope + approach
* keep changes small and reviewable
* add tests where it matters (especially around swaps and CPI calls)

---

## License

TBD (add a LICENSE file to make reuse clear).

---

### Optional (high leverage) repo polish for grants
- Add a **LICENSE** (MIT/Apache-2.0 are common for tooling).
- Add **1 screenshot or GIF** of the swap UI in the README.
- Add a **CI workflow** (lint + tests) and a badge at the top.
- Add a short **"Milestones"** section that matches your grant plan (deliverables + dates).
