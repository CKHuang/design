<style>
.ide-canvas-node,.ide-canvas-node-drop-area {
    display: initial;
}
</style>


<script>
    import util from '../../../libs/util'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    /**
     * 画布的函式组件，
     * 用来分析节点数
     * 做全局渲染
     */
    export default {
        name: `IDECanvasNodeTree`,
        computed: {
            ...mapGetters({
                "nodeTree": storeTypes.state.data[`nodetree`]
            })
        },
        methods: {
            ...mapMutations({
                "insert.node": storeTypes.mutations[`insert.data.nodetree.node`],
                "select.editing.node": storeTypes.mutations[`select.data.editing.node`]
            }),
            /**
             * 渲染节点
             * @param {function} h createElement
             * @param {object} nodeConfig 节点配置属性
             * @param {array}  children 子元素列表
             */
            renderNode(h,nodeConfig,children = []) {
                return h(`div`,{
                    'class': `ide-canvas-node`,
                    props: {},
                    on: {
                        contextmenu: (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            console.log(`点击了鼠标右键`,nodeConfig )
                            this[`select.editing.node`]({
                                nodeConfig
                            });
                        }
                    }
                },[h(`drop`,{
                    'class': `ide-canvas-node-drop-area`,
                    on: {
                        drop: (widgetConfig,...args) => {
                            event.preventDefault();
                            event.stopPropagation();
                            this["insert.node"]({
                                parentId: nodeConfig.id,
                                nodeConfig: {
                                    tag: widgetConfig.tag,
                                    properties: widgetConfig.properties,
                                    children: widgetConfig.children
                                }
                            })
                        }
                    }
                },[
                    h(nodeConfig.tag,nodeConfig.properties,children)
                ])])
            },
            /**
             * 采用深度遍历的方式来渲染
             * 这里发现算法有问题，看采用
             * 2048的方式来实现
             */
            renderNodeTree(h,topNode) {
                console.log(`node-tree`,util.deepClone(topNode))
                let res = [];
                const stack = [];
                const pushStack = (node) => {
                    if (node) {
                        stack.push(node);
                        if (node.children && node.children.length > 0) {
                            node.children.forEach((childNode) => {
                                pushStack(childNode);
                            })
                        }
                    }
                }
                pushStack(topNode);
                console.log(`[node tree stack]`,stack);
                let _stack = util.deepClone(stack),
                    _cache = [],
                    _hasUnMergeFinalNode = false;
                while (_stack.length > 0) {
                    const item = _stack.pop();
                    if (item.children.length == 0) {
                        _cache.push(
                            this.renderNode(h,item)
                        );
                    } else if (item.children.length > 0) {
                        const _children = _cache.splice(-item.children.length);
                        const vnode = this.renderNode(h,item,_children.reverse())
                        _cache.push(vnode);
                       
                    }
                    if (_stack.length == 0) {
                        res = _cache[0]
                    }
                }
                return res; 
            }
        },
        render(h) {
            console.log(`canvas nodeTree`,this.nodeTree)
            return this.renderNodeTree(h,{
                tag: `div`,
                properties: {
                    'class': `ide-canvas-nodetree-root`
                },
                id: `node_${util.randomStr(12)}`,
                children: util.deepClone(this.nodeTree)
            });
        }
    }
</script>