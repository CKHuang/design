import types from '../types'

export default [{
    tag: `Card`,
    lib: `iview`,
    description: `卡片`,
    properties: {
        props: {
            "bordered": {
                editControl: {
                    label: `显示边框`,
                    control: types.Control.Switch
                },
                default: true
            },
            "dis-hover": {
                editControl: {
                    label: `禁用阴影`,
                    control: types.Control.Switch
                },
                default: false
            },
            "shadow": {
                editControl: {
                    label: `卡片阴影`,
                    control: types.Control.Switch
                },
                default: true
            },
            "padding": {
                editControl: {
                    label: `内部边距`,
                    control: types.Control.InputNumber
                },
                default: 16
            },
            "title": {
                editControl: {
                    label: `卡片标题`,
                    control: types.Control.Input
                },
                default: `填写标题`
            }
        }
    }
}]