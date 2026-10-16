import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CardItem, CardBody, CardContainer } from './ui/3d-card'
import { truncate } from '@/utils/truncate'

const NFTCard = ({ nft }) => {
  return (
    <CardContainer>
      <CardBody className="asset-card">
        <CardItem
          translateZ="50"
          className="card-title"
        >
          {nft.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="card-description"
        >
          {truncate(nft.description, 20)}
        </CardItem>
        <CardItem translateZ="100" className="card-media">
          <Image
            src={nft.image.originalUrl}
            height="1000"
            width="1000"
            className="asset-image"
            alt={nft.title || 'NFT Image'}
          />
        </CardItem>
        <div className="card-actions">
          <CardItem translateZ={20} as="div">
            <Link
              href={`/nft/${nft.contract.address}/${nft.tokenId}`}
              className="card-action"
            >
              View Attestations →
            </Link>
          </CardItem>
          <CardItem
            translateZ={20}
            as="span"
            className="status-badge"
          >
            {nft.contract.tokenType}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default NFTCard
