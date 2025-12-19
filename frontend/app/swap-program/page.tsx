"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSwapProgram } from "@/lib/useSwapProgram";
import { getSwapAssets, SwapAsset } from "@/lib/swap-assets";
import { SwapCardComponent } from "@/components/SwapCardComponent";
import { SwapAssetCard } from "@/components/SwapAssetCard";
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import { WalletRequired } from "@/components/WalletRequired";

export default function SwapProgramPage() {
  const wallet = useWallet();
  const program = useSwapProgram();
  const [assets, setAssets] = useState<SwapAsset[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      if (program) {
        try {
          const fetchedAssets = await getSwapAssets(program);
          setAssets(fetchedAssets);
        } catch (error) {
          console.error("Failed to fetch assets:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (program) {
      fetchAssets();
    }
  }, [program]);

  if (!wallet.connected) {
    return <WalletRequired />;
  }

  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Swap Program Demo
          </Title>
          <Text c="dimmed" size="lg">
            Welcome to the port, mate! Swap tokens using the custom Anchor swap
            program.
          </Text>
        </div>

        {loading && <Text>Loading assets...</Text>}

        {!loading && assets && assets.length > 0 && (
          <>
            <Paper shadow="xs" p="xl" radius="md">
              <SwapCardComponent assets={assets} />
            </Paper>

            <div>
              <Title order={3} mb="md">
                Available Assets
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
                {assets.map((asset, i) => (
                  <SwapAssetCard
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
          </>
        )}

        {!loading && (!assets || assets.length === 0) && (
          <Text c="dimmed">
            No assets found. Make sure the swap program is deployed and
            initialized.
          </Text>
        )}
      </Stack>
    </Container>
  );
}
