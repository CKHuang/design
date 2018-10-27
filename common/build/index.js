import util from '../../src-client/libs/util'

const helper = {
    tabSpace(depth) {
        let  tabs = [],
            tab = `    `;
        while(depth > 0) {
            tabs.push(tab);
            depth--
        }
        return tabs.join(``);
    },
    properties(nodeConfig) {
        const properties = nodeConfig.properties,
              style = properties.style || {},
              props = properties.props || {},
              domProps = properties.domProps || {},
              depth = properties.depth,
              attrs = properties.attrs || {},
              toDomAttrArr = (_attrs_) => {
                 const res = []
                 for (let i in _attrs_) {
                     let value,
                         typeValue = typeof _attrs_[i],
                         vBind = typeValue != 'variable' ? '' : ':';
                     if (typeValue == 'number') {
                         value = `'${_attrs_[i]}'`
                         vBind = ':'
                     } else if (typeValue == 'string') {
                         value = `'${_attrs_[i]}'`
                     } else if (typeValue == 'boolean') {
                         value = null
                     }
                     if (typeValue == 'boolean' && props[i] == true) {
                         res.push(`${i}`)
                     } else if (value != null) {
                         res.push(`${vBind}${i}=${value}`)
                     }
                 }
                 return res;
              };
        let exp = [];
        exp.push(`:style='${JSON.stringify(style)}'`);
        exp = exp.concat(
            toDomAttrArr(props),
            toDomAttrArr(attrs)
        )
        return exp.join(' ');
    },
    pageName(pageConfig) {
        return pageConfig.router_name;
    },
    replace(content,obj) {
        for ( let i in obj ) {
            let str = ``
            if (typeof obj[i] == 'function') {
                str = obj[i]()
            } else if (typeof obj[i] == 'object') {
                str = JSON.stringify(obj[i])
            } else if (typeof obj[i] == 'number') {
                str = String(obj[i])
            } else {
                str = obj[i];
            }
            content = content.replace(
                new RegExp('\\$\{'+i+'\}','g'),
                str
            );
        }
        return content
    },
    projectKey(project) {
        return project.name;
    }
}

export default {
    helper: helper,
    /**
     * @description 构建出来页面的模版
     * @param {array} nodetree 节点树
     * @param {number} mode 模版类型,1:生成.vue使用的templte,2:生成runtime使用的,editor模式
     */
    template(nodetree, mode = 1) {
        try {
            let   topNodeTree = {
                        tag: `div`,
                        properties: {
                            "style": {
                                "minHeight": "100%",
                                "minWidth": "100%",
                                "position": "releative",
                                "zIndex": 1
                            }
                        },
                        id: `nodetree_root`,
                        children: nodetree
                    },
                    _stack = [],
                    _depth = 1;
            const renderNode = (nodeConfig,children) => {
                const tag = nodeConfig.tag,
                    _space = helper.tabSpace(nodeConfig.depth);
                let childrenTmpl = ``;
                if (mode == 2) {
                    util.objExtendAttr(nodeConfig.properties,'attrs',{
                        id: nodeConfig.id,
                        'data-node': '1'
                    })
                }
                const properties = nodeConfig.properties;
                if (Array.isArray(children) && children.length > 0) {
                    childrenTmpl = `${children.join(`\r\n`)}`
                }
                if (properties.domProps && properties.domProps.innerHTML) {
                    childrenTmpl = `${helper.tabSpace(nodeConfig.depth+1)}${properties.domProps.innerHTML}`
                }  
                let exp = [
                    `${_space}<${tag} ${helper.properties(nodeConfig)}>`,
                    `${_space}</${tag}>`
                ]
                if (childrenTmpl != ``) {
                    exp.splice(1,0,childrenTmpl)
                }
                return exp.join(`\r\n`);   
            }
            const pushStack = (node) => {
                if (node) {
                    _stack.push(node);
                    if (node.children && node.children.length > 0) {
                        _depth++;
                        node.children.forEach((childNode,index) => {
                            pushStack(childNode)
                            if (index == node.children.length - 1) {
                                _depth--;
                            }
                        })
                    }
                    node.depth = _depth; 
                }
            }
            pushStack(topNodeTree);
            let _cache = [];
            while (_stack.length > 0) {
                const item = _stack.pop();
                if (item.children.length == 0) {
                    _cache.push(
                        renderNode(item)
                    )
                } else if (item.children.length > 0) {
                    const _children = _cache.splice(-item.children.length);
                    const tnode = renderNode(item,_children.reverse());
                    _cache.push(tnode)
                }
            }
            return mode == 1 ? [
                `<template>`,
                `${_cache[0]}`,
                `</template>`
            ].join(`\r\n`) : _cache[0]
        } catch (error) {
            console.error(error)
        }
    }
}