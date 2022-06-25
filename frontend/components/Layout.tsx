import Head from "next/head";
import { Children, FC, ReactNode } from "react";

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
            {children}
        </>
    )
}


export default Layout;