import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import Span from '../../../libs/html/Span'

export default class Button extends Widget {
    constructor(opts = {text: '按钮'}) {
        super(
            `Button`,
            `iview`,
            `Button`,
            {
                'type': controls.Select(`类型`,{
                    options: [
                        {value:`default`,label:`default`},
                        {value:`primary`,label:`primary`},
                        {value:`dashed`,label:`dashed`},
                        {value:'text',label:`text`},
                        {value:`info`,label:`info`},
                        {value:`success`,label:`success`},
                        {value:`warning`,label:`warning`},
                        {value:`error`,label:`error`}
                    ]
                }),
                'ghost': controls.Switch(`幽灵按钮`),
                'size': controls.Select(`大小`,{
                    options: [
                        {value:`large`,label:`large`},
                        {value:`default`,label:`default`},
                        {value:`small`,label:`small`}
                    ]
                }),
                'shape': controls.Switch(`形状`,{
                    options: [
                        {value:`circle`,label:`circle`},
                        {value:`default`,label:`default`}
                    ]
                }),
                'long': controls.Switch(`长按钮`),
                'html-type': controls.Select(`原生类型`,{
                    options: [
                        {value:`button`,label:`button`},
                        {value:`submit`,label:`submit`},
                        {value:`reset`,label:`reset`}
                    ]
                }),
                'disabled': controls.Switch(`禁用`),
                'loading': controls.Switch(`加载中`),
                'icon': controls.Select(`icon`,{
                    options: [
                        {value:`alarm`,label:`alarm`},
                        {value:`add-circle-outline`,label:`add-circle-outline`}
                    ]
                }),
                'to': controls.JumpInput(`跳转`)
            },
            [new Span({text:opts.text}).getConfig()]
        )
    }
}