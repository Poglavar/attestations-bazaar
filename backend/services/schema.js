import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import 'dotenv/config';

// This is the definition of schemas we are actually using
// Source: https://docs.google.com/document/d/1-DAiJ0lxO9JCTpHz3NgLpwhNlXVi5R7L761POVNohkM/edit
const allSchemas = [
    // Recipe
    "string EXPECTED_OUTCOME,bytes32[] SCHEMA_ID",
    // Identity/Reputation
    "string MY_NAME_IS",
    "bool THIS_ATTESTATION_IS_TRUE", // refAUID should be entered
    // Land (recipient should be same as TARGET_ADDRESS)
    "bool IS_IN_NATURE_RESERVE,string SUPPORTING_URL,string TARGET_CHAIN,string TARGET_ADDRESS,string TARGET_ID",
    "bool IS_BUILDING_PERMITTED,string SUPPORTING_URL,string TARGET_CHAIN,string TARGET_ADDRESS,string TARGET_ID",
    // Marketplace (recipient should be same as TARGET_ADDRESS)
    "bytes32 I_WILL_PAY_FOR_SUID,uint256 AMOUNT,string CURRENCY,string TARGET_CHAIN,string TARGET_ADDRESS,string TARGET_ID",
    "bytes32 I_WILL_DO_SUID,uint256 AMOUNT,string CURRENCY,string TARGET_CHAIN,string TARGET_ADDRESS,string TARGET_ID",
    "bytes32 I_ACCEPT_AUID", // (recipient should be same as target AUID creator)
    "bytes32 I_CONFIRM_DONE_AUID,uint8 REVIEW_SCORE,string REVIEW_TEXT" // (recipient should be same as target AUID creator)
]

const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/0FXAwHoHh0CzpFUTD0e_OFr-RAoA1Xue");
export async function registerSchema() {
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

export async function getSchemaRecord(schemaUID) {
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

registerSchema();

