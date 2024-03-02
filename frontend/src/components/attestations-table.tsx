import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { truncateAddress } from '@/utils/truncate'
import Link from 'next/link'
import { extractDataByKey } from '@/utils/graphql'

interface Attestation {
  decodedDataJson: string
  id: string
  attester: string
  recipient: string
  expectedOutcome: string
}

const GET_ATTESTATIONS = gql`
  query Attestations($take: Int!, $skip: Int!, $recipient: String) {
    attestations(
      take: $take
      skip: $skip
      where: { recipient: { equals: $recipient } }
      orderBy: { time: desc }
    ) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
      decodedDataJson
    }
  }
`

const AttestationsTable = ({
  recipientFilter,
  tokenIdFilter,
}: {
  recipientFilter?: string
  tokenIdFilter?: string
}) => {
  const itemsPerPage = 25
  const [page, setPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])

  const { loading, error, data } = useQuery(GET_ATTESTATIONS, {
    variables: {
      take: itemsPerPage,
      skip: page * itemsPerPage,
      ...(recipientFilter && {
        recipient: '0x5cbeb7A0df7Ed85D82a472FD56d81ed550f3Ea95',
      }),
    },
  })

  useEffect(() => {
    if (data && data.attestations && tokenIdFilter) {
      const filtered = data.attestations.filter((attestation: Attestation) => {
        const tokenId = extractDataByKey(
          JSON.parse(attestation.decodedDataJson),
          'TARGET_ID'
        )
        return tokenId === tokenIdFilter
      })
      setFilteredData(filtered)
    } else if (data && data.attestations) {
      setFilteredData(data.attestations)
    }
  }, [data, tokenIdFilter])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Attester</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Reputation</TableHead>
            {/* Add other headers as needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map(({ id, attester, recipient }: Attestation) => (
            <TableRow key={id}>
              <TableCell>
                <Link
                  href={`https://sepolia.easscan.org/attestation/view/${id}`}
                  target="_blank"
                >
                  {truncateAddress(id)}
                </Link>
              </TableCell>
              <TableCell>{truncateAddress(attester)}</TableCell>
              <TableCell>{truncateAddress(recipient)}</TableCell>
              <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
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
