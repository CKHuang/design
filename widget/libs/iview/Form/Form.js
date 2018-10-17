import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class Form extends Widget {
    constructor(opt = {
        description: 'Form'
    }) {
        super(
            `Form`,
            `iview`,
            opt.description,
            {
                inline: controls.Switch(`行内模式`),
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
        this.style = {
            "minHeight": "10px"
        }
    }   
}