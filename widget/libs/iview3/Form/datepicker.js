import util from '../util'

const DatePicker = () => {
    return {
        tag: `DatePicker`,
        lib: `iview`,
        icon: `ios-calendar-outline`,
        description: `日期选择器`,
        properties: {
            props: {
                "type": {
                    editControl: util.editControl.Select(`类型`,util.types.datepicker.type())
                },
                "format": {
                    editControl: util.editControl.Input(`日期格式`)
                },
                "placement": {
                    editControl: util.editControl.Select(`出现位置`,util.types.base.placement())
                },
                "placeholder": {
                    editControl: util.editControl.Input(`占位文本`)
                },
                "split-panels": {
                    editControl: util.editControl.Switch(`不联动`)
                },
                "multiple": {
                    editControl: util.editControl.Switch(`日期多选`)
                },
                "start-date": {
                    editControl: util.editControl.Input(`起始日期`)
                },
                "confirm": {
                    editControl: util.editControl.Switch(`确认关闭`)
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "clearable": {
                    editControl: util.editControl.Switch(`可清除`)
                },
                "readonly": {
                    editControl: util.editControl.Switch(`只读`)
                }
            }
        }
    }   
}


export default {
    DatePicker,
    widgets: [DatePicker()]
}