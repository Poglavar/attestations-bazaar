// Example taken from:
// https://docs.attest.sh/docs/developer-tools/eas-sdk
const { EAS, Offchain, SchemaEncoder, SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk")
const { ethers } = require('ethers')
const fs = require('fs');

console.log(ethers)

const readFromSchemaFile = async (filename) => {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const lines = data.split('\n');

        const index = Math.floor(Math.random() * lines.length);
        return String(lines[index]);
        } catch(err) {
        console.error("Error while reading file: ", err);
        return '';
        }
}

const createAttestation = async (eas) => {
    // Initialize SchemaEncoder with the schema string
    const selectedScehmaEncoder = await readFromSchemaFile('backend/model/schema/schema_encoder')
    const schemaEncoder = new SchemaEncoder(selectedScehmaEncoder)
    const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "int256" },
        { name: "voteIndex", value: 1, type: "int8" },
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

const generateAccounts = (numAccounts, filename) => {
    const accounts = [];

    for (let i = 0; i < numAccounts; i++) {
        const wallet = ethers.Wallet.createRandom();
        const account = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        };
        accounts.push(account);
    }

    const accountsString = accounts.map(account => JSON.stringify(account)).join('\n');

    fs.writeFile(filename, accountsString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Successfully generated ${numAccounts} accounts and saved them to ${filename}`);
        }
    });
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

// generateAccounts(200, 'eth_accounts.json');