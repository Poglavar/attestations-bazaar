// Example taken from:
// https://docs.attest.sh/docs/developer-tools/eas-sdk
const { EAS, Offchain, SchemaEncoder, SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk")
const { ethers } = require('ethers')

console.log(ethers)

const createAttestation = async (eas) => {
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex")
    const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
    ])

    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995"
    const tx = await eas.attest({
        schema: schemaUID,
        data: {
            recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
            expirationTime: 0,
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    })

    const newAttestationUID = await tx.wait()
    console.log("New attestation UID:", newAttestationUID)
}


const main = async () => {
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e" // Sepolia v0.26
    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress)
    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.getDefaultProvider(
        "sepolia"
    )
    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(provider)

    process.exit(0)

    await createAttestation(eas)
}

main()