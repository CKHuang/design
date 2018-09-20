import util from '../util'

const Slider = () => {
    return {
        tag: `Slider`,
        lib: `iview`,
        icon: `md-remove`,
        description: `滑动块`,
        properties: {
            props: {
                "min": {
                    editControl: util.editControl.InputNumber(`最小值`),
                    default: 1
                },
                "max": {
                    editControl: util.editControl.InputNumber(`最大值`),
                    default: 100
                },
                "step": {
                    editControl: util.editControl.InputNumber(`步长`),
                    default: 1
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "range": {
                    editControl: util.editControl.Switch(`双滑块`)
                },
                "show-input": {
                    editControl: util.editControl.Switch(`显示数值`)
                },
                "input-size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                }
            }
        }
    }
}


export default {
    Slider,
    widgets: [Slider()]
}