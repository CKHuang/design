import Widget from '../../../base/Widget'
import controls from '../../../base/controls'
import IMenuItem from './IMenuItem'



export default class IMenu extends Widget {
    constructor(opts = {
        menuitems: [new IMenuItem().getConfig()]
    }){
        super(
            `Menu`,
            `iview`,
            `Menu`,
            {
                "mode": controls.Select(`模式`,{
                    options: [
                        {value:`horizontal`,label:`水平`},
                        {value:`vertical`,label:`垂直`}
                    ]
                }),
                "theme": controls.Select(`主题`,{
                    options: [
                        {value:`light`,label:`light`},
                        {value:`dark`,label:`dark`},
                        {value:`primary`,label:`primary`}
                    ]
                }),
                "active-name": controls.Input(`激活`)
            }
        )
        this.props = {
            "mode": "horizontal"
        }
        this.style = {
            "paddingLeft": "10px",
            "paddingRight": "10px"
        }
    }
}