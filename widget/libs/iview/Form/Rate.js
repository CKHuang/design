import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../../libs/html/Span'

export default class Rate extends Widget {
    constructor() {
        super(
            `Rate`,
            `iview`,
            `Rate`,
            {
                'count': controls.InputNumber(`总数`),
                'value': controls.InputNumber(`值`),
                'allow-half': controls.Switch(`半选`),
                'disabled': controls.Switch(`禁用`),  
                'show-text': controls.Switch(`提示文字`) ,
                'clearable': controls.Switch(`可清除`)
            }
        )
    }
}