import { WebSocketServer } from "ws";
import { IPFS_GATEWAY } from "./envVariables";
import { pinToIPFS } from "./ipfsUpload";
import { mintNft } from "./mintNFT";

const port = 8080

const testName = 'EthNyc'
const testDescription = 'test nft'
const dummyAddress = '0x9F47095f446ab4E761eE17376cf1698DF04A31CC'


async function main() {


    const ipfsHash = await pinToIPFS('../renders/ethNYC.png')
    console.log(ipfsHash)

    //await mintNft(`${IPFS_GATEWAY}/${ipfsHash}`, dummyAddress, testName, testDescription)

    const wss = new WebSocketServer({port: port})


    wss.on('listening', () => {
        console.log('listeneing on port ' + port)
    })
}


main()