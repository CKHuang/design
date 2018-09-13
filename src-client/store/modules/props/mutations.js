import {
    SET_EDIT_PROPS,
    HIDE_IDE_PROP_EDIT,
    SHOW_IDE_PROP_EDIT
} from '../../mutation-types'

export default {

    /**
     * 设置要编辑的属性
     * @param {string} nodeId 节点的ID
     */
    [SET_EDIT_PROPS](state,{nodeId}) {
        return Object.assign(state,{
            editingProps : {
                nodeId: nodeId
            }
        })
    },
    /**
     * 显示属性编辑器
     */
    [SHOW_IDE_PROP_EDIT](state) {
        return Object.assign(state,{
            propEditorVisiabled: true
        })
    },
    /**
     * 隐藏属性编辑器
     */
    [HIDE_IDE_PROP_EDIT](state) {
        return Object.assign(state,{
            propEditorVisiabled: false
        })
    }
}