import util from '../../util'

export default (defVals = {}) => {
    const editControl = {
        "background": {
            editControl: util.editControl.ColorPicker(`背景色`)
        },
        "paddingLeft": {
            editControl: util.editControl.Input(`内边距(左)`),
        },
        "paddingRight": {
            editControl: util.editControl.Input(`内边距(右)`),
            
        },
        "paddingTop": {
            editControl: util.editControl.Input(`内边距(上)`),
            
        },
        "paddingBottom": {
            editControl: util.editControl.Input(`内边距(下)`),
        }
    }
    for ( let i in defVals ) {
        if (editControl[i]) {
            editControl[i].default = defVals[i]
        }
    }
    console.log('--->editControl',editControl)
    return editControl
}