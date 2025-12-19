import { useEffect, useState } from "react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idlFile from "../anchor-idl/token_swap_amm.json";

export type TokenSwapProgram = any; // Type from IDL

export function useTokenSwapProgram(): Program<TokenSwapProgram> | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<TokenSwapProgram> | null>(
    null
  );

  const idl = idlFile as Idl;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(idl, provider);
      setProgram(programInstance as unknown as Program<TokenSwapProgram>);
    } else {
      setProgram(null);
    }
  }, [wallet, connection, idl]);

  return program;
}
