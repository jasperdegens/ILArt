import { Menu, Popover, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ChevronDownIcon } from '@heroicons/react/solid'
import ParameterUI from "./ParameterUI";
import { IParameterData } from "../types/interactionParameter";


interface IParameterPanelProps {
    handleSubmit?: () => void,
    parameters: IParameterData[]
}

const testParams: IParameterData[] = [
    {
        data: [],
        name: "Background Color",
        paramType: "color"
    },
    {
        data: [],
        name: "Foreground Color",
        paramType: "color"
    },
    {
        data: [],
        name: "Noise Power",
        paramType: "float"
    }
] 


const ParameterPanel : FC<IParameterPanelProps> = ({handleSubmit, parameters}) => {

    
    return (

    <div className="w-5 top-1/2 bg-blue-500">
        <Popover as="div" className="relative inline-block text-left">
        {({open}) => (
        <>
            <div>
                <Popover.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Options
                    <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                    />
                </Popover.Button>
            </div>
            {open && (
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Popover.Panel className="absolute left-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll max-h-screen">
                    <div className="w-full bg-yellow-300 relative">

                        {testParams.map(p => (
                            <ParameterUI key={p.name} name={p.name} paramType={p.paramType}/>
                        ))}

                    </div>
                </Popover.Panel>
                </Transition>
            )}
            </>
        )}
        </Popover>
    </div>
    )

}


export default ParameterPanel;