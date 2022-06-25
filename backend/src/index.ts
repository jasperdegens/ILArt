import { WebSocketServer } from "ws";

const port = 8080


function main() {
    const wss = new WebSocketServer({port: port})


    wss.on('listening', () => {
        console.log('listeneing on port ' + port)
    })
}


main()