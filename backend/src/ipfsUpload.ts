import axios from "axios"
import * as fs from 'fs'

const FormData = require('form-data')



const storjUrl = `https://demo.storj-ipfs.com/api/v0/add`;
const storjGateway = 'https://demo.storj-ipfs.com/ipfs/'


// currently pin using storj
async function pinToIPFS(filePath: string): Promise<string> {

    let data = new FormData()
    
    // @ts-ignore
    data.append('file', fs.createReadStream(filePath))

    let ipfsHash = ''
    try {


        // Execute the Upload request to the Storj IPFS pinning service
        const res = await axios.post(storjUrl,
            data,
            {
                headers: {
                    // @ts-ignore
                    'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                },
                // These arguments remove any client-side upload size restrictions
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            },
        )
        
        ipfsHash = res.data['Hash']

    } catch (error) {
        console.log(error)
        throw error
    }

    return ipfsHash

}



export {
    pinToIPFS
}