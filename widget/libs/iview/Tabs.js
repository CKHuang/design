import types from '../types'
import htmlspan from '../html/span'

const TabPane = {
    tag: `TabPane`,
    lib: `iview`,
    description: `选项卡面板`,
    properties: {
        props: {
            "name": {
                editControl: {
                    label: `标示名称`,
                    control: types.Control.Input
                },
                default: `tab-name`
            },
            "label": {
                editControl: {
                    label: `卡头文字`,
                    control: types.Control.Input
                },
                default: `标签名称`
            },
            "icon": {
                editControl: {
                    label: `卡头标签`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`ios-add`,label:`ios-add`}
                    ]
                },
                default: ``
            },
            "disabled": {
                editControl: {
                    label: `禁用`,
                    control: types.Control.Switch
                },
                default: false
            },
            "closable": {
                editControl: {
                    label: `可关闭`,
                    control: types.Control.Switch
                },
                default: false
            }
        }
    },
    children: [htmlspan[0]]
}

export default [{
    tag: `Tabs`,
    lib: `iview`,
    description: `选项卡`,
    properties: {
        props: {
          
        }
    }
},TabPane]