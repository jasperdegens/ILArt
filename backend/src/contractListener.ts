import { ethers, BigNumberish, BigNumber } from 'ethers'
import { LIART_CONTRACT_ADDRESS, SKALE_RPC_ENDPOINT } from './envVariables'

const contractAbi = require('../abi/ILArt_metadata.json').output.abi

// we are using uint16 on the client side, so this gives us a max val to use to normalize
const uintExponent = 16
const maxVal = Math.pow(2, 16) - 1

// Transforms bigNum into a float between 0-1
function normalizeBigNumber(num: number): number {
    const normalized = num / maxVal
    if(normalized < 0 || normalized > 1) {
        throw (new Error("normalized out of range: " + normalized))
    }

    return normalized;
}


// Setup contract listener to handle when someone participates with artwork.
// Will call the interactionHandler with all parameterValues scaled between 0-1
async function setupInteractionListener( interactionHandler: (address: string, artworkId: number, parameterIds: number[], parameterValues: number[] ) => void ) {

    // setup provider
    const provider = new ethers.providers.JsonRpcProvider(SKALE_RPC_ENDPOINT)
    
    const liArtContract = new ethers.Contract(LIART_CONTRACT_ADDRESS, contractAbi, provider)


    // listen for ParameterChanged event and process 
    liArtContract.on('ParameterChanged', (caller: string, artworkId: BigNumber, parameterIds: BigNumber[], parameterValues: number[]) => {
        
        console.log("Contract Interaction Triggerd")

        // param IDs will not be large enough to cause overflows, so just convert to number
        const paramIds = parameterIds.map((n: BigNumber) => n.toNumber())
        const normalizedParamValues = parameterValues.map(normalizeBigNumber)

        // invoke callback with js friendly params
        interactionHandler(caller, artworkId.toNumber(), paramIds, normalizedParamValues)

    })


}




export {
    setupInteractionListener
}