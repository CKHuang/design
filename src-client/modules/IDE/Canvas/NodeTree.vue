<script>
    import util from '../../../libs/util'
    import { mapGetters, mapMutations, mapActions } from 'vuex'

    /**
     * 画布的函式组件，
     * 用来分析节点数
     * 做全局渲染
     */
    export default {
        name: `IDECanvasNodeTree`,
        props: {
            /**
             * 节点树
             */
            nodeTree: {
                type: Array,
                default: () => ([])
            }
        },
        methods: {
            ...mapMutations([
                `SHOW_IDE_PROP_EDIT`,
                `SET_EDIT_PROPS`
            ]),
            wrapDrop(h,node) {
                return h(`div`,{
                    'class': `diy-drop`,
                    props: {},
                    on: {
                        contextmenu: (event) => { 
                            event.preventDefault();
                            event.stopPropagation();
                            this.SHOW_IDE_PROP_EDIT(true);
                            this.SET_EDIT_PROPS({nodeId:node.id});
                            console.log(`点击了鼠标右键`,event,node)
                        }
                    }
                },[node])
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
                            this.wrapDrop(h,h(item.tag,item.properties))
                        );
                    } else if (item.children.length > 0) {
                        const _children = _cache.splice(-item.children.length);
                        const vnode = this.wrapDrop(h,h(item.tag,item.properties,_children.reverse()));
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