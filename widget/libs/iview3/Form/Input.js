import util from '../util'

/**
 * @description Input
 */
const Input = () => {
    return {
        tag: `Input`,
        lib: `iview`,
        description: `输入框`,
        icon: `ios-create-outline`,
        properties: {
            props: {
                "value": {
                    editControl: util.editControl.Input(`内容`)
                },
                "types": {
                    editControl: util.editControl.Select(`类型`,util.types.input.types())
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "placeholder": {
                    editControl: util.editControl.Input(`占位文本`)
                },
                "clearable": {
                    editControl: util.editControl.Switch(`可清空`)
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "readonly": {
                    editControl: util.editControl.Switch(`只读`)
                },
                "maxlength": {
                    editControl: util.editControl.InputNumber(`最大长度`)
                },
                "icon": {
                    editControl: util.editControl.Select(`图标`,util.types.icon.type())
                },
                "search": {
                    editControl: util.editControl.Switch(`搜索类型`)
                }
            }
        }
    }
}

export default {
    Input,
    widgets: [Input()]
}