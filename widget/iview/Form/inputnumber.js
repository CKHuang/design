import util from '../util'

const InputNumber = () => {
    return {
        tag: `InputNumber`,
        lib: `iview`,
        icon: `ios-calculator`,
        description: `数字输入框`,
        properties: {
            props: {
                "max": {
                    editControl: util.editControl.InputNumber(`最大值`),
                    default: 100
                },
                "min": {
                    editControl: util.editControl.InputNumber(`最小值`),
                    default: 1
                },
                "step": {
                    editControl: util.editControl.InputNumber(`步伐`),
                    default: 1
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "placeholder": {
                    editControl: util.editControl.Input(`占位文本`)
                },
                "readonly": {
                    editControl: util.editControl.Switch(`只读`)
                }
            }
        }
    }
}


export default {
    InputNumber,
    widgets: [InputNumber()]
}