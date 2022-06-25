import { ReactNode, ReactElement, useState, useMemo, useCallback, createContext } from 'react'
import {ethers} from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { disconnect } from 'process'
import { ILArt, ILArt__factory } from '../types/ethers-contracts'



interface IBlockchainProviderData {
    provider?: ethers.providers.Web3Provider,
    connectWallet?: () => Promise<boolean>
    disconnectWallet? : () => void,
    ilArtContract?: ILArt
}

const blockchainProviderDefaults: IBlockchainProviderData = {
    provider: undefined,
    connectWallet: undefined,
    disconnectWallet : () => {},
}

const BlockchainContext = createContext(blockchainProviderDefaults)

const BlockchainProvider = ({ children }: {children: ReactNode}): ReactElement => {

    const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined)
    const [wcProvider, setWcProvider] = useState<WalletConnectProvider | null>(null)
    const [ilArtContract, setIlArtContract] = useState<ILArt | undefined> (undefined)

    const connectWallet = useCallback(async () => {
        try {
            console.log('connecting wallet')
            const walletConnectProvider = new WalletConnectProvider({
                infuraId: '8b20db45f0eb43b8a83e655de8149a2d',
                rpc: {
                    1085866509: 'https://hackathon.skalenodes.com/v1/downright-royal-saiph',
                },
            
            })
            await walletConnectProvider.enable()
            await walletConnectProvider.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainName: 'SKALE Hackathon',
                    chainId: '0x40b9020d',
                    rpcUrls: ['https://hackathon.skalenodes.com/v1/downright-royal-saiph']
                }]
            })
            await walletConnectProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x40b9020d'}]
            })

            setWcProvider(walletConnectProvider)
            const provider = new ethers.providers.Web3Provider(walletConnectProvider)
            setProvider(provider)
            console.log(provider)

            // connect wallet to contract as well
        
            // @ts-ignore
            const ilArt = ILArt__factory.connect(process.env.NEXT_PUBLIC_ILART_ADDRESS, await provider.getSigner())
            


            setIlArtContract(ilArt)
        } catch (error) {
            
        }


        return provider ? true : false

    }, [])

    const disconnectWallet = useCallback(() => {
        if(!wcProvider) return

        wcProvider.disconnect()
        setWcProvider(null)
        setProvider(undefined)
        setIlArtContract(undefined)

    }, [wcProvider])


    const providerData = useMemo(() => 
        ({
            provider,
            connectWallet,
            disconnectWallet,
            ilArtContract
        })
    , [provider, connectWallet, disconnectWallet, ilArtContract])


    return (
        <BlockchainContext.Provider value={providerData}>{children}</BlockchainContext.Provider>
    )
}

export {
    BlockchainProvider,
    BlockchainContext
}