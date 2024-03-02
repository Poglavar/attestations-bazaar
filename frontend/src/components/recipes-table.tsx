import React, { useState } from 'react'
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

const RecipesTable = () => {
  const [page, setPage] = useState(0)

  const { loading, error, data } = useQuery(GET_RECIPES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipes = processRecipes(data['attestations'])

  return (
    <div>
      {recipes.map(({ id, attester, expectedOutcome }) => (
        <GlowingStarsBackgroundCard key={id}>
          <GlowingStarsTitle>{truncateAddress(attester)}</GlowingStarsTitle>
          <div className="flex items-end justify-between">
            <GlowingStarsDescription>{expectedOutcome}</GlowingStarsDescription>
            <Link href={`/recipes/${id}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
                <Icon />
              </div>
            </Link>
          </div>
        </GlowingStarsBackgroundCard>
      ))}
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
