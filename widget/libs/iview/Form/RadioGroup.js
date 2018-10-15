import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Radio from './Radio'

export default class RadioGroup extends Widget {
    constructor(opts = {radios: [new Radio().getConfig(),new Radio().getConfig()]}) {
        super(
            `RadioGroup`,
            `iview`,
            `RadioGroup`,
            {
                'value': controls.Input(`选中`),
                'type': controls.Select(`样式`,{
                    options: [
                        {value:`button`,label:`button`},
                        {value:``,label:`默认`}
                    ]
                }),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'vertical': controls.Switch(`垂直`)
            },
            opts.radios
        )
        this.style = {
            "paddingLeft": '10px',
            "paddingRight": "10x"
        }
    }
}