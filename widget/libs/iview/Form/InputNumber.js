import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class InputNumber extends Widget {
    constructor() {
        super(
            `InputNumber`,
            `iview`,
            `InputNumber`,
            {
                'value': controls.InputNumber(`值`),
                'max': controls.InputNumber(`最大值`),
                'min': controls.InputNumber(`最小值`),
                'placeholder': controls.Input(`占位文本`),
                'clearable': controls.Switch(`可清空`),
                'disabled': controls.Switch(`禁用`),
                'readonly': controls.Switch(`只读`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'active-change': controls.Switch(`实时响应变更`)
            }
        )
    }
}