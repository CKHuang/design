import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../html/Span'

export default class IMenuItem extends Widget {
    constructor(opts = {
        text: `MenuItem`
    }) {
        console.log('-->MenuItem',opts)
        super(
            `MenuItem`,
            `iview`,
            `MenuItem`,
            {
                "name": controls.Input(`名称`),
                "to": controls.JumpInput(`跳转`)
            },
            [new Span({text:opts.text}).getConfig()]
        )
        this.props = {
            "name": `name_${String(Date.now())}`
        }
    }
}