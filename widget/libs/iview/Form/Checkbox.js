import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../../libs/html/Span'

export default class Checkbox extends Widget {
    constructor(opts = {text: ''}) {
        super(
            `Checkbox`,
            `iview`,
            `Checkbox`,
            {
                'value': controls.Input(`值`),
                'label': controls.Input(`标签`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'disabled': controls.Switch(`禁用`),
            },
            [new Span({text:opts.text}).getConfig()]
        )
    }
}