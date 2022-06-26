import { WebSocketServer } from "ws";
import { setupInteractionListener } from "./contractListener";
import { IPFS_GATEWAY } from "./envVariables";
import { pinToIPFS } from "./ipfsUpload";
import { mintNft } from "./mintNFT";
import path from 'path'

const port = 80

const testName = (artworkId: string) => `IL Art #${artworkId}`
const testDescription = (artworkId: string) => `This is your snapshot from an Interactive Live Art performance for artwork #${artworkId} during the EthNewYork event. Thanks for your participation!`


async function pinAndMint(filePath: string) {

    // upload to ipfs via storj pinning service
    const ipfsHash = await pinToIPFS(filePath)
    console.log(ipfsHash)

    // extract metadata from filename
    const baseName = path.parse(filePath).name
    const [addr, nftNumber] = baseName.split('_')
    console.log(addr, nftNumber)

    // mint via nft port
    setTimeout(async () => {
        await mintNft(`${IPFS_GATEWAY}/${ipfsHash}`, addr, testName(nftNumber), testDescription(nftNumber))
    }, 2000)
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

    console.log("starting websocket server...")
    const wss = new WebSocketServer({port: port})

    // setup blockchain listener for events on LIArt Contract
    const interactionToClients = addInteractionSocketCommunicator(wss)
    setupInteractionListener(interactionToClients)

    // setup pinning and minting handler
    addPinAndMintListener(wss)
}


main()