"use client";

import { PublicKey } from '@solana/web3.js'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, Text, Group, Stack, Anchor } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'

interface SwapAssetCardProps {
  name: string
  symbol: string
  uri: string
  decimals: number
  balance: number
  mint: PublicKey
  poolTokenAccount: PublicKey
}

export function SwapAssetCard(props: SwapAssetCardProps) {
  const [imagePath, setImagePath] = useState<string>('')
  const { connection } = useConnection()
  
  const nominalBalance = Math.floor(props.balance / Math.pow(10, props.decimals))

  async function getMetadataFromArweave(uri: string) {
    try {
      const data = await fetch(uri).then((data) => data.json())
      setImagePath(data.image)
    } catch (error) {
      console.error('Failed to fetch metadata:', error)
    }
  }

  useEffect(() => {
    if (props.uri) {
      getMetadataFromArweave(props.uri)
    }
  }, [props.uri])

  const explorerUrl = `https://explorer.solana.com/address/${props.mint.toBase58()}?cluster=devnet`

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group>
        {imagePath && (
          <div style={{ width: 80, height: 80, position: 'relative' }}>
            <Image
              src={imagePath}
              alt={props.name}
              fill
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        )}
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text fw={700} c="blue">
            {props.name}
          </Text>
          <Text size="xl" fw={600}>
            {nominalBalance}
          </Text>
          <Anchor href={explorerUrl} target="_blank" rel="noopener noreferrer" size="xs">
            View on Explorer →
          </Anchor>
        </Stack>
      </Group>
    </Card>
  )
}
