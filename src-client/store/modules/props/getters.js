export default {
    /**
     * @description 获取正在编辑的节点以及属性
     */
    editingProps(state) {
        return state.editingProps;
    },
    /**
     * @description 属性编辑器可见状态 
     */
    propEditorVisiabled(state) {
        return state.propEditorVisiabled
    }
}