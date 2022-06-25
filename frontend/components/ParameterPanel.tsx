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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ParameterPanel : FC<IParameterPanelProps> = ({handleSubmit, parameters}) => {

    
    return (

    <div className="absolute right-0">
    <Popover className="relative pt-2">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              ' p-4 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right'
            )}
          >
            <span>Parameters</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>
          <div style={{clear: 'both'}} />

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className=" z-10 right-0 transform mt-3 px-2 w-screen max-w-xxs sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-5 py-6 sm:gap-2 sm:p-8 sm:pt-2">
                  {testParams.map((p) => (
                    <ParameterUI
                      key={p.name} 
                      name={p.name}
                      paramType={p.paramType}
                    />
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    </div>
    )

}


export default ParameterPanel;