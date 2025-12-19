"use client";

import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { SwapProgram } from "@/anchor-idl/swap_program";
import idlFile from "@/anchor-idl/swap_program.json";

export function useSwapProgram(): Program<SwapProgram> | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<SwapProgram> | null>(null);

  const idl = idlFile as Idl;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(
        idl,
        idl.metadata.address,
        provider
      );
      setProgram(programInstance as unknown as Program<SwapProgram>);
    }
  }, [wallet, connection, idl]);

  return program;
}
