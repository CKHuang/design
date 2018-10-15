import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class FormItem extends Widget {
    constructor() {
        super(
            `FormItem`,
            `iview`,
            `FormItem`,
            {
                "label": controls.Input(`标签`),
                "required": controls.Switch(`必填`),
                "label-position": controls.Select(`标签位置`,{
                    options: [
                        {value:`left`,label:`left`},
                        {value:`right`,label:`right`},
                        {value:`top`,label:`top`}
                    ]
                }),
                "label-width": controls.InputNumber(`标签宽度`)
            }
        )
    }   
}