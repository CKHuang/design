import node from './node'
import util from '../../libs/util'
import { EventEmitter } from 'events';

/**
 * 节点树
 * @for 
 */
export default class NodeTree extends EventEmitter{

    constructor() {
        super();
        this.nodeTree = [];
        this.nodes = {};
        this.nodeCount = 0;
        this.EVENT = {
            SET_NODETREE: `set-nodetree`,
            CHANGE_NODE_PROPS: `change-node-props`,
            INSERT_NODE: `insert-node`,
            DELETE_NODE: `delete-node`
        }
    }

    _emit(event,...args) {
        this.emit(event,...args);
    }

    _reset() {
        this.nodeTree = [];
        this.nodes = {};
        this.nodeCount = 0;
        //this._emit(this.EVENT.CHANGE)
    }

    /**
     * 解析获取控件的属性的默认值
     */
    _getWidgetConfigPropertiesDefaultValues(properties) {
        const result = {};
        for ( let i in properties ) {
            const item = properties[i];
            result[i] = {};
            for ( let k in item ) {
                if (typeof item[k].default != 'undefined') {
                    result[i][k] = item[k].default
                }
            }
        }

        return result;  
    }

  
    /**
     * 创建新节点
     * @param {object} nodeConfig 节点的配置{tag,properties}
     * @param {boolean} isNewFromWidgetConfig 从widget的配置里面初始化
     */
    createNode(nodeConfig,isNewFromWidgetConfig = true) {
        
        return node(
            nodeConfig.lib,
            nodeConfig.tag,
            isNewFromWidgetConfig ? this._getWidgetConfigPropertiesDefaultValues(
                nodeConfig.properties
            ) : nodeConfig.properties,
            nodeConfig.editOutline,
            nodeConfig.id
        )
    }
    
    /**
     * 创建复合节点
     * @param {object} nodeConfig 
     */
    createUnitNode(nodeConfig) {
        let node = null,
            lib = nodeConfig.lib,
            nodeCount = 1,
            nodes = {},
            stack = [];
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
        pushStack(nodeConfig);
        let _cache = [],
            _childNode;
        while (stack.length > 0) {
            const item = stack.pop();
            if (typeof item.lib == 'undefined') {
                item.lib = lib
            }
            if (typeof item.children == 'undefined' 
                || item.children.length == 0
            ) {
                _childNode = this.createNode(item);
                nodeCount++;
                nodes[_childNode.id] = _childNode;
                _cache.push(_childNode)
            } else if (item.children.length > 0) {
                const _topNode = this.createNode(item);
                      nodeCount++;
                      nodes[_topNode.id] = _topNode;
                const _children = _cache.splice(-item.children.length);
                      _topNode.children = _children.reverse();
                _cache.push(_topNode);
            }
            if (stack.length == 0) {
                node = _cache[0]
            }
        }
        
        return {node,nodeCount,nodes}
        
    }

    /**
     * 设置更新整棵节点树
     * @param {array} nodeTree 节点树 
     */
    set(
        nodeTree
    ) {
        this._reset();
        let  count = 0;
        const cloneNode = (nodes,newNode) => {
            nodes.forEach((item) => {
                const _node = this.createNode(item,false);
                this.nodes[_node.id] = _node;
                newNode.push(_node);
                count++;
                if (item.children.length > 0) {
                    cloneNode(item.children,_node.children)
                }
            });
        }
        let newTree = [];
        cloneNode(util.deepClone(nodeTree),newTree);
        this.nodeTree = newTree;
        this.nodeCount = count;
        this._emit(this.EVENT.SET_NODETREE,this.nodeTree);
    }

