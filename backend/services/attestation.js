import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { getSchemaRecord } from './schema.js';
import 'dotenv/config';

const encodeDataItems = [
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
    // Add more items as needed, according to the schema
];

async function createAttestation(schemaUID, encodeDataItems, recipient, expirationTime,
                                 revocable, referencedAttestationUID) {
    try {
        const schemaInfo = await getSchemaRecord(schemaUID);

        const easContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
        const provider = new ethers
            .JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/0FXAwHoHh0CzpFUTD0e_OFr-RAoA1Xue');
        const signer = new ethers
            .Wallet(process.env.ATTEST_PRIV_KEY,
                provider);
        const eas = new EAS(easContractAddress).connect(signer);


        // Encode attestation data
        const schemaEncoder = new SchemaEncoder('int256 eventId, int256 voteIndex');
        const encodedData = schemaEncoder.encodeData([
                {name: 'eventId', value: 1, type: 'int256'},
                {name: 'voteIndex', value: 10, type: 'int256'}

        ]
            // encodeDataItems.map(item => ({
            //     name: item.name,
            //     value: item.value,
            //     type: item.type,
            // }))
        );

        const attestationData = {
            schema: schemaUID,
            data: {
                data: encodedData,
                ...(recipient && { recipient }),
                ...(expirationTime && { expirationTime }),
                ...(typeof revocable !== 'undefined' && { revocable }),
                ...(referencedAttestationUID && { referencedAttestation: referencedAttestationUID }),
            },
        }

        console.log(attestationData);

        // Create attestation
        const tx = await eas.attest(attestationData, {gasLimit: 10000000});

        const newAttestationUID = await tx.wait();

        console.log("New attestation UID:", newAttestationUID);
        return newAttestationUID;
    } catch (error) {
        console.error("Error creating attestation:", error);
        throw error; // Propagate error for further handling if necessary
    }
}

// const dataItems = [
//     { name: "isHonest", value: true, type: "bool" },
// ];

createAttestation('0xd6e70820b5dfe7cd8634e10b361ede9ffdcd3c366b96c40a3026afb91dd0b9ae', dataItems, '0xB4dcDc78D27a93e40406a98e8B32D7dBaa6F4835', 0, true)
    .then(newAttestationUID => console.log(`Attestation created with UID: ${newAttestationUID}`))
    .catch(error => console.error("Failed to create attestation:", error));
