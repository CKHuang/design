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

    data: {
        /**
         * 返回树结构使用的数据
         * @param {array} nodes 树类型数据，有children
         */
        tree(nodes) {
            return recursion(nodes);
        }
    }    
}