import React, { useEffect, useState } from 'react'
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import NFTCard from './nft-card'

const organizeNFTsByCollection = (nfts: OwnedNft[]) => {
  return nfts.reduce((acc, nft) => {
    if (nft.image && nft.image.originalUrl) {
      const collectionName = nft.collection.name
      if (!acc[collectionName]) {
        acc[collectionName] = []
      }
      acc[collectionName].push(nft)
    }
    return acc
  }, {})
}

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
        const ownerAddress = '0xFCaAAB590fC876ef9be2D00178e9C78A4Edab825' // Replace with the actual owner address
        const { ownedNfts } = await alchemy.nft.getNftsForOwner(ownerAddress)
        const filteredNfts = ownedNfts.filter(
          (nft) =>
            nft.image &&
            nft.image.originalUrl &&
            nft.image.contentType?.includes('image')
        )
        setNFTs(organizeNFTsByCollection(filteredNfts))
        console.log(filteredNfts)
      } catch (error) {
        console.error('Failed to fetch NFTs:', error)
      }
    }

    fetchNFTs()
  }, [])

  return (
    <Tabs defaultValue="all" className="w-full p-4">
      <TabsList className="mx-auto my-4 w-full bg-transparent">
        {Object.keys(nfts).map((collectionName) => (
          <TabsTrigger key={collectionName} value={collectionName}>
            {collectionName}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(nfts).map(([collectionName, collectionNFTs]) => (
        <TabsContent key={collectionName} value={collectionName}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {collectionNFTs.map((nft, index) => (
              <NFTCard key={index} nft={nft} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
    // <div className="p-4">
    //   <h2 className="mb-4 ml-4 text-2xl font-bold">NFTs in Wallet</h2>
    //   <div className="grid grid-cols-3 gap-4">
    //     {nfts.map((nft, index) => (
    //       <NFTCard key={index} nft={nft} />
    //     ))}
    //   </div>
    // </div>
  )
}
