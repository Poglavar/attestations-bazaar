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
        'https://powerful-autumn-fog.quiknode.pro/da003dc031d0468f868c9b20391a5cbe8873f213/',
      config: {
        addOns: {
          nftTokenV2: true,
        },
      },
    })

    async function fetchNFT() {
      if (typeof contract_address !== 'string' || typeof token_id !== 'string')
        return
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
