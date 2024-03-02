import 'dotenv/config';

import {uniqueNamesGenerator, names} from 'unique-names-generator';

import randomBool from 'random-bool';
import HashSet from 'hashset';
import {createAttestation} from "../services/attestation.js";
import {readAddress} from "./helper/read_accounts.js";

// Define your schemas here
const schemas = [
    '0xc5dd5682a31d774cfac30a8f827be296cf0f1fd5d920dea7adb08d6d75ccbfaa',
];

const confirmationSchema = [
    '0x90140d098b101dc061bc6a3a5a5662c7478ffc11e7f121b66ce188a18777c5f2',
];

const config = {
    dictionaries: [names]
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function bootstrapAttestations() {
    var accounts = readAddress('eth_accounts.json');
    for (let i = accounts.length - 1; i >= accounts.length - 1; i--) {
        var account = accounts[i];
        console.log('account addr: ', account.address);
        const numberOfAttestations = getRandomInt(0, 1);

        for (let i = 0; i < numberOfAttestations; i++) {
            const schemaKeys = Object.keys(schemas);
            const randomSchemaKey = schemaKeys[getRandomInt(0, schemaKeys.length - 1)];
            const schemaUID = schemas[randomSchemaKey];
            const schemaEncodeData = generateSchemaEncodeDataItemsForSchema(schemaUID);
            const encodeDataItems = generateEncodeDataItemsForSchema(schemaUID);

            const attestationUID = await createAttestation(
                schemaUID,
                encodeDataItems,
                schemaEncodeData,
                '',
                0,
                false,
                undefined,
                account.privateKey
            );

            const numOfAttestors = getRandomInt(0, 5);
            console.log('accounts going to attest: ', numOfAttestors)

            var hashset = new HashSet();
            hashset.add(account.address);
            for (let i = 0; i < numOfAttestors; i++) {

                // Randomly select an attester different from the current account
                let attesterAccount;
                do {
                    attesterAccount = accounts[getRandomInt(0, accounts.length - 1)];
                } while (hashset.contains(attesterAccount.address));
                hashset.add(attesterAccount.address);

                const schemaAttestorKeys = Object.keys(confirmationSchema);
                const randomAttestorSchemaKey = schemaAttestorKeys[getRandomInt(0, schemaAttestorKeys.length - 1)];
                const schemaAttestorUID = confirmationSchema[randomAttestorSchemaKey];

                // Assuming encodeDataItems needs to be generated or retrieved for each attestation
                const schemaAttestorEncodeData = generateSchemaEncodeDataItemsForSchema(schemaAttestorUID);
                console.log(schemaAttestorEncodeData);
                const encodeAttestorDataItems = generateEncodeDataItemsForSchema(schemaAttestorUID);
                console.log(encodeAttestorDataItems);
                try {
                    const attestationIUID = await createAttestation(
                        schemaAttestorUID,
                        encodeAttestorDataItems,
                        schemaAttestorEncodeData,
                        '',
                        0,
                        false,
                        schemaUID,
                        attesterAccount.privateKey
                    );
                    console.log(`Attestation created: ${attestationIUID} for account ${account.address} by ${attesterAccount.address}`);
                } catch (error) {
                    console.error(`Failed to create attestation for account ${account.address} by ${attesterAccount.address}`, error);
                }
            }
        }
    }
}

function generateSchemaEncodeDataItemsForSchema(schemaKey) {
    if (schemaKey == "0xc5dd5682a31d774cfac30a8f827be296cf0f1fd5d920dea7adb08d6d75ccbfaa") {
        return "string MY_NAME_IS"
    } else if (schemaKey == "0x90140d098b101dc061bc6a3a5a5662c7478ffc11e7f121b66ce188a18777c5f2") {
        return "bool THIS_ATTESTATION_IS_TRUE"
    }
}

function generateEncodeDataItemsForSchema(schemaKey) {

    if (schemaKey == "0xc5dd5682a31d774cfac30a8f827be296cf0f1fd5d920dea7adb08d6d75ccbfaa") {
        return [
            {name: 'MY_NAME_IS', value: uniqueNamesGenerator(config), type: 'string'},
        ];
    } else if (schemaKey == "0x90140d098b101dc061bc6a3a5a5662c7478ffc11e7f121b66ce188a18777c5f2") {
        return [
            {name: 'THIS_ATTESTATION_IS_TRUE', value: randomBool({likelihood: 60}), type: 'bool'},
        ];
    }
}


bootstrapAttestations();
