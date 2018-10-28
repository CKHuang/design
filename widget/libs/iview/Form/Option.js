import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../../libs/html/Span'

export default class Option extends Widget {
    constructor(opts = {text:`Option`}) {
        super(
            `Option`,
            `iview`,
            `Option`,
            {
                'value': controls.Input(`值`),
                'label': controls.Input('标签'),
                'disabled': controls.Switch('禁用')
            },
            [new Span({text:opts.text}).getConfig()]
        )
        this.props = {
            "value": `Option_${Date.now()}`
        }
    }
}