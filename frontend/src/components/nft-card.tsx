import React, { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import Image from 'next/image'

export default function NFTCard() {
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
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={nft.image.originalUrl} // Assuming 'originalUrl' is correct. Adjust based on actual data structure
              alt={nft.title || 'NFT Image'}
              className="h-auto w-full" // Responsive image
            />
            <div className="p-2">
              <p className="text-center text-sm font-medium">{nft.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
