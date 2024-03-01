import React, { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import Image from 'next/image'
import { CardItem, CardBody, CardContainer } from './ui/3d-card'

export default function NFTGrid() {
  const [nfts, setNFTs] = useState([])

  useEffect(() => {
    const config = {
      apiKey: 'alcht_O8c5T30AkUyXtUmd2DGhuCsBQv4AKV',
      network: Network.ETH_MAINNET,
    }
    const alchemy = new Alchemy(config)

    async function fetchNFTs() {
      try {
        const ownerAddress = '0xFCaAAB590fC876ef9be2D00178e9C78A4Edab825' // Replace with the actual owner address (from thirdweb)
        const { ownedNfts } = await alchemy.nft.getNftsForOwner(ownerAddress)
        setNFTs(ownedNfts)
      } catch (error) {
        console.error('Failed to fetch NFTs:', error)
      }
    }

    fetchNFTs()
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">NFTs in Wallet</h2>
      <div className="grid grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <CardContainer className="inter-var" key={index}>
            <CardBody className="group/card relative h-auto  w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {nft.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="mt-4 w-full">
                <Image
                  src={nft.image.originalUrl}
                  height="1000"
                  width="1000"
                  className="h-80 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                  alt={nft.title || 'NFT Image'}
                />
              </CardItem>
              <div className="mt-6 flex items-center justify-between">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                >
                  View Attestations →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                >
                  Sign up
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}
