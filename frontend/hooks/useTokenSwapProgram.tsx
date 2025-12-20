"use client";

import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import idlFile from "@/anchor-idl/token_swap.json";
import { TOKEN_SWAP_PROGRAM_ID } from "@/lib/token-swap-constants";

export function useTokenSwapProgram(): Program | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program | null>(null);

  const idl = idlFile as unknown as Idl;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(idl, provider);
      setProgram(programInstance);
    } else {
      setProgram(null);
    }
  }, [wallet, connection, idl]);

  return program;
}
