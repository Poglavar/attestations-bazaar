// load dotenv
import dotenv from 'dotenv'
dotenv.config()
const test_api_key = process.env.HARPIE_API_KEY

export const validateAddress = (address) => {
    return fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: test_api_key,
            address: address
        })
    })
}

// const main = async () => {
//     const address = "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731"
//     const response = await validateAddress(address)
//     const data = await response.json()
//     console.log(data)
// }
