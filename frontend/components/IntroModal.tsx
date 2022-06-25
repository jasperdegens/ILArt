import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { FC, Fragment, useContext, useState, useRef, useMemo } from "react";
import { BlockchainContext } from "../hooks/useBlockchain";

interface IntroModalProps {
    
}

const fetcher = (url: string) => fetch(url).then((res) => console.log)

const IntroModal: FC = () => {

    const { connectWallet, provider } = useContext(BlockchainContext)
    const [awaitingConnect, setAwaitingConnect] = useState(false)
    const [signingMessage, setSigningMessage] = useState(false)
    const [introComplete, setIntroComplete] = useState(false)

    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    const tryConnectWallet = async () => {
        if(!connectWallet) return

        setAwaitingConnect(true)

        await connectWallet()

        setAwaitingConnect(false)

    }

    const trySignMessage = async () => {
        if (!provider) return

        try {
            
            
            setSigningMessage(true)

            const signer = await provider.getSigner()

            const msg = await signer.signMessage("Authorize me to participate!")

            const res = await fetch('/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    msg: msg
                })
            })
            console.log(res)

            console.log(msg)

            setSigningMessage(false)

            setIntroComplete(true)

            return msg;
        } catch (error) {
            setSigningMessage(false)   
        }

        return ''

    }


    
    const introContent = useMemo(() => (
        <>
        <div>
        <div className="text-center">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            Welcome to IL Art!
            </Dialog.Title>
            <div className="mt-2 text-sm text-gray-700 text-left space-y-4">
            <p>
                IL (Interactive Live) Art is a system where artists can create live sets and allow the audience to participate in creating amazing visuals.
            </p>
            <p>
                Best part is when you interact, you are minted your very own capture of the performance, a memento of how you impacted the live show!
            </p>
            <p>
                
            </p>
            </div>
        </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
            onClick={tryConnectWallet}
        >
            Connect Wallet!
        </button>
        <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
        >
            Close
        </button>
        </div>
        </>
    ), [tryConnectWallet, cancelButtonRef, provider])


    const signMessageContent = useMemo(() => (
        <>
        <div>
        <div className="text-center">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            {signingMessage ? 'Check Your Wallet!' : 'Confirm Participation!'}
            </Dialog.Title>
            <div className="mt-2 text-sm text-gray-700 text-left space-y-4">
            <p>
                {signingMessage ? 'Please sign the the message using wallet connect. You may have to check your device.' : 'Click below to sign a message to authorize you to participate in the art performance!'}
            </p>
            </div>
        </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
            onClick={trySignMessage}
        >
            {signingMessage ? (<>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Please confirm with wallet
              </>
            ) : 'Trigger Sign Message'}
        </button>
        <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
        >
            Close
        </button>
        </div>
        </>
    ), [provider, signingMessage])

    const introCompleteContent = useMemo(() => (
        <>
        <div>
        <div className="text-center">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            You are ready to participate!
            </Dialog.Title>
            <div className="mt-2 text-sm text-gray-700 text-center space-y-4">
            <p>
                Enjoy the performance!
            </p>
            </div>
        </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:gap-3 sm:grid-flow-row-dense">
        <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
        >
            Close
        </button>
        </div>
        </>
    ), [provider, signingMessage])


    return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
               {introComplete ? introCompleteContent : provider ? signMessageContent : (awaitingConnect ? introContent : introContent)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )


}

export default IntroModal