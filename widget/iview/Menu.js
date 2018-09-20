import types from '../types'
import Button from './Button'

const MenuItem = {
    tag: `MenuItem`,
    description: `菜单项`,
    properties: {
        props: {
            "name": {
                editControl: {
                    label:`唯一标识`,
                    control: types.Control.Input
                },
                default: `item-name`
            },
            "to": {
                editControl: {
                    label:`跳转链接`,
                    control: types.Control.Input
                }
            }
        }
    },
    children: [Button[0]]
}

export default [{
    tag: `Menu`,
    description: `导航菜单`,
    properties: {
        props: {
            "mode": {
                editControl: {
                    label: `类型`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`horizontal`,label:`水平`},
                        {value:`vertical`,label:`垂直`}
                    ]
                },
                default: `horizontal`
            },
            "theme": {
                editControl: {
                    label: `主题`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`light`,label:`明亮`},
                        {value:`dark`,label:`暗黑`},
                        {value:`primary`,label:`主色`}
                    ]
                },
                default: `light`
            },
            "active-name": {
                editControl: {
                    label: `激活菜单`,
                    control: types.Control.Input
                }
            },
            "accordion": {
                editControl: {
                    label:`手风琴效果`,
                    control: types.Control.Switch
                }
            }
        }
    },
    children: [MenuItem,MenuItem]
},MenuItem]