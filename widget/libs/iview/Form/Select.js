import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Option from './Option'

export default class Select extends Widget {
    constructor(opts = {options: [new Option().getConfig(),new Option().getConfig()]}) {
        super(
            `Select`,
            `iview`,
            `Select`,
            {
                'value': controls.Input(`值`),
                'multiple': controls.Switch(`多选`),
                'disabled': controls.Switch(`禁用`),
                'clearable': controls.Switch(`可清空`),
                'loading': controls.Switch(`加载中`),
                'loading-text': controls.Input(`文字(加载中)`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'transfer': controls.Switch(`transfer`),
                'placeholder': controls.Input(`占位文本`), 
            },
            opts.options
        )
    }
}