import util from '../util'

const Rate = () => {
    return {
        tag: `Rate`,
        lib: `iview`,
        icon: `icon-ios-star`,
        description: `评分`,
        properties: {
            props: {
                "count": {
                    editControl: util.editControl.InputNumber(`总数`)
                },
                "allow-half": {
                    editControl: util.editControl.Switch(`可半选`)
                },
                "disabled": {
                    editControl: util.editControl.Switch(`只读`)
                },
                "show-text": {
                    editControl: util.editControl.Switch(`提示文字`)
                },
                "clearable": {
                    editControl: util.editControl.Switch(`可清除`)
                },
                "character": {
                    editControl: util.editControl.Input(`自定字符`)
                },
                "icon": {
                    editControl: util.editControl.Select(`图标`,util.types.icon.type())
                }
            }
        }
    }
}