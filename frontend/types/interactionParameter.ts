
// we will first support float or color parameters
type ParameterType = 'float' | 'color'

// parameter data will consist of the param type
// as well as the array of values.
// color will have 4 floats
// float will be a single float
interface IParameterData {
    
    paramType: ParameterType,
    name: string,
    data: number[]

}

export type {
    ParameterType,
    IParameterData
}