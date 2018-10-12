import util from '../util'

const Cascader = () => {
    return {
        tag: `Cascader`,
        lib: `iview`,
        description: `级联选择`,
        properties: {
            props: {
                "data": {
                    editControl: util.editControl.Input(`可选数据源`),
                    default: []
                },
                "value": {
                    
                }
            }
        }
    }
}