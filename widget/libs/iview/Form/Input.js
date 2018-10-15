import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class Input extends Widget {
    constructor() {
        super(
            `Input`,
            `iview`,
            `Input`,
            {
                'type': controls.Select(`类型`,{
                    options: [
                        {value:`text`,label:`text`},
                        {value:`password`,label:`password`},
                        {value:`textarea`,label:`textarea`},
                        {value:`url`,label:`url`},
                        {value:`email`,label:`email`},
                        {value:`date`,label:`date`}
                    ]
                }),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`small`,label:`small`},
                        {value:`default`,value:`default`}
                    ]
                }),
                'placeholder': controls.Input(`占位文本`),
                'clearable': controls.Switch(`可清空`),
                'disabled': controls.Switch(`禁用`),
                'readonly': controls.Switch(`只读`),
                'maxlength': controls.InputNumber(`最大长度`),
                'rows': controls.InputNumber(`行数`)
            }
        )
    }
}