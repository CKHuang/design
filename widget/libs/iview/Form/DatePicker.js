import Widget from '../../../base/Widget'
import controls from '../../../base/controls'

export default class DatePicker extends Widget {
    constructor() {
        super(
            `DatePicker`,
            `iview`,
            `DatePicker`,
            {
                'value': controls.Input(`值`),
                'type': controls.Select(`类型`,{
                    options: [
                        {value:`date`,label:`date`},
                        {value:`daterange`,label:`daterange`},
                        {value:`datetime`,label:`datetime`},
                        {value:`datetimerange`,label:`datetimerange`},
                        {value:`year`,label:`year`},
                        {value:`month`,label:`month`}
                    ]
                }),
                'format': controls.Input(`日期格式`),
                'placeholder': controls.Input(`占位文本`),
                'multiple': controls.Switch(`多选`),
                'show-week-numbers': controls.Switch(`星期数`),
                'confirm': controls.Switch(`主动关闭`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`default`,label:`default`},
                        {value:`small`,label:`small`}
                    ]
                }),
                'disabled': controls.Switch(`禁用`),
                'clearable': controls.Switch(`可清除`),
                'readonly': controls.Switch(`只读`),
                'transfer': controls.Switch(`transfer`)
            }
        )
    }
}