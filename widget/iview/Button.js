import types from '../types'

export default [{
    tag: `Button`,
    description: `按钮`,
    properties: {
        props: {
            "type": {
                editControl: {
                    label: `类型`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`default`,label:`default`},
                        {value:`primary`,label:`primary`},
                        {value:`dashed`,label:`dashed`},
                        {value:`text`,label:`text`},
                        {value:`info`,label:`info`},
                        {value:`success`,label:`success`},
                        {value:`warning`,label:`warning`},
                        {value:`error`,label:`error`}
                    ]
                },
                default: `default`
            },
            "ghost": {
                editControl: {
                    label: `透明背景`,
                    control: types.Control.Switch,
                    arguments: []
                },
                default: false
            },
            "size": {
                editControl: {
                    label: `大小`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`large`,label:`large`},
                        {value:`default`,label:`default`},
                        {value:`small`,label:`small`}
                    ]
                },
                default: `default`
            },
            // "shape": {
            //     editControl: {
            //         label: `圆形按钮`,
            //         control: types.Control.Switch,
            //         arguments: {
            //             "true-value": `circle`,
            //             "false-value": null
            //         }
            //     }
            // },
            "long": {
                editControl: {
                    label: `长宽度`,
                    control: types.Control.Switch,
                },
                default: false
            },
            "html-type": {
                editControl: {
                    label: `原生类型`,
                    control: types.Control.Select,
                    arguments: [
                        {value:`button`,label:`button`},
                        {value:`submit`,label:`submit`},
                        {value:`reset`,label:`reset`}
                    ]
                },
                default: `button`
            },
            "disabled": {
                editControl: {
                    label: `禁用`,
                    control: types.Control.Switch,
                },
                default: false
            },
            "loading": {
                editControl: {
                    label: `加载中`,
                    control: types.Control.Switch,
                },
                default: false
            },
            "icon": {
                editControl: {
                    label: `图标`,
                    control: types.Control.Select,
                    arguments: [
                        {value:``,label:`empty`},
                        {value:`ios-add`,label:`ios-add`},
                        {value:`md-add`,label:`md-add`},
                        {value:`ios-add-circle`,label:`ios-add-circle`},
                        {value:`ios-add-circle-outline`,label:`ios-add-circle-outline`}
                    ]
                },
                default: ``
            },
            "to": {
                editControl: {
                    label: `跳转链接`,
                    control: types.Control.Input,
                    arguments: ``
                },
                default: ``
            },
            "target": {
                editControl: {
                    label: `跳转方式`,
                    control: types.Control.Input,
                    arguments: ``
                },
                default: `_self`
            }
        },
        domProps: {
            "innerText": {
                editControl: {
                    label: `文案`,
                    control: types.Control.Input
                },
                default: `按钮`
            }
        }
    },
    children: [{
        tag: `span`,
        properties: {}
    }]
},{
    tag: `ButtonGroup`,
    description: `按钮组`,
    properties: {
        props: {
            "size": {
                editControl: {
                    control: types.Control.Select,
                    arguments: [
                        {value:`large`,label:`large`},
                        {value:`default`,label:`default`},
                        {value:`small`,label:`small`}
                    ]
                }
            },
            "shape": {
                editControl: {
                    control: types.Control.Switch,
                    arguments: {
                        "true-value": `circle`,
                        "false-value": null
                    }
                }
            },
            "vertical": {
                editControl: {
                    control: types.Control.Switch,
                }
            }
        }
    }
}]