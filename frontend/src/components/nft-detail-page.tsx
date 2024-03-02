import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@apollo/client'
import { GET_RECIPES, processRecipes } from '@/queries/GET_RECIPES'
import { truncateAddress } from '@/utils/truncate'
import AttestationsSchemaCard from './attestation-schema-card'
import AttestationsTable from './attestations-table'

function NFTDetailPage({ nft }) {
  const {
    contractAddress,
    tokenId,
    imageUrl,
    title,
    completedAttestations,
    pendingAttestations,
  } = nft

  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const recipes = processRecipes(data["attestations"])
  console.log(recipes)
    console.log(nft)


  return (
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/3">
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

        <div className="md:ml-8 md:w-2/3">
          <h2 className="mb-4 text-xl font-bold text-neutral-600 dark:text-white">
            Recipes
          </h2>
          <Tabs defaultValue="all" className="w-full p-4">
            <TabsList className="mx-auto my-4 w-full bg-transparent">
              {recipes.map(({ expectedOutcome: recipe }) => (
                <TabsTrigger key={recipe} value={recipe}>
                  {recipe}
                </TabsTrigger>
              ))}
            </TabsList>

            {recipes.map(({ expectedOutcome, schemaIds = [] }) => (
              <TabsContent
                key={expectedOutcome}
                value={expectedOutcome}
                className="space-y-4"
              >
                {schemaIds.map((schemaId: string) => (
                  <AttestationsSchemaCard key={schemaId} schemaId={schemaId} />
                ))}
              </TabsContent>
            ))}
          </Tabs>

          <h2 className="my-4 text-xl font-bold text-neutral-600 dark:text-white">
            Attestations
          </h2>
          
          <AttestationsTable recipientFilter={nft.contract.address} />
        </div>
      </div>
  )
}

export default NFTDetailPage
