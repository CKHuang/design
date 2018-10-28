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
    propsKey(nodeId,groupName,attrName) {
        return `${nodeId}_${groupName}_${attrName}`.replace(/\-/g,'_')
    },
    /**
     * @param {number} mode 1表示在属性上面设置变量，然后生成对应的变量对象针对生成.vue文件使用，2表示直接在属性上面设置值,针对预览使用
     */
    properties(nodeConfig,mode = 1) {
        const nodeId = nodeConfig.id,
              properties = nodeConfig.properties,
              style = properties.style || {},
              props = properties.props || {},
              domProps = properties.domProps || {},
              depth = properties.depth,
              attrs = properties.attrs || {},
              vueTemplateFilters = ['attrs_id','attrs_data-node'],
              toDomAttrArr = (_attrs_,groupName) => {
                 const res = []
                 for (let i in _attrs_) {
                     let value,
                         typeValue = typeof _attrs_[i],
                         vBind = typeValue != 'variable' ? '' : ':';
                    if (mode == 2) {
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
                    } else if (mode == 1) {
                        if (vueTemplateFilters.includes(`${groupName}_${i}`)) {
                            continue ;
                        }
                        vBind = ":";
                        let propKey = this.propsKey(
                            nodeId,groupName,i
                        )
                        res.push(`${vBind}${i}='${propKey}'`)
                        renderData[propKey] = _attrs_[i]
                    }  
                 }
                 return res;
              },
              renderData = {};
        let exp = [];
        exp.push(`:style='${JSON.stringify(style)}'`);
        exp = exp.concat(
            toDomAttrArr(props,'props'),
            toDomAttrArr(attrs,'attrs')
        )
        return {
            renderStr: exp.join(' '),
            renderData: renderData
        };
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
                    _depth = 1,
                    renderData = {},
                    renderTmplate = ``;
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
                    if (mode == 1) {
                        const innerHTMLKey = `${helper.propsKey(nodeConfig.id,'domProps','innerHTML')}`
                        childrenTmpl = `${helper.tabSpace(nodeConfig.depth+1)}{{${innerHTMLKey}}}`
                        renderData[innerHTMLKey] = properties.domProps.innerHTML
                    } else if (mode == 2) {
                        childrenTmpl = `${helper.tabSpace(nodeConfig.depth+1)}${properties.domProps.innerHTML}`
                    }
                }  
                const propsRes = helper.properties(nodeConfig,mode);
                util.extend(renderData,propsRes.renderData)
                let exp = [
                    `${_space}<${tag} ${propsRes.renderStr}>`,
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
            renderTmplate = mode == 1 ? [
                `<template>`,
                `${_cache[0]}`,
                `</template>`
            ].join(`\r\n`) : _cache[0]
            return {
                renderTmplate: renderTmplate,
                renderData: renderData
            }
        } catch (error) {
            console.error(error)
        }
    }
}