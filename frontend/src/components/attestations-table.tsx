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

const GET_ATTESTATIONS = gql`
  query Attestations($take: Int!, $skip: Int!) {
    attestations(take: $take, skip: $skip, orderBy: { time: desc }) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
    }
  }
`

const AttestationsTable = () => {
  const itemsPerPage = 25
  const [page, setPage] = useState(0)

  const { loading, error, data } = useQuery(GET_ATTESTATIONS, {
    variables: { take: itemsPerPage, skip: page * itemsPerPage },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <Table className="min-w-full">
        <TableCaption>Attestations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Attester</TableHead>
            <TableHead>Recipient</TableHead>
            {/* Add other headers as needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.attestations.map(({ id, attester, recipient }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{truncateAddress(attester)}</TableCell>
              <TableCell>{truncateAddress(recipient)}</TableCell>
              {/* Add other data columns as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
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

export default AttestationsTable
