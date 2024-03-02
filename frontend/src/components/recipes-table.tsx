import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { truncateAddress } from '@/utils/truncate'
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
  Icon,
} from './ui/glowing-stars'
import Link from 'next/link'
import { GET_RECIPES, processRecipes } from '../queries/GET_RECIPES'

interface Attestation {
  decodedDataJson: string
  id: string
  attester: string
  recipient: string
  expectedOutcome?: string
}

const RecipesTable = () => {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [recipes, setRecipes] = useState<Attestation[]>([])

  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: { take: itemsPerPage, skip: itemsPerPage * page },
  })

  useEffect(() => {
    if (data && data.attestations) {
      const processedRecipes = processRecipes(data.attestations)
      setRecipes(processedRecipes)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {recipes.map(({ id, attester, expectedOutcome }) => (
        <GlowingStarsBackgroundCard key={id}>
          <GlowingStarsTitle>{truncateAddress(attester)}</GlowingStarsTitle>
          <div className="flex items-end justify-between">
            <GlowingStarsDescription>{expectedOutcome}</GlowingStarsDescription>
            <Link
              href={`/recipes/${id}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]"
            >
              <Icon />
            </Link>
          </div>
        </GlowingStarsBackgroundCard>
      ))}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={page === 0}
          className="btn-primary"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default RecipesTable
