import types from '../../types'


/**
 * @description Select
 * @param {string} label 属性名称 
 * @param {array} args 可选options 
 */
const Select = (
    label = `名称`,
    args = []
) => {
    return {
        label: label,
        control: types.Control.Select,
        arguments: args
    }
}

/**
 * @description Input
 * @param {string} label 名称
 */
const Input = (
    label = `名称`
) => {
    return {
        label: label,
        control: types.Control.Input
    }
}

/**
 * @description Switch
 * @param {string} label 名称
 */
const Switch = (
    label = `名称`
) => {
    return {
        label: label,
        control: types.Control.Switch
    }
}

/**
 * @description InputNumber
 * @param {string} label 
 */
const InputNumber = (
    label = `名称`
) => {
    return {
        label: label,
        control: types.Control.InputNumber
    }
}


const ColorPicker = (
    label = '名称'
) => {
    return {
        label: label,
        control: types.Control.ColorPicker
    }
}

export default {
    Select,
    Input,
    InputNumber,
    Switch,
    ColorPicker
}