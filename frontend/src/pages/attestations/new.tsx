// import React from 'react'
// import {
//   EAS,
//   Offchain,
//   SchemaEncoder,
//   SchemaRegistry,
// } from '@ethereum-attestation-service/eas-sdk'
// import { ethers } from 'ethers'

// export const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia v0.26
// // Initialize the sdk with the address of the EAS Schema contract address
// const eas = new EAS(EASContractAddress)

// // Gets a default provider (in production use something else like infura/alchemy)
// const provider = ethers.providers.getDefaultProvider('sepolia')

// // Connects an ethers style provider/signingProvider to perform read/write functions.
// // MUST be a signer to do write operations!
// eas.connect(provider)

// const AttestationsNewPage = () => {
//   return (
//     <section>
//       <h1 className="mb-4 text-2xl font-bold text-neutral-600 dark:text-white">
//         New Attestations
//       </h1>
//     </section>
//   )
// }

// export default AttestationsNewPage
