import { FC, useState } from "react";
import { IParameterData, ParameterType } from "../types/interactionParameter";
import { RgbaColorPicker } from 'react-colorful'
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface IParameterUIProps {
    name: string,
    paramType: ParameterType
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ParameterUI : FC<IParameterData> = ({name, paramType}) => {



    return (
        <Disclosure as="div" className="pt-6">
            {({open}) => (
                <>
                    <dt className="text-lg">
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
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <ColorParameter />
                    </Disclosure.Panel>
                </>
                )}
        </Disclosure>
    )

}

const ColorParameter : FC = () => {

    const [color, setColor] = useState({r: 1, g: 0, b: 0, a: 1})

    return (
        <RgbaColorPicker color={color} onChange={setColor} />
    )

}


export default ParameterUI