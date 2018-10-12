import util from '../util'

const Radio = () => {
    return {
        tag: `Radio`,
        lib: `iview`,
        icon: `ios-radio-button-on`,
        description: `单选框`,
        properties: {
            props: {
                "label": {
                    editControl: util.editControl.Input(`标签`),
                    default: `标签`
                },
                "disabled": {
                    editControl: util.editControl.Switch(`禁用`)
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                }
            }
            
        }
    }
}

const RadioGroup = () => {
    return {
        tag: `RadioGroup`,
        lib: `iview`,
        icon: `ios-radio-button-on`,
        description: `组合单选框`,
        properties: {
            props: {
                "type": {
                    editControl: util.editControl.Select(`类型`,util.types.radio.radioGroupType()),
                    default: `button`
                },
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                },
                "vertical": {
                    editControl: util.editControl.Switch(`垂直`)
                }
            } 
        },
        children:[Radio(),Radio()]
    }
}

export default {
    Radio,
    RadioGroup,
    widgets: [Radio(),RadioGroup()]
}