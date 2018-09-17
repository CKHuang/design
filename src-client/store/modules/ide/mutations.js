import types from './types'

export default {
    /**
     * 优化的
     */

    /**
     * @description 切换code面板不同的tab
     * @param {string} tab 面板名称,template
     */
    [types.mutations["toggle.ui.code.spread"]](state,tab) {
        if ( tab != state[types.state.ui["code.actived"]] ) {
            return Object.assign(state,{
                [types.state.ui["code.actived"]]: tab,
                [types.state.ui["code.spread"]]: true
            })
        } else {
            return Object.assign(state,{
                [types.state.ui["code.actived"]]: ``,
                [types.state.ui["code.spread"]]: false
            })
        }
    },
    /**
     * @description 更新当前选中的组件库
     * @param {stirng} lib 组件库的名称
     */
    [types.mutations["update.data.widget.lib"]](state,lib) {
        return Object.assign(state,{
            [types.state.data["widget.lib"]]: lib
        })
    },
    /**
     * @description 在节点树插入节点对象
     * @param {object} parentId 父亲节点的id，如果是顶级则这个为null
     * @param {object} nodeConfig 节点配置
     * @param {string} mode 插入的方式，push、unshift，默认是push
     */
    [types.mutations["insert.data.nodetree.node"]](
        state,
        {parentId,nodeConfig,mode = 'push'}
    ) {
        nodeConfig.lib = state[types.state.data["widget.lib"]];
        state[types.state.data["nodetree.instance"]].insert(
            parentId,
            nodeConfig,
            mode
        )
    },
    /**
     * @description 更换正在编辑的节点
     * @param {object} nodeConfig
     */
    [types.mutations["select.data.editing.node"]](
        state,
        {nodeConfig}
    ) {
        return Object.assign(state,{
            [types.state.data["node.editing"]]: nodeConfig 
        })
    },
    /**
     * @description 修改正在编辑节点的properties属性
     * @param {string} nodeId 节点ID
     * @param {string} propsGroup 属性组
     * @param {string} fieldName 属性名称
     * @param {string} newValue 更新后的值
     */
    [types.mutations["update.data.editing.node.properties"]](
        state,
        {nodeId,propsGroup,fieldName,newValue}
    ) {
        state[types.state.data["nodetree.instance"]].updateProperties(
            nodeId,
            propsGroup,
            fieldName,
            newValue
        )
    },
    /**
     * @description 添加编辑记录
     * @param {number} mod 模块
     * @param {number} act 行为
     * @param {object} config 配置
     * @param {anyval} newValue 新的值
     * @param {anyval} oldValue 旧的值
     */
    [types.mutations["insert.editor.record"]](
        state,
        {mod,act,config,newValue,oldValue}
    ) {
        state[types.state.data["record.instance"]].push(
            mod,
            act,
            config,
            newValue,
            oldValue
        )
    }
}