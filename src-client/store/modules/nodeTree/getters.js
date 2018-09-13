
const recursion = (nodes) => {
    const res = [];
    nodes.forEach((item) => {
        if (typeof item == 'string') {
            res.push({
                title: item,
                expand: false,
                children: []
            })
        } else {
            res.push({
                title: item.tag,
                expand: item.children.length > 0,
                children: recursion(item.children)
            })
        } 
    })
    return res;
}

export default {
    node: (state) => (id) => {
        const nodeTree = state.nodeTree;
        let node = nodeTree;
        
    },
    nodeTree: (state) => {
        return state.node_tree;
    },
    /**
     * 组件树的树结构数据
     */
    tree_nodeTree(state) {
        return recursion(state.node_tree);
    },

    code_nodeTree(state) {

    }
}