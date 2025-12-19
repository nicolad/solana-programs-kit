"use client";

import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { TokenSwapAMM } from "@/anchor-idl/token_swap";
import idlFile from "@/anchor-idl/token_swap.json";

export function useTokenSwapProgram(): Program<TokenSwapAMM> | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<TokenSwapAMM> | null>(null);

  const idl = idlFile as Idl;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(
        idl,
        idl.metadata.address,
        provider
      );
      setProgram(programInstance as unknown as Program<TokenSwapAMM>);
    }
  }, [wallet, connection, idl]);

  return program;
}
