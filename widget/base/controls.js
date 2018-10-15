/**
 * 生成选择框的配置
 * @param {string} label 
 * @param {object} opts 
 */
const Select = (label,opts = {options:[]}) => {
    return {
        label,
        control: `Select`,
        arguments: opts
    }
}

const Input = (label) => {
    return {
        label,
        control: `Input`
    }
}

const Switch = (label) => {
    return {
        label,
        control: `Switch`
    }
}

/**
 * 生成输入框的配置
 * @param {string} label 标签名称
 * @param {object} opts 可选配置
 * @param {string} opts.suffix 后缀
 */
const InputNumber = (label,opts = {}) => {
    return {
        label,
        control: `InputNumber`,
        arguments: opts
    }
}

const ColorPicker = (label) => {
    return {
        label,
        control: `ColorPicker`
    }
}

const JumpInput = (label) => {
    return {
        label,
        control: `JumpInput`
    }
}

export default {
    Select,
    Input,
    Switch,
    InputNumber,
    ColorPicker,
    JumpInput
}