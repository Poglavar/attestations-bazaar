import fs from 'fs';

function readAddress(filepath) {
    try {
        const addressData = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(addressData);
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

export { readAddress };
