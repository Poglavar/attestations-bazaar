const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');
require('dotenv').config();

const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/0FXAwHoHh0CzpFUTD0e_OFr-RAoA1Xue");
async function registerSchema() {
    try {
        // Initialize provider and signer
        const signer = new ethers.Wallet(process.env.FROM_PRIV_KEY, provider);
        const connectedSchemaRegistry = schemaRegistry.connect(signer);

        // Initialize SchemaEncoder with the schema string
        const schema = "int256 test2Id, int256 voteIndex";
        const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
        const revocable = false; // A flag allowing an attestation to be revoked

        const transaction = await connectedSchemaRegistry.register({
            schema,
            revocable,
            resolverAddress
        }, { gasLimit: 100000 });

        // Wait for transaction to be validated
        await transaction.wait();
        console.log("New Schema Created", transaction.hash);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getSchemaRecord(schemaUID) {
    try {
        const connectedSchemaRegistry = schemaRegistry.connect(provider);
        const schemaInfo = await connectedSchemaRegistry.getSchema({ uid: schemaUID });
        return schemaInfo;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// getSchemaRecord('0xf2e29486cf5ee49613a07b7b386bf09ed1bc73553321d4e898f23cfcc6ecc5eb').then(schemaInfo => {
//     console.log(schemaInfo);
// });

// registerSchema();

module.exports = {
    getSchemaRecord,
    registerSchema
}