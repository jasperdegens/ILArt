import axios from 'axios';
import { MINT_CHAIN } from './envVariables';
import { NFT_PORT_API_KEY } from './keys'


async function mintNft(fileUrl: string, targetAddress: string, name: string, description: string, timesTried = 0): Promise<boolean> {


    // set NFTPort options
    var options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/easy/urls',
        headers: {
            'Content-Type': 'application/json',
            Authorization: NFT_PORT_API_KEY
        },
        data: {
            chain: MINT_CHAIN,
            name,
            description,
            file_url: fileUrl,
            mint_to_address: targetAddress
        }
    };

    try {
        
        await axios.request(options).catch(c => {
            console.log(c.response.data)
            if(timesTried < 5)
            setTimeout(() => {
                mintNft(fileUrl, targetAddress, name, description, timesTried +1)
            }, 5000)
        })
    
        console.log('Minted successfully!')
        return true

    } catch (error) {
        console.log(error)
        return false

    }

}






export {
    mintNft
}