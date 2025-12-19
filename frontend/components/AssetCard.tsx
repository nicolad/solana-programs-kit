"use client";

import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Paper, Group, Stack, Text, Anchor } from "@mantine/core";

interface AssetCardProps {
  name: string;
  symbol: string;
  uri: string;
  decimals: number;
  balance: number;
  mint: PublicKey;
  poolTokenAccount: PublicKey;
}

export const AssetCard: FC<AssetCardProps> = (props: AssetCardProps) => {
  const [imagePath, setImagePath] = useState<string>("");

  const nominalBalance = Math.floor(
    props.balance / Math.pow(10, props.decimals)
  );

  async function getMetadataFromArweave(uri: string) {
    try {
      const data = await fetch(uri).then((data) => data.json());
      setImagePath(data.image);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  }

  useEffect(() => {
    if (props.uri) {
      getMetadataFromArweave(props.uri);
    }
  }, [props.uri]);

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Group align="flex-start">
        {imagePath && (
          <Image
            className="rounded-full"
            alt={props.name}
            src={imagePath}
            width={80}
            height={80}
          />
        )}
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text fw={700} c="blue.4">
            {props.name}
          </Text>
          <Text size="lg" fw={600}>
            {nominalBalance}
          </Text>
          <Anchor
            href={`https://explorer.solana.com/address/${props.mint.toBase58()}?cluster=devnet`}
            target="_blank"
            size="xs"
            c="dimmed"
          >
            See on Explorer →
          </Anchor>
        </Stack>
      </Group>
    </Paper>
  );
};
