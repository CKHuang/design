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
            CHANGE: `change`
        }
    }

    _emit(event,...args) {
        this.emit(event,...args);
    }

    _reset() {
        this.nodeTree = [];
        this.nodes = {};
        this.nodeCount = 0;
        this._emit(this.EVENT.CHANGE)
    }

    /**
     * 解析获取控件的属性的默认值
     */
    _getPropertiesDefaultValues(properties) {
        const result = {};
        for ( let i in properties ) {
            const item = properties[i];
            result[i] = {};
            for ( let k in item ) {
                result[i][k] = item[k].default
            }
        }
        return result;  
    }

    /**
     * 创建新节点
     * @param {object} nodeConfig 节点的配置{tag,properties}
     */
    createNode(nodeConfig) {
        return node(
            nodeConfig.tag,
            this._getPropertiesDefaultValues(
                nodeConfig.properties
            ),
            nodeConfig.id
        )
    }
    

    /**
     * 设置更新整棵节点树
     * @param {array} nodeTree 节点树 
     */
    set(
        nodeTree
    ) {
        const nodes = {};
        let   count = 0;
        const tree = util.traverse(nodeTree,(item) => {
            if (typeof item != 'string' && item.children.length > 0) {
                return item.children;
            }
            return null;
        },(item,result) => {
            item.children = result;
            return item;
        },(nodeConfig) => {
            const _node = this.createNode({
                tag: typeof nodeConfig == 'string' ? `span` : nodeConfig.tag,
                properties: typeof nodeConfig == 'string' ? {} : nodeConfig.properties
            })
            nodes[_node.id] = _node;
            count++;
            if (typeof nodeConfig != 'string') {
                nodeConfig.id = _node.id;
            }
        });
        this.nodeTree = tree;
        this.nodeCount = count;
        this.nodes = nodes;
        this._emit(this.EVENT.CHANGE);
    }

    /**
     * 添加子节点
     * @param {string|null} parentId 父节点的id
     * @param {object} nodeConfig 节点的配置 {tag,...}
     */
    insert(
        parentId = null,
        nodeConfig = {
            tag,
            properties
        },
        mode = 'push'
    ) {
        const parent = parentId ? this.find(parentId)
                                : this.nodeTree;
        const _node = this.createNode(nodeConfig)
        if (Array.isArray(parent)) {
            parent[mode](_node);
        } else {
            parent.children[mode](_node);
        }
        this.nodes[_node.id] = _node;
        this.nodeCount++;
        this._emit(this.EVENT.CHANGE);
    }
    /**
     * 查找某个节点
     */
    find(nodeId) {

    }
}