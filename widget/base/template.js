export default (nodetree) => {
    const stack = [];
    let   res = [];
    const node = (config,children = []) => {
        const Tag = config.tag,
              properties = config.properties || null,
              description = config.description ? config.description : null;
        const tag = description ? new Tag(description) : new Tag();
        if (properties) {
            for (let i in properties) {
                tag[i] = properties[i]
            }
        }
        tag.children = children;
        return tag.getConfig();
    }
    const pushStack = (node) => {
        if (node) {
            stack.push(node);
            if (node.children && node.children.length > 0) {
                node.children.forEach((childNode) => {
                    pushStack(childNode)
                })
            }
        }
    }
    pushStack(nodetree);
    let _cache = [];
    while (stack.length > 0) {
        const item = stack.pop();
        if (!item.children || item.children.length == 0) {
            _cache.push(
                node(item)
            )
        } else if (item && item.children.length > 0) {
            const _children = _cache.splice(-item.children.length);
            _cache.push(
                node(item,_children.reverse())
            )
        }
        if (stack.length == 0) {
            res = _cache[0]
        }
    }
    return res;

   
}