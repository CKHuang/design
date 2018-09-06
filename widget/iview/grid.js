import types from '../types'

export default [{
    name: `Row`,
    renderTag: `Row`,
    description: `行`,
    props: {
        "type": {
            editControl: {
                control: types.Control.Select,
                args: [{value:`flex`,label:`flex`}]
            }
        },
        "algin": {
            editControl: {
                control: types.Control.Select,
                args: [
                    {value:`top`,label:`top`},
                    {value:`bottom`,label:`bottom`},
                    {value:`middle`,label:`middle`}
                ]
            }
        },
        "justify": {
            editControl: {
                control: types.Control.Select,
                args: [
                    {value:`start`,label:`start`},
                    {value:`end`,label:`end`},
                    {value:`center`,label:`center`},
                    {value:`space-around`,label:`space-around`},
                    {value:`space-between`,label:`space-between`}
                ]
            }
        },
        "class-name": {
            editControl: {
                control: types.Control.Input
            }
        }
    }
},{
    name: `Col`,
    renderTag: `Col`,
    description: `列`,
    props: {
        "span": {
            editControl: {
                control: types.Control.Input
            }
        },
        "offset": {
            editControl: {
                control: types.Control.Input
            }
        }
    }
}]