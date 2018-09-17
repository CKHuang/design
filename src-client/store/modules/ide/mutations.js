import types from './types'

export default {
    /**
     * 优化的
     */
    /**
     * @description 更新ide的加载状态
     * @param {boolean} isLoading 是否加载中
     */
    [types.mutations["update.ide.loading"]](state,isLoading) {
        return Object.assign(state,{
            [types.state.ui["ide.loading"]]: isLoading
        })
    },

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
        this.commit(types.mutations["insert.editor.record"],{
            mod: state[types.state.data["record.mod"]][`node`],
            act: state[types.state.data["record.act"]][`insert`],
            config: null,
            newValue: {parentId,nodeConfig,mode},
            oldValue: null
        })
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
        const { oldValue } = state[types.state.data["nodetree.instance"]].updateProperties(
            nodeId,
            propsGroup,
            fieldName,
            newValue
        )
        this.commit(types.mutations["insert.editor.record"],{
            mod: state[types.state.data["record.mod"]][`node.properties`],
            act: state[types.state.data["record.act"]][`update`],
            config: {nodeId,propsGroup,fieldName,newValue},
            newValue: newValue,
            oldValue: oldValue
        })
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
    },
    /**
     * @description 更新当前编辑的项目信息
     * @param {project} project
     */
    [types.mutations["update.data.project"]](
        state,
        project
    ) {
        return Object.assign(state,{
            [types.state.data[`project`]]: project
        })
    },
    /**
     * @description 更新当前编辑项目所属的页面列表
     * @param {array} pageList
     */
    [types.mutations["update.data.project.page.list"]](
        state,
        pageList
    ) {
        return Object.assign(state,{
            [types.state.data["project.page.list"]]: pageList
        })
    },
    /**
     * @description 选择当前正在编辑的页面
     * @param {page} page
     */
    [types.mutations["select.data.editing.page"]](
        state,
        page
    ) {
        return Object.assign(state,{
            [types.state.data["page.editing"]]: page
        })
    }
}