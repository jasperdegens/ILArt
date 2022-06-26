# IL (Interactive Live) Art

> ETHNewYork Submission by Jasper Degens


IL Art is a concept for artists to engage with their audience and create a collaborative live visual art performance. Audience members can change certain details of the artwork (specified by the artist), such as color, speed of movement, size of geometry, etc. What's more, when an audience member participates, their effect is applied and then the system renders a screenshot of the visuals, and mints them to the user! Basically it serves as a memento of your interaction during the performance and is the result of the artist and audience having fun together.

The project flow breaks down as follows:

1. Artist designs a set and exposes some visual parameters.
2. Artist streams set via Livepeer.
3. Audience members can join client website and watch livestream.
4. Audience members can connect their wallet, which after signing a message is funded with sFUEL.
5. With sFUEL in hand, they can submit interactions to a lightweight smartcontract hosted on SKALE.
6. A local blockchain listener picks up the interaction, and updates the artwork.
7. A capture of the artwork is created, and is pinned to IPFS via Storj.
8. An NFT is then minted using NFTPort using the interaction information and is sent to the audience member.
9. Everyone has a great time :bowtie:



This project uses many amazing technologies developed by the following organizations:
- Livepeer
- SKALE
- WalletConnect
- NFTPort
- Polygon
- Storj
- IPFS



Thanks to all the sponsors for their great work and sharing their tech with us hackers.


This project's techn stack includes:
 - Nextjs
 - Tailwindcss
 - Nodejs (websockets based backend)
 - TouchDesigner
 - 10 lines of Solidity