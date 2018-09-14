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
        state[types.state.data["nodetree.instance"]].insert(
            parentId,
            nodeConfig,
            mode
        )
    }
}