import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../html/Span'

export default class IMenuItem extends Widget {
    constructor() {
        super(
            `MenuItem`,
            `iview`,
            `MenuItem`,
            {
                "name": controls.Input(`名称`)
            },
            [new Span('MenuItem').getConfig()]
        )
        this.props = {
            "name": `name_${String(Date.now())}`
        }
    }
}