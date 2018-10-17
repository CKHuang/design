<style scoped>
.ide-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
}
.ide-canvas-scroll-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
}
.ide-canvas-drawboard {
    
    position: absolute;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    /* justify-content: center; */
    -ms-flex-align: center;
    /* align-items: center; */
    overflow: scroll;
    padding: 300px;
    flex-direction: column;
}
.ide-canvas-content {
    width: 320px;
    height: 560px;
    background-color: #fff;
    position: relative;
    /* border: 1px dashed #e1e1e1; */
    /* border-color: #CDB; */
    box-shadow: 0 2px 30px 0 rgba(213,213,213,0.50);
}
.ide-canvas-content-inner {
    width: 100%;
    height: 100%;
    position: relative;
}
.ide-canvas-info {
    padding-right: 5px;
    color: #999;
}
.ide-canvas-no-select {
    position: absolute;
    width: 100%;
    color: #999;
    font-size: 24px;
    position: absolute;
    width: 100%;
    color: #999;
    font-size: 24px;
    text-align: center;
    /* height: 100%; */
    top: 50%;
    margin-top: -18px;

}
</style>

<style>
/*
 * 拖拽预览的展位对象
 */
/* .ide-canvas-widget-placeholder {
    border: 1px solid #2d8cf0;
    background-color: #f0faff;
    display: inline-block;
    width: 100%;
    opacity: .6;
    height: 40px;
} */

.ide-canvas-widget-placeholder{
    background-color:green;
    opacity: .6;
    position: fixed;
    top:0px;
    left:0px;
}
</style>


<template>
    <div class="ide-canvas">
        <Preview></Preview>
        
        <div class="ide-canvas-scroll-view">
            <div class="ide-canvas-no-select" v-if="pageEditing == null">
                <Icon type="ios-alert-outline" />
                <span>没有选中任何页面</span>
            </div>
            <div class="ide-canvas-drawboard" v-else>
                <div class="ide-canvas-info pad-b-sm ">
                    <span class="text-left">{{pageEditing.name}}</span>
                    <span class="text-right pull-right">{{pageEditing.page_width}} x {{pageEditing.page_height}}</span>
                </div>
                <div class="ide-canvas-content" ref="canvas" :style="{'width':`${pageEditing.page_width}px`,'height':`${pageEditing.page_height}px`}">
                    <drop 
                        @drop="handleDrop(`foo`,...arguments)"
                        @dragleave="handleLeave(`dragleave`)"
                        @dragover="handleDragOver(`dragOver`,...arguments)"
                        class="ide-canvas-content-inner"
                    >
                        <div 
                            class="ide-canvas-content-inner"
                            @click.capture="handleSelectNode"
                            @mouseover="handleMouseOver"
                            @mouseleave="handleMouseOut"
                        >
                            <NodeTree></NodeTree>
                            <HoverPlaceHover></HoverPlaceHover>
                            <EditNode></EditNode>
                        </div>
                        <div ref="placeholder" class="ide-canvas-widget-placeholder" id="ide-canvas-widget-placeholder"></div>
                    </drop>
                </div>
            </div>
        </div>
        <PropsEditor></PropsEditor>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import NodeTree from './NodeTree'
    import PropsEditor from '../PropsEditor/index.vue'
    import Preview from './preview'
    import HoverPlaceHover from './hoverPlaceholder.vue'
    import EditNode from './EditNode.vue'
    import util from '../../../libs/util';

    export default {
        name: `IDECanvas`,
        components: {
            NodeTree: NodeTree,
            PropsEditor: PropsEditor,
            HoverPlaceHover: HoverPlaceHover,
            EditNode: EditNode,
            Preview: Preview
        },
        computed: {
            ...mapGetters({
                "pageEditing": storeTypes.state.data[`page.editing`],
                "canvasRef": storeTypes.state.ui[`ide.canvas.ref`],
                "hoverPlaceOffset": storeTypes.state.ui[`ide.canvas.hover.placeholder.offset`],
                "queryNode": storeTypes.getters[`data.nodetree.node`]
            })
        },
        data() {
            return {
                attachNode: ``,
                placeholderRef: null,
                dragPosition: {x:-1,y:-1},
                insertIndex: 0,
                insertMethod: `push`
            }
        },
        updated() {
            this.$nextTick(function(){
                this[`update.canvas.ref`](this.$refs['canvas'])
            })
        },
        methods: {
            handleDragOver(foo,widgetConfig) {
                if (event.x != this.dragPosition.x || event.y != this.dragPosition.y) {
                    this.dragPosition.x = event.x;
                    this.dragPosition.y = event.y;
                    this.attachNode = this.logicFindNearestNode(event);
                    /**
                     * @description 如果this.attachNode是null表示是要依附到根节点
                     */
                    if (this.attachNode) {
                        const attachNode = document.querySelector(`#${this.attachNode}`),
                              attachNodeDim = attachNode.getBoundingClientRect(),
                              nodeConfig = this.queryNode(this.attachNode),
                              children = nodeConfig.children,
                              childNodes = [],
                              childNodeDims = [];
                        children.forEach((child) => {
                            const node = document.querySelector(`#${child.id}`)
                            childNodes.push(node);
                            childNodeDims.push(node.getBoundingClientRect())
                        });
                        /**
                         * @description 计算pos这个鼠标的点在哪个位置
                         * method: after、before、on
                         * index: index of child
                         */
                        let poses = [],
                            dimRight = 0,
                            dimDown = 0,
                            xCenter = 0,
                            yCenter = 0,
                            dragX = this.dragPosition.x,
                            dragY = this.dragPosition.y;
                        childNodeDims.forEach((dim,index) => {
                            let method;
                            dimRight = dim.x + dim.width;
                            dimDown = dim.y + dim.height;
                            xCenter = dim.x + dim.width / 2;
                            yCenter = dim.y + dim.height / 2;
                            if (dragX < dim.x) {
                                method = `before`
                            } else if (dragX > dimRight) {
                                method = 'after'
                            }
                            if (dragY < dim.y) {
                                method = `before`
                            } else if (dragY > dimDown) {
                                method = 'after'
                            } 
                            poses.push(method)
                        });
                        /**
                         * @description 根据位置信息算出来要设置placeholder的位置
                         */
                        let action = 'push',
                            index = 0,
                            nearestBeforeNode = poses.indexOf('before');
                        if (nearestBeforeNode == 0) {
                            action = 'unshift'
                        } else if (nearestBeforeNode > 0) {
                            action = 'splice'
                            index = nearestBeforeNode
                        }
                        this.insertMethod = action;
                        this.insertIndex = index;
                        console.log('-->insertMethod',this.insertMethod )
                        /**
                         * @description 设置placeholder
                         */
                        if (action == 'push') {
                            this.setPlaceHolder(
                                ( attachNodeDim.x + attachNodeDim.width )- 10,
                                attachNodeDim.y,
                                10,
                                attachNodeDim.height
                            )
                        } else if (action == 'unshift') {
                            this.setPlaceHolder(
                                attachNodeDim.x,
                                attachNodeDim.y,
                                10,
                                attachNodeDim.height
                            )
                        } else if (action == 'splice') {
                            const dim = childNodeDims[index],
                                  larger = dim.width < dim.height ? 'h' : 'w',
                                  w = larger == 'w' ? dim.width : 10,
                                  h = larger == 'h' ? dim.width : 10,
                                  x = larger == 'w' ? dim.x : dim.x - 10,
                                  y = larger == 'h' ? dim.y : dim.y - 10 ;
                            this.setPlaceHolder(
                                x,
                                y,
                                w,
                                h
                            )
                        }

                        
                        

                        // const placeholderRef = this.$refs['placeholder'];
                        // placeholderRef.style.display = 'block'
                        // placeholderRef.style.width = pos.width + 'px'
                        // placeholderRef.style.height =  '3px'
                        // placeholderRef.style.top = pos.top + 'px'
                        // placeholderRef.style.left = pos.left + 'px';
                        // placeholderRef.style.zIndex = '9999'

                        
                        console.log('-->最近一个节点',nodeConfig.tag,poses);   
                    }
                    //console.log('->最近一个节点',this.attachNode);
                    //console.log('-->handleDragOver,widgetConfig',widgetConfig,'event',event)
                } 
            },
            setPlaceHolder(x,y,w,h) {
                const placeholderRef = this.$refs['placeholder'];
                placeholderRef.style.display = 'block'
                placeholderRef.style.width = w + 'px'
                placeholderRef.style.height = h + 'px'
                placeholderRef.style.top = y + 'px'
                placeholderRef.style.left = x + 'px'
                placeholderRef.style.zIndex = '9999'
            },
            handleLeave() {
                event.stopPropagation();
                event.preventDefault();
                this.resetPlaceHolder();
            },
            resetPlaceHolder() {
                this.dragPosition.x = -1;
                this.dragPosition.y = -1;
                this.attachNode = ``;
                this.insertIndex = 0;
                this.insertMethod = 'push'
                const placeholderRef = this.$refs['placeholder'];
                placeholderRef.style.display = 'none'
                
            },
            handleDrop(foo,widgetConfig) {
                const parentId = this.logicFindNearestNode(event)
                console.log('-->this',this.insertMethod,this.insertIndex)
                this[`insert.node`]({
                    parentId: parentId,
                    nodeConfig: widgetConfig,
                    insertMethod: this.insertMethod,
                    insertIndex: this.insertIndex
                });
                this.resetPlaceHolder();
            },
            handleSelectNode(event) {
                event.preventDefault();
                const nodeId = this.logicFindNearestNode(event)
                if (nodeId) {
                    this[`select.editing.node`]({
                        nodeId
                    });
                }
            },
            handleMouseOver(event) {
                event.preventDefault();
                event.stopPropagation();
                const node = this.logicFindNearestNode(event,`node`);
                if (node) {
                    const canvasRef = this[`canvasRef`];
                    const canvasOffset = canvasRef.getBoundingClientRect();
                    const offset = node.getBoundingClientRect();
                    const width = offset.width;
                    const height = offset.height;
                    const nodeId = node.id;
                    const left = - (canvasOffset.x - offset.x);
                    const top = - (canvasOffset.y - offset.y);
                    this[`update.hover.placeholder.offset`]({
                        width,
                        height,
                        left,
                        top
                    });
                    this[`update.hover.placeholder.node`](nodeId);
                    
                } else {
                    this[`update.hover.placeholder.offset`](null);
                    this[`update.hover.placeholder.node`](null);
                }
            },
            handleMouseOut(event) {
                event.preventDefault();
                this[`update.hover.placeholder.offset`](null);
                this[`update.hover.placeholder.node`](null);
            },
            logicFindNearestNode(event, get = 'id') {
                const toElement = event.toElement;
                const nearestNode = util.findNearestParent(toElement,(element) => {
                    if (element.id.indexOf(`node_`) == 0) {
                        return true;
                    }
                    return false;
                });
                let result = nearestNode;
                if (result) {
                    switch (get) {
                        case `id`: result = result.id;break;
                        case `node`: result = result;break;
                    }
                }
                return result;
            },
            ...mapMutations({
                "insert.node": storeTypes.mutations[`insert.data.nodetree.node`],
                "select.editing.node": storeTypes.mutations[`select.data.editing.node`],
                "update.hover.placeholder.offset": storeTypes.mutations[`update.ui.canvas.hover.placeholder.offset`],
                "update.hover.placeholder.node": storeTypes.mutations[`update.ui.canvas.hover.placeholder.node`],
                "update.canvas.ref": storeTypes.mutations[`update.ui.canvas.ref`]
            }),
        }
    }
</script>

