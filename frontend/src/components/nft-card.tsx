import React from 'react'
import Image from 'next/image'
import { CardItem, CardBody, CardContainer } from './ui/3d-card'
import { truncate } from '@/utils/truncate'

const NFTCard = ({ nft }: {nft: any}) => {
  return (
    <CardContainer>
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
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
          {truncate(nft.description, 20)}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 overflow-hidden">
          <Image
            src={nft.image.originalUrl}
            height="1000"
            width="1000"
            className="max-w-200 h-60 rounded-xl object-cover group-hover/card:shadow-xl"
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
            {nft.contract.tokenType}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default NFTCard
