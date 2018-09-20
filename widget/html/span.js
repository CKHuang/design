import types from '../types'

export default [{
    tag: `span`,
    lib: `html`,
    description: `文本`,
    properties: {
        domProps: {
            "innerText": {
                editControl: {
                    label: `文案`,
                    control: types.Control.Input
                },
                default: `文案`
            }
        }
    }
}]