import React from 'react'
import RecipesTable from '@/components/recipes-table'

const RecipesIndexPage = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-neutral-600 dark:text-white">
        All Recipes
      </h1>
      <RecipesTable />
    </section>
  )
}

export default RecipesIndexPage
