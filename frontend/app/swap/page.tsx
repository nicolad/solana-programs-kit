"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { SwapCard } from "@/components/SwapCard";
import { AssetCard } from "@/components/AssetCard";
import { useSwapProgram } from "@/hooks/useSwapProgram";
import { useEffect, useState } from "react";
import { Asset, getAssets } from "@/stores/useAssetsStore";
import { Container, Title, Text, Stack, SimpleGrid, Group } from "@mantine/core";
import { WalletRequired } from "@/components/WalletRequired";

export default function SwapPage() {
  const wallet = useWallet();
  const program = useSwapProgram();
  const [assets, setAssets] = useState<Asset[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      if (program) {
        try {
          setLoading(true);
          const assets = await getAssets(program);
          setAssets(assets);
        } catch (error) {
          console.error("Error fetching assets:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fn();
  }, [program]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="xs">
            Token Swap
          </Title>
          <Text c="dimmed" size="lg">
            Swap tokens using the constant product AMM
          </Text>
        </div>

        {wallet.connected && program ? (
          <>
            {assets && assets.length > 0 ? (
              <Stack gap="xl">
                <Group justify="center" align="flex-start">
                  <SwapCard assets={assets} />
                </Group>

                <div>
                  <Title order={3} mb="md">
                    Available Assets
                  </Title>
                  <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                    {assets.map((asset, i) => (
                      <AssetCard
                        key={i}
                        name={asset.name}
                        symbol={asset.symbol}
                        uri={asset.uri}
                        decimals={asset.decimals}
                        balance={asset.balance}
                        mint={asset.mint}
                        poolTokenAccount={asset.poolTokenAccount}
                      />
                    ))}
                  </SimpleGrid>
                </div>
              </Stack>
            ) : (
              <Text c="dimmed" ta="center" size="lg" mt="xl">
                {loading ? "Loading assets..." : "No assets found in the pool"}
              </Text>
            )}
          </>
        ) : (
          <WalletRequired />
        )}
      </Stack>
    </Container>
  );
}