    /**
     * 删除节点以及其子节点
     * @param {string} nodeId 
     */
    delete(nodeId) {
        const node = this.find(nodeId);
        console.log(`[删除节点]nodeId`,nodeId,`node`,util.deepClone(node))
        const stack = [];
        const refNodes = []
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
        pushStack(node);
        while (stack.length > 0) {
            const item = stack.pop();
            delete this.nodes[item.id];
            this.nodeCount--;
            refNodes.push(item);
        }
        let parentNodeId,
            nodeIndex;
        const findParentNodeId = (parentId,childrens) => {
            for ( let i = 0, len = childrens.length; i < len; i++) {
                if (childrens[i].id == nodeId) {
                    parentNodeId = parentId;
                    nodeIndex = i;
                    break ;
                } else {
                    findParentNodeId(childrens[i].id,childrens[i].children);
                }
            }
        }
        findParentNodeId(null,this.nodeTree);
        parentNodeId == null 
            ? this.nodeTree.splice(nodeIndex,1)
            : this.find(parentNodeId).children.splice(nodeIndex,1)
        this._emit(this.EVENT.DELETE_NODE,refNodes);

    }

    /**
     * 添加子节点
     * @param {string|null} parentId 父节点的id
     * @param {object} nodeConfig 节点的配置 {tag,...}
     */
    insert(
        parentId = null,
        nodeConfig = {
            lib,
            tag,
            properties,
            children,
            editOutline
        },
        insertMethod = 'push',
        insertIndex = 0
    ) {
        const parent = parentId ? this.find(parentId)
                                : this.nodeTree;
        const insertAction = (parent,newNode) => {
            if (insertMethod == 'push' || insertMethod == 'unshift') {
                parent[insertMethod](newNode);
            } else if (insertMethod == 'splice') {
                parent[insertMethod](insertIndex,0,newNode)
            }
        }
        
        // 没有子节点，不是复合节点，直接创建即可
        if (typeof nodeConfig.children == 'undefined' || nodeConfig.children.length == 0) {
            const _node = this.createNode(nodeConfig);
            if (Array.isArray(parent)) {
                insertAction(parent,_node);
            } else {
                insertAction(parent.children,_node)      
            }
            this.nodes[_node.id] = _node;
            this.nodeCount++;
            this._emit(this.EVENT.INSERT_NODE,[_node]);
        } else if (nodeConfig.children.length > 0) {
            // 复合节点
            const _res = this.createUnitNode(nodeConfig);
            if ( Array.isArray(parent)) {
                insertAction(parent,_res.node);
            } else {
                insertAction(parent.children,_res.node)
            }
            const refNodes = []
            for ( let i in _res.nodes ) {
                this.nodes[i] = _res.nodes[i];
                refNodes.push(_res.nodes[i])
            }
            this.nodeCount += _res.nodeCount;
            this._emit(this.EVENT.INSERT_NODE,refNodes)
        }
        
        
        
        
    }
    /**
     * 查找某个节点
     */
    find(nodeId) {
        return this.nodes[nodeId];
    }
    /**
     * @description 更新节点的properties相关
     * @param {string} nodeId 节点id
     * @param {string} propsGroup 属性组名称
     * @param {string} fieldName 属性名称
     * @param {anyval} newValue 更新后的值
     */
    updateProperties(
        nodeId,
        propsGroup,
        fieldName,
        newValue
    ) {
        let oldValue = undefined;
        const node = this.find(nodeId);
        let set = node.properties[propsGroup];
        if (set && typeof set[fieldName] != 'undefined') {
            oldValue = set[fieldName]
        }
        if (oldValue != undefined) {
            set[fieldName] = newValue;
        } else {
            util.objExtendAttr(node.properties,propsGroup,{
                [fieldName]: newValue
            })
        }
        
        // vuex 对象新增属性的更新不会触发state，需要这样处理一下
        node.properties = Object.assign({},node.properties);
        this._emit(this.EVENT.CHANGE_NODE_PROPS,{
            nodeId,
            propsGroup,
            fieldName,
            newValue
        });
        return {
            oldValue,
            newValue
        }
        //console.log('->newNode',node);
    }
}