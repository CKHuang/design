import util from '../util'

const Switch = () => {
    return {
        tag: `i-switch`,
        lib: `iview`,
        icon: `ios-switch`,
        description: `开关`,
        properties: {
            props: {
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "loading": {
                    editControl: util.editControl.Switch(`加载中`)
                }
            }
        }
    }
}

export default {
    Switch,
    widgets: [Switch()]
}