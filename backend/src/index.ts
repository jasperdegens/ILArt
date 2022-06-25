import { WebSocketServer } from "ws";
import { pinToIPFS } from "./ipfsUpload";

const port = 8080





async function main() {


    await pinToIPFS('../renders/ethNYC.png')

    const wss = new WebSocketServer({port: port})


    wss.on('listening', () => {
        console.log('listeneing on port ' + port)
    })
}


main()