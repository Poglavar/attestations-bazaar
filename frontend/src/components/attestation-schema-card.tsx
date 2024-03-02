import { truncateAddress } from '@/utils/truncate'
import Link from 'next/link'
import React, { useState } from 'react'

const AttestationsSchemaCard = ({ schemaId }: { schemaId: string }) => {
  return (
    <div className="rounded-lg border px-4 py-6 text-center">
      <Link
        href={`https://sepolia.easscan.org/schema/view/${schemaId}`}
        target="_blank"
      >
        <p className="text-white">{truncateAddress(schemaId)}</p>
      </Link>
    </div>
  )
}


export default AttestationsSchemaCard
