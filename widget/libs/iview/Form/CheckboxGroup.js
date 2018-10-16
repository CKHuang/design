import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Checkbox from './Checkbox'

export default class CheckboxGroup extends Widget {
    constructor(opts = {checkboxs: [new Checkbox().getConfig(),new Checkbox().getConfig()]}) {
        super(
            `CheckboxGroup`,
            `iview`,
            `CheckboxGroup`,
            {
                'value': controls.Input(`选中`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                })
            },
            opts.checkboxs 
        )
        this.style = {
            "paddingLeft": '10px',
            "paddingRight": "10x"
        }
    }
}