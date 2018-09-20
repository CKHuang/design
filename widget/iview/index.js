import types from '../types'
import Button from './Button'
import Card from './Card'
import Menu from './Menu'

export default {
    name: `iview`,
    version: `3.0.0`,
    description: `iview的组件`,
    widgetGroups: [{
        label: `基础`,
        widgets: [].concat(
            Button
        )
    },{
        label: `布局`,
        widgets: [].concat(
            Card
        )
    },{
        label: `导航`,
        widgets: [].concat(
            Menu
        )
    },{
        label: `表单`,
        widgets: [{
            tag: `Input`,
            description: `输入框`,
            properties: {
                props: {
                    "type": {
                        editControl: {
                            control: types.Control.Select,
                            arguments: [
                                {value:`text`,label:`text`},
                                {value:`password`,label:`password`},
                                {value:`textarea`,label:`textarea`},
                                {value:`url`,label:`url`},
                                {value:`email`,label:`email`},
                                {value:`date`,label:`date`}
                            ]
                        },
                        default: `text`
                    },
                    "size": {
                        editControl: {
                            control: types.Control.Select,
                            arguments: [
                                {value:`small`,label:`small`},
                                {value:`default`,label:`default`},
                                {value:`large`,label:`large`}
                            ]
                        },
                        default: `default`
                    }
                }
            }
            
        },{
            tag: `Radio`,
            description: `单选框`,
            properties: {
                props: {
                    "size": {
                        editControl: {
                            control: types.Control.Select,
                            arguments: [
                                {value:`small`,label:`small`},
                                {value:`default`,label:`default`},
                                {value:`large`,label:`large`}
                            ]
                        },
                        default: `small`
                    }
                }
            }
        }]
    }]
}