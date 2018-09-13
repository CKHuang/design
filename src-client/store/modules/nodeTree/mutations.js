import {
    INSERT_NODE,
    DELETE_NODE,
    UPDATE_NODE,
    SET_NODETREE
} from '../../mutation-types'

export default {
    /**
     * 设置节点树
     * @param {array} nodeTree 节点树的配置
     */
    [SET_NODETREE](state,{nodeTree}) {
        console.log(`[SET_NODETREE]nodeTree`,nodeTree);
        state.nodeTree.set(nodeTree);
    },
    /**
     * 在节点树插入节点对象
     * @param {object} parentId 父亲节点的id，如果是顶级则这个为null
     * @param {object} node 节点配置
     * @param {string} mode 插入的方式，push、unshift，默认是push
     */
    [INSERT_NODE](state,{parentId,node,mode = 'push'}) {
        console.log(`[INSERT_NODE]parentId`,parentId,`node`,node)
        state.nodeTree.insert(
            parentId,
            node,
            mode
        )
    },
    /**
     * 删除节点
     * @param {string} nodeId 节点的id
     */
    [DELETE_NODE](state,{nodeId}) {
        state.nodeTree.delete(
            nodeId
        )
    },
    [UPDATE_NODE](state) {
        
    }
}