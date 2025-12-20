"use client";

import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idlFile from "@/anchor-idl/swap_program.json";

export function useSwapProgram(): Program | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program | null>(null);

  const idl = idlFile as unknown as Idl;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(
        idl,
        provider
      );
      setProgram(programInstance);
    } else {
      setProgram(null);
    }
  }, [wallet, connection, idl]);

  return program;
}
