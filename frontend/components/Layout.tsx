import Head from "next/head";
import { Children, FC, ReactNode } from "react";
import { BlockchainContext, BlockchainProvider } from "../hooks/useBlockchain";
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css';

interface ILayoutProps {
    children: JSX.Element
}

const Layout : FC<ILayoutProps> = ({children}) => {
    return (
        <>
            <Head>
                <title>IL Art</title>
                <meta name="description" content="Interactive Live Art" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer 
                position="bottom-right"
            />
            <BlockchainProvider>
                {children}
            </BlockchainProvider>
        </>
    )
}


export default Layout;