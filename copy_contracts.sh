#!/bin/bash

# Script to copy smart contracts from inspiration folder one by one
# Creates a programs/ directory with organized contract examples

BASE_DIR="/Users/vadimnicolai/Public/solana-lib"
INSPIRATION_DIR="$BASE_DIR/inspiration"
PROGRAMS_DIR="$BASE_DIR/programs"

# Create programs directory
mkdir -p "$PROGRAMS_DIR"

echo "Starting to copy smart contracts..."
echo "Target directory: $PROGRAMS_DIR"
echo ""

# Counter for tracking
counter=0

# Function to copy a contract
copy_contract() {
    local source="$1"
    local name="$2"
    local category="$3"
    
    counter=$((counter + 1))
    
    echo "[$counter] Copying: $name"
    echo "    From: $source"
    echo "    Category: $category"
    
    # Create category directory
    mkdir -p "$PROGRAMS_DIR/$category"
    
    # Copy the contract
    if [ -d "$source" ]; then
        cp -r "$source" "$PROGRAMS_DIR/$category/$name"
        echo "    ✓ Copied successfully"
    else
        echo "    ✗ Source not found"
    fi
    echo ""
}

# Basic Programs
echo "=== BASIC PROGRAMS ==="
copy_contract "$INSPIRATION_DIR/program-examples/basics/hello-solana" "hello-solana" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/counter" "counter" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/transfer-sol" "transfer-sol" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/create-account" "create-account" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/close-account" "close-account" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/account-data" "account-data" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/program-derived-addresses" "pda" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/cross-program-invocation" "cpi" "basics"
copy_contract "$INSPIRATION_DIR/program-examples/basics/checking-accounts" "checking-accounts" "basics"

# Token Programs
echo "=== TOKEN PROGRAMS ==="
copy_contract "$INSPIRATION_DIR/program-examples/tokens/token-program" "token-program" "tokens"
copy_contract "$INSPIRATION_DIR/program-examples/tokens/spl-token-minter" "spl-token-minter" "tokens"
copy_contract "$INSPIRATION_DIR/program-examples/tokens/transfer-tokens" "transfer-tokens" "tokens"
copy_contract "$INSPIRATION_DIR/program-examples/tokens/nft-minter" "nft-minter" "tokens"

# DeFi Programs
echo "=== DEFI PROGRAMS ==="
copy_contract "$INSPIRATION_DIR/raydium-amm" "raydium-amm" "defi"
copy_contract "$INSPIRATION_DIR/raydium-cp-swap" "raydium-cp-swap" "defi"
copy_contract "$INSPIRATION_DIR/stable-swap" "stable-swap" "defi"
copy_contract "$INSPIRATION_DIR/whirlpools" "whirlpools" "defi"

# Anchor Examples
echo "=== ANCHOR EXAMPLES ==="
copy_contract "$INSPIRATION_DIR/counter-anchor" "counter-anchor" "anchor-examples"
copy_contract "$INSPIRATION_DIR/anchor-examples" "various-examples" "anchor-examples"

# Advanced Programs
echo "=== ADVANCED PROGRAMS ==="
copy_contract "$INSPIRATION_DIR/account-compression" "account-compression" "advanced"
copy_contract "$INSPIRATION_DIR/stake-pool" "stake-pool" "advanced"
copy_contract "$INSPIRATION_DIR/merkle-distributor" "merkle-distributor" "advanced"

echo "=== SUMMARY ==="
echo "Total contracts copied: $counter"
echo "Destination: $PROGRAMS_DIR"
echo ""
echo "To explore a contract:"
echo "  cd $PROGRAMS_DIR/<category>/<name>"
echo ""
