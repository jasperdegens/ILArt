import { FC, useContext, useState } from "react";
import { IParameterData, ParameterType } from "../types/interactionParameter";
import { RgbaColorPicker } from 'react-colorful'
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BlockchainContext } from "../hooks/useBlockchain";

interface IParameterUIProps {
    name: string,
    paramType: ParameterType
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// we are using uint16 on the client side, so this gives us a max val to use to normalize
const uintExponent = 16
const maxVal = Math.pow(2, 16) - 1

function transformToNormalizedUint16(n: number): number {
    console.log(n)
    return Math.floor(n * maxVal)
}

const ParameterUI : FC<IParameterData> = ({name, paramType, id}) => {

    const [parameterValue, setParameterValue] = useState([0])
    const [sendingTx, setSendingTx] = useState(false)

    const { ilArtContract } = useContext(BlockchainContext)

    // function to submit interaction data to contract
    const tryInteraction = async () => {
        setSendingTx(true)
            
        const tx = await ilArtContract?.Interact(1, [id], parameterValue.map(transformToNormalizedUint16)) 

        await tx?.wait();

        setSendingTx(false)



    }

    return (
        <Disclosure as="div" className="pt-6">
            {({open}) => (
                <>
                    <dt className="text-base">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{name}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-4">
                        <div className="flex w-full h-full justify-center items-center mb-4">
                            {paramType == "color" ? 
                                <ColorParameter handleChange={setParameterValue}/> :
                                <SliderParameter handleChange={setParameterValue} /> }
                        </div>
                        <button
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-green-300 shadow-sm px-4 py-2 bg-green-500 text-base text-white font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                            onClick={tryInteraction}
                        >
                            {sendingTx ? 'Confirm with device!' : 'Send Interaction!'}
                        </button>
                    </Disclosure.Panel>
                </>
                )}
        </Disclosure>
    )

}

interface IParameterChanged {
    handleChange: (newValue: number[]) => void
}

const ColorParameter : FC<IParameterChanged> = ({handleChange}) => {

    const [color, setColor] = useState({r: 1, g: 0, b: 0, a: 1})

    return (
        <RgbaColorPicker color={color} onChange={(d) => {
            setColor(d);
            // 0-255 so normalize
            handleChange([d.r, d.g, d.b, d.a].map((n) => n / 255.0))
        }} />
    )

}

const SliderParameter: FC<IParameterChanged> = ({handleChange}) => {


    return (
        <input className="w-full" type='range' min="0" max="100" onChange={(t) => {
            handleChange([ parseFloat(t.target.value) / 100.0])
        }} />
    )


}


export default ParameterUI