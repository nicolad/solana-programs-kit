"use client";

import * as anchor from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Favorites } from "@/anchor-idl/favorites-idl";
import FavoritesIdl from "@/anchor-idl/favorites.json";

interface FavoritesData {
  number: bigint;
  color: string;
  hobbies: string[];
}

export function useFavorites() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [favorites, setFavoritesData] = useState<FavoritesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProgram = () => {
    if (!wallet) {
      return new anchor.Program<Favorites>(FavoritesIdl as Favorites, {
        connection,
      });
    }
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });
    return new anchor.Program<Favorites>(FavoritesIdl as Favorites, provider);
  };

  const getFavoritesPDA = (userPublicKey: PublicKey) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), userPublicKey.toBuffer()],
      new PublicKey(FavoritesIdl.address)
    )[0];
  };

  const fetchFavorites = async () => {
    if (!publicKey) {
      console.log("No publicKey, skipping fetch");
      return;
    }

    setIsLoading(true);
    try {
      const program = getProgram();
      const favoritesPDA = getFavoritesPDA(publicKey);

      console.log("Fetching favorites for PDA:", favoritesPDA.toBase58());
      console.log("Program ID:", program.programId.toBase58());

      const account = await program.account.favorites.fetchNullable(
        favoritesPDA
      );

      console.log("Fetched account:", account);

      if (account) {
        const data = {
          number: account.number,
          color: account.color,
          hobbies: account.hobbies,
        };
        console.log("Setting favorites data:", data);
        setFavoritesData(data);
      } else {
        console.log("No favorites account found");
        setFavoritesData(null);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavoritesData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (
    number: bigint,
    color: string,
    hobbies: string[]
  ) => {
    if (!publicKey || !wallet) {
      throw new Error("Wallet not connected");
    }

    const program = getProgram();

    await program.methods
      .set_favorites(new anchor.BN(number), color, hobbies)
      .accounts({
        user: publicKey,
      })
      .rpc();

    // Refresh data
    await fetchFavorites();
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchFavorites();
    } else {
      setFavoritesData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey]);

  return {
    favorites,
    isLoading,
    connected,
    setFavorites: saveFavorites,
    refresh: fetchFavorites,
  };
}
