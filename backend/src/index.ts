import { WebSocketServer } from "ws";
import { setupInteractionListener } from "./contractListener";
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



function addPinAndMintListener(wss: WebSocketServer) {

    wss.on('connection', function(ws) {
        console.log('socket connection began')
        ws.on('message', (m) => {
            pinAndMint(m.toString())
        })
    })

}

function addInteractionSocketCommunicator(wss: WebSocketServer) {
    
    // create handler tied to this websocket server
    function eventEmitter (address: string, artworkId: number, parameterIds: number[], parameterValues: number[] ) {
        console.log(wss.clients)
        wss.clients.forEach((ws) => {
            console.log('sending to client')
            ws.send(JSON.stringify({
                address,
                artworkId,
                parameterIds,
                parameterValues
            }))
        })
    }
    return eventEmitter
}


async function main() {

    const wss = new WebSocketServer({port: port})

    // setup blockchain listener for events on LIArt Contract
    const interactionToClients = addInteractionSocketCommunicator(wss)
    setupInteractionListener(interactionToClients)

    // setup pinning and minting handler
    addPinAndMintListener(wss)
}


main()