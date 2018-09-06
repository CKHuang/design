import types from '../types'

export default [{
    name: `Input`,
    renderTag: `Input`,
    description: `输入框`,
    props: {
        "type": {
            editControl: {
                control: types.Control.Select,
                args: [
                    {value:`text`,label:`text`},
                    {value:`password`,label:`password`},
                    {value:`textarea`,label:`textarea`},
                    {value:`url`,label:`url`},
                    {value:`email`,label:`email`},
                    {value:`date`,label:`date`}
                ]
            }
        },
        "size": {
            editControl: {
                control: types.Control.Select,
                args: [
                    {value:`small`,label:`small`},
                    {value:`default`,label:`default`},
                    {value:`large`,label:`large`}
                ]
            }
        }
    }
}]