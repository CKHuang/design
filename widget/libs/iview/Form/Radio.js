import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../../libs/html/Span'

export default class Radio extends Widget {
    constructor() {
        super(
            `Radio`,
            `iview`,
            `Radio`,
            {
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'label': controls.Input(`标签`),
                'disabled': controls.Switch(`禁用`),   
            },
            [new Span(`Radio`).getConfig()]
        )
    }
}