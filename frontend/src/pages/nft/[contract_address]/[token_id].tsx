import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import NFTDetailPage from '@/components/nft-detail-page'
import { Inter } from 'next/font/google'

const NFTPage = () => {
  const router = useRouter()
  const { contract_address, token_id } = router.query
  const [nft, setNft] = useState(null)

  useEffect(() => {
    if (!contract_address || !token_id) return

    const config = {
      apiKey: 'alcht_O8c5T30AkUyXtUmd2DGhuCsBQv4AKV',
      network: Network.ETH_MAINNET,
    }
    const alchemy = new Alchemy(config)

    async function fetchNFT() {
      try {
        const nftData = await alchemy.nft.getNftMetadata(
          contract_address,
          token_id
        )
        console.log(nftData)
        setNft(nftData)
      } catch (error) {
        console.error('Failed to fetch NFT:', error)
      }
    }

    fetchNFT()
  }, [contract_address, token_id])

  if (!nft) {
    return <div>Loading...</div>
  }

  return (
    <main
      className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between`}
    >
      <div className="mx-auto flex grid min-h-screen w-screen max-w-7xl rounded-lg bg-ebony-950 bg-seance-900 shadow-2xl">
        <NFTDetailPage nft={nft} />;
      </div>
    </main>
  )
}

export default NFTPage
