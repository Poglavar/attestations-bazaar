import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import NFTDetailPage from '@/components/nft-detail-page'

const NFTPage = () => {
  const router = useRouter()
  const { contract_address, token_id } = router.query
  const [nft, setNft] = useState(null)

  const recipes = useEffect(() => {
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

  return <NFTDetailPage nft={nft} />
}

export default NFTPage
