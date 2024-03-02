import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@apollo/client'
import { GET_RECIPES, processRecipes } from '@/queries/GET_RECIPES'
import { truncateAddress } from '@/utils/truncate'
import AttestationsSchemaCard from './attestation-schema-card'
import AttestationsTable from './attestations-table'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'

function NFTDetailPage({ nft }: { nft: any }) {
  // This data should be replaced with actual NFT data passed as props or fetched from an API
  const {
    contractAddress,
    tokenId,
    imageUrl,
    title,
    completedAttestations,
    pendingAttestations,
  } = nft

  const { loading, error, data } = useQuery(GET_RECIPES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const recipes = processRecipes(data['attestations'])

  return (
    <div className="flex w-full flex-col md:flex-row">
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
        <Accordion
          type="single"
          collapsible
          className="w-full py-4  text-white"
        >
          {recipes.map(({ expectedOutcome: recipe, schemaIds = [] }) => (
            <AccordionItem
              value={recipe}
              key={recipe}
              className="my-4 border p-4"
            >
              <AccordionTrigger>
                <b>Outcome: </b>
                {recipe}
              </AccordionTrigger>
              <AccordionContent className="my-6 space-y-4">
                <h3 className="w-full border-b pb-2">Required Attestations:</h3>
                {schemaIds.map((schemaId: string) => (
                  <AttestationsSchemaCard key={schemaId} schemaId={schemaId} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h2 className="my-4 text-xl font-bold text-neutral-600 dark:text-white">
          Attestations
        </h2>

        <AttestationsTable
          recipientFilter={nft.contract.address}
          tokenIdFilter={nft.tokenId}
        />
      </div>
    </div>
  )
}

export default NFTDetailPage
