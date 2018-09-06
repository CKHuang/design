import types from '../types'

export default [{
    name: `Radio`,
    renderTag: `Radio`,
    description: `单选框`,
    props: {
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