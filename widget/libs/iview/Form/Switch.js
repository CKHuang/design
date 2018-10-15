import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class Switch extends Widget {
    constructor() {
        super(
            `i-switch`,
            `iview`,
            `Switch`,
            {
                'value': controls.Input(`值`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'disabled': controls.Switch(`禁用`),
                'loading': controls.Switch(`加载中`)
            }
        )
    }
}