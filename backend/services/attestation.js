import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { getSchemaRecord } from './schema.js';
import 'dotenv/config';

export async function createAttestation(schemaUID, encodeDataItems, schemaEncodeData, recipient, expirationTime,
                                        revocable, refUID, private_key) {
    try {
        const schemaInfo = await getSchemaRecord(schemaUID);

        const easContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
        const provider = ethers.getDefaultProvider(
            "sepolia"
        )
        const signer = new ethers
            .Wallet(private_key,
                provider);
        const eas = new EAS(easContractAddress).connect(signer);


        // Encode attestation data
        const schemaEncoder = new SchemaEncoder(schemaEncodeData);
        const encodedData = schemaEncoder.encodeData(
            encodeDataItems.map(item => ({
                name: item.name,
                value: item.value,
                type: item.type,
            }))
        );

        const attestationData = {
            schema: schemaUID,
            data: {
                data: encodedData,
                ...(recipient && { recipient }),
                ...(expirationTime && { expirationTime }),
                ...(typeof revocable !== 'undefined' && { revocable }),
                ...(refUID && { refUID })
            },
        };

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

const dataItems = [
    {name: 'test1Id', value: 1, type: 'int256'},
    {name: 'voteIndex', value: 2, type: 'int256'},
];

// createAttestation('0x50e562002c209091c649e3ba5d6a89cad7b790a32cc235cfda5ea13b064b033c', dataItems, '', 0, false, '', '')
//     .then(newAttestationUID => console.log(`Attestation created with UID: ${newAttestationUID}`))
//     .catch(error => console.error("Failed to create attestation:", error));
