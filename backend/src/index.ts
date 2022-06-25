import { WebSocketServer } from "ws";
import { IPFS_GATEWAY } from "./envVariables";
import { pinToIPFS } from "./ipfsUpload";
import { mintNft } from "./mintNFT";

const port = 80

const testName = 'EthNyc'
const testDescription = 'test nft'
const dummyAddress = '0x9F47095f446ab4E761eE17376cf1698DF04A31CC'


async function pinAndMint(filePath: string) {

    

    // upload to ipfs via storj pinning service
    const ipfsHash = await pinToIPFS(filePath)
    console.log(ipfsHash)

    // mint via nft port
    // await mintNft(`${IPFS_GATEWAY}/${ipfsHash}`, dummyAddress, testName, testDescription)
}



function setupWebsocketServer() {

    const wss = new WebSocketServer({port: port})

    wss.on('connection', function(ws) {

        console.log('socket connection began')

        ws.on('message', (m) => {
            console.log(m.toString())
            pinAndMint(m.toString())


        })
    })

}


async function main() {


    


    setupWebsocketServer()
}


main()