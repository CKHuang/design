import util from '../util'

const Form = () => {
    return {
        tag: `Form`,
        lib: `iview`,
        description: `表单`,
        icon: `ios-list-box-outline`,
        editOutline: true,
        properties: {
            props: {
                "inline": {
                    editControl: util.editControl.Switch(`单行模式`)
                },
                "label-position": {
                    editControl: util.editControl.Select(`位置`,util.types.base.position())
                },
                "label-width": {
                    editControl: util.editControl.InputNumber(`宽度`),
                    default: 80
                }
            },
            style: util.properties.style({
                paddingLeft: `10px`,
                paddingRight: `10px`,
                paddingTop: `10px`,
                paddingBottom: `10px`
            })
        }
    }
}

const FormItem = () => {
    return {
        tag: `FormItem`,
        lib: `iview`,
        description: `表单项`,
        icon: `ios-list-box-outline`,
        editOutline: true,
        properties: {
            props: {
                "label": {
                    editControl: util.editControl.Input(`标签文本`)
                },
                "required": {
                    editControl: util.editControl.Switch(`必填`)
                },
                "inline": {
                    editControl: util.editControl.Switch(`单行模式`)
                },
                "label-width": {
                    editControl: util.editControl.InputNumber(`宽度`),
                    default: 80
                }
            },
            style: util.properties.style({
                paddingLeft: `10px`,
                paddingRight: `10px`,
                paddingTop: `10px`,
                paddingBottom: `10px`
            })
        }
    }
}

export default {
    Form,
    FormItem,
    widgets: [Form(),FormItem()]
}