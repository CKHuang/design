import util from '../util'

const Checkbox = () => {
    return {
        tag: `Checkbox`,
        lib: `iview`,
        icon: `ios-checkbox-outline`,
        description: `多选框`,
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

const CheckboxGroup = () => {
    return {
        tag: `CheckboxGroup`,
        lib: `iview`,
        icon: `ios-checkbox-outline`,
        description: `组合多选框`,
        properties: {
            props: {
                "size": {
                    editControl: util.editControl.Select(`大小`,util.types.base.size())
                }
            }
        },
        children: [Checkbox(),Checkbox()]
    }
}


export default {
    Checkbox,
    CheckboxGroup,
    widgets: [Checkbox(),CheckboxGroup()]
}