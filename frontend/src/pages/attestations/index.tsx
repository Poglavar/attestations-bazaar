import React from 'react'
import AttestationsTable from '@/components/attestations-table'

const AttestationsIndexPage = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-neutral-600 dark:text-white">
        All Attestations
      </h1>
      <AttestationsTable />
    </section>
  )
}

export default AttestationsIndexPage
