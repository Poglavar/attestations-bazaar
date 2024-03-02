import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NFTDetailPage from '@/components/nft-detail-page'
import { Core } from '@quicknode/sdk'

const NFTPage = () => {
  const router = useRouter()
  const { contract_address, token_id } = router.query
  const [nft, setNft] = useState<any>(null)

  useEffect(() => {
    if (!contract_address || !token_id) return

    const core = new Core({
      endpointUrl:
        'https://blissful-floral-borough.quiknode.pro/c03e6f34faadc15ae0e7d069b62b248e28e23257/',
      config: {
        addOns: {
          nftTokenV2: true,
        },
      },
    })

    async function fetchNFT() {
      if (typeof contract_address !== 'string' || typeof token_id !== 'string') return;
      try {
        const response = await core.client.qn_fetchNFTsByCollection({
          collection: contract_address,
          tokens: [token_id],
        })
        if (response.tokens && response.tokens.length > 0) {
          setNft(response.tokens[0]) 
        }
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
