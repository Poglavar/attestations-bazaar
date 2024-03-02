import fs from 'fs';
import path from 'path';

function readAddress(filename : string) {
    const addressData = fs.readFileSync(path.join('../', filename), 'utf-8');
    return JSON.parse(addressData);
}

export {readAddress}