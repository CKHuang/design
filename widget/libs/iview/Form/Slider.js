import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class Slider extends Widget {
    constructor() {
        super(
            `Slider`,
            `iview`,
            `Slider`,
            {
                'value': controls.Input(`值`),
                'min': controls.InputNumber(`最小值`),
                "max": controls.InputNumber(`最大值`),
                "step": controls.InputNumber(`步长`),
                'disabled': controls.Switch(`禁用`),
                "range": controls.Switch(`双滑动`),
                "show-input": controls.Switch(`可输入`),
                "show-stops": controls.Switch(`间断点`),
                "show-tip": controls.Select(`显示提示`,{
                    options: [
                        {value:`hover`,label:`hover`},
                        {value:`always`,label:`always`},
                        {value:`never`,label:`never`}
                    ]
                }),
                "input-size": controls.Select(`输入框大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`default`,label:`default`},
                        {value:`small`,label:`small`}
                    ]
                })
            }
        )
    }
}