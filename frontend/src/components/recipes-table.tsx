import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { truncateAddress } from '@/utils/truncate'
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle, Icon } from './ui/glowing-stars'
import { id } from 'ethers/lib/utils'
import Link from 'next/link'

const GET_RECIPES = gql`
  query Recipes($take: Int!, $skip: Int!, $schemaId: String!) {
    attestations(
      take: $take
      skip: $skip
      where: { schemaId: { equals: $schemaId } }
      orderBy: { time: desc }
    ) {
      id
      attester
      recipient
      refUID
      decodedDataJson
    }
  }
`

const parseExpectedOutcome = (decodedDataJson: string) => {
  try {
    const dataObjects = JSON.parse(decodedDataJson)
    const expectedOutcomeObject = dataObjects.find(
      (obj) => obj.name === 'EXPECTED_OUTCOME'
    )
    return expectedOutcomeObject?.value?.value
  } catch (error) {
    console.error('Error parsing decodedDataJson', error)
    return 'Error parsing data'
  }
}

const RecipesTable = () => {
  const itemsPerPage = 25
  const [page, setPage] = useState(0)
  const RECIPES_SCHEMA_ID =
    '0xb8d7b7f2ea6f5e2086c5388a833175552f56c93f4e804a0e8223cfbdb07be614'

  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: {
      take: itemsPerPage,
      skip: page * itemsPerPage,
      schemaId: RECIPES_SCHEMA_ID,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data?.attestations.map(
        ({ id, attester, recipient, decodedDataJson }) => (
          <GlowingStarsBackgroundCard key={id}>
            <GlowingStarsTitle>{truncateAddress(attester)}</GlowingStarsTitle>
            <div className="flex items-end justify-between">
              <GlowingStarsDescription>
                {parseExpectedOutcome(decodedDataJson)}
              </GlowingStarsDescription>
                <Link href={`/recipes/${id}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
                  <Icon />
              </div>
                </Link>
            </div>
          </GlowingStarsBackgroundCard>
        )
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="btn-primary"
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  )
}

export default RecipesTable
