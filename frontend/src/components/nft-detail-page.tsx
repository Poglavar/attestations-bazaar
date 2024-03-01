import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function NFTDetailPage({ nft }) {
  const {
    contractAddress,
    tokenId,
    imageUrl,
    title,
    completedAttestations,
    pendingAttestations,
  } = nft

  const recipes = {
    'US Real Estate': [{
        
    }]
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h1 className="mb-4 text-2xl font-bold text-neutral-600 dark:text-white">
            {nft.name}
          </h1>
          <CardContainer className="mb-10">
            <CardBody className="group/card relative h-auto w-auto ">
              <CardItem translateZ="100" className="mt-4 overflow-hidden">
                <Image
                  src={nft.image.originalUrl}
                  height="1000"
                  width="1000"
                  className="max-w-200 rounded-xl object-cover group-hover/card:shadow-xl"
                  alt={nft.title || 'NFT Image'}
                />
              </CardItem>
            </CardBody>
          </CardContainer>
          <p className="h-60 overflow-y-scroll text-justify text-sm font-light text-neutral-600 dark:text-neutral-500">
            {nft.description}
          </p>
        </div>

        <div className="md:ml-8 md:w-1/2">
          <h2 className="mb-4 text-xl font-bold text-neutral-600 dark:text-white">
            Completed Attestations
          </h2>
          <Tabs defaultValue="all" className="w-full p-4">
            <TabsList className="mx-auto my-4 w-full bg-transparent">
              {Object.keys(recipes).map((recipe) => (
                <TabsTrigger key={recipe} value={recipe}>
                  {recipe}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(recipes).map(([recipe, attestations]) => (
              <TabsContent key={recipe} value={recipe}>
                {attestations.toString()}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default NFTDetailPage
