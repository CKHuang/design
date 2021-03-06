export default (nodetree) => {
    const stack = [];
    let   res = [];
    const node = (config,children = []) => {
        const Tag = config.tag,
              properties = config.properties || null,
              opts = config.opts ? config.opts : null;
        const tag = opts ? new Tag(opts) : new Tag();
        if (properties) {
            for (let i in properties) {
                tag[i] = properties[i]
            }
        }
        if (tag.children.length == 0) {
            tag.children = children
        }
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