import util from '../util'

const Select = () => {
    return {
        tag: `Select`,
        lib: `iview`,
        icon: `ios-arrow-down`,
        description: `选择器`,
        properties: {
            props: {
                "multiple": {
                    editControl: util.editControl.Switch(`多选`)
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "clearable": {
                    editControl: util.editControl.Switch(`可清空`)
                },
                "filterable": {
                    editControl: util.editControl.Switch(`可搜索`)
                },
                "loading": {
                    editControl: util.editControl.Switch(`加载中`)
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "placeholder": {
                    editControl: util.editControl.Input(`占位文案`)
                },
                "not-found-text": {
                    editControl: util.editControl.Input(`空数据文案`)
                }
            }
        }
    }
}


export default {
    Select,
    widgets: [Select()]
}