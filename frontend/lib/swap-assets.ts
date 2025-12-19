import { Program } from '@coral-xyz/anchor'
import {
    PROGRAM_ID as METADATA_PROGRAM_ID,
    Metadata,
} from '@metaplex-foundation/mpl-token-metadata'
import { PublicKey } from '@solana/web3.js'
import {
    getAssociatedTokenAddressSync,
    getMultipleAccounts as getMultipleTokenAccounts,
} from '@solana/spl-token'

// Seed prefix for the Liquidity Pool from our program
const LIQUIDITY_POOL_SEED_PREFIX = 'liquidity_pool'

const getPoolAddress = (programId: PublicKey) =>
    PublicKey.findProgramAddressSync(
        [Buffer.from(LIQUIDITY_POOL_SEED_PREFIX)],
        programId
    )[0]

const getMetadataAddress = (mint: PublicKey) =>
    PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        METADATA_PROGRAM_ID
    )[0]

export interface SwapAsset {
    name: string
    symbol: string
    uri: string
    decimals: number
    balance: number
    mint: PublicKey
    poolTokenAccount: PublicKey
}

export const getSwapAssets = async (
    program: Program<any>
): Promise<SwapAsset[]> => {
    let assets: SwapAsset[]
    const poolAddress = getPoolAddress(program.programId)
    const pool = await program.account.liquidityPool.fetch(poolAddress)
    let metadataAddresses: PublicKey[] = []
    let tokenAccountAddresses: PublicKey[] = []
    let mintAddresses: PublicKey[] = []
    
    pool.assets.forEach((m: PublicKey) => {
        metadataAddresses.push(getMetadataAddress(m))
        tokenAccountAddresses.push(
            getAssociatedTokenAddressSync(m, poolAddress, true)
        )
        mintAddresses.push(m)
    })
    
    const poolTokenAccounts = await getMultipleTokenAccounts(
        program.provider.connection,
        tokenAccountAddresses
    )

    const metadataAccounts = (
        await program.provider.connection.getMultipleAccountsInfo(
            metadataAddresses
        )
    ).map((accountInfo) =>
        accountInfo != null ? Metadata.deserialize(accountInfo?.data) : null
    )

    const mintInfos = await Promise.all(
        mintAddresses.map((mint) =>
            program.provider.connection.getParsedAccountInfo(mint)
        )
    )

    assets = poolTokenAccounts.map((account, index) => {
        const metadataAccount = metadataAccounts.find((m) =>
            m?.[0].mint.equals(account.mint)
        )
        const [name, symbol, uri] = metadataAccount
            ? [
                  metadataAccount[0].data.name,
                  metadataAccount[0].data.symbol,
                  metadataAccount[0].data.uri,
              ]
            : ['Unknown Asset', 'UNKN', '']
        let decimals = 0
        // @ts-ignore
        if ('parsed' in mintInfos[index].value.data) {
            // @ts-ignore
            decimals = mintInfos[index].value.data.parsed.info.decimals
        }
        return {
            name,
            symbol,
            uri,
            decimals,
            balance: Number(account.amount),
            mint: account.mint,
            poolTokenAccount: account.address,
        }
    })
    return assets
}
