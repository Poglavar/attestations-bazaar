import { truncateAddress } from '@/utils/truncate'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"



const human_mapping: { [key: string]: string } = {
  '0xe6d493be74347a2dd3d95e783fdfa35c164dc7b6571f7c5601fa9895b6caa333':
    'Subject a lawyer',
  '0x612a71dda903b3d1f1fecd0b9aa1e3a460f1088de488d3a8524bc2ba35860ad4':
    'Subject will pay amount',
  '0xfc2ce1d850f72510512ead2aaf02add50204b36c0815e4f887255c30fd3fab7e':
    'Subject is in Toronto',
  '0x404321ab2a67608b42f546bea05f40a1f00eed239fd2060a65762637bf45aa55':
    'Subject is unencumbered',
  '0x2a8579c182fc9c021be463079da9fddca39b71b74c0a2393240c678fff22cf7b':
    'Subject is freehold',
  '0x3332c20b868cfec107e66c3a23f84a415b2a4f00eadf0db04f3c566481c3d2ef':
    'Subject is not on protected area',
}

const schemaId: string = "0xe6d493be74347a2dd3d95e783fdfa35c164dc7b6571f7c5601fa9895b6caa333";

const AttestationsSchemaCard = ({ schemaId }: { schemaId: string }) => {
  const humanMappingValue = human_mapping[schemaId]
  return (
    <Link
      href={`https://sepolia.easscan.org/schema/view/${schemaId}`}
      target="_blank"
    >
      <div className="flex flex-row items-center justify-center rounded-lg border px-4 py-6 text-left">
        <p className="w-2/3 text-white">{humanMappingValue}</p>
        <Link
          href="https://sepolia.easscan.org/attestation/attestWithSchema/0x41a4762b6d24720f43720883824687b54a3263b38b82d0ad93a0dd3d47024728"
          className={`${buttonVariants({ variant: 'outline' })} mx-2 h-10 w-1/6 py-6 text-center text-black`}
          target="_blank"
        >
          Request
          <wbr />
          Attestation
        </Link>
        <Link
          href="https://sepolia.easscan.org/attestation/attestWithSchema/0x6b837e8a2baca15566c0231e7050cd76738771d2fea0ea4e1bd94cc94a851b47"
          className={`${buttonVariants({ variant: 'destructive' })} mx-2 h-10 w-1/6 py-6 text-center text-black`}
          target="_blank"
        >
          Offer
          <wbr />
          Attestation
        </Link>
      </div>
    </Link>
  )
}

export default AttestationsSchemaCard
