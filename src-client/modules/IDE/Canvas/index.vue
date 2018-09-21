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
    outline: 1px dashed #ccc;
    background-color:#ccc;
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
                <div class="ide-canvas-content" :style="{'width':`${pageEditing.page_width}px`,'height':`${pageEditing.page_height}px`}">
                    <drop 
                        @drop="handleDrop(`foo`,...arguments)"
                        class="ide-canvas-content-inner"
                    >
                        <div class="ide-canvas-content-inner" 
                            @contextmenu="handleContextMenu"
                            @mouseover="handleMouseOver"
                           
                        >
                            <NodeTree></NodeTree>
                            <HoverPlaceHover></HoverPlaceHover>
                        </div>
                        <div class="ide-canvas-widget-placeholder" id="ide-canvas-widget-placeholder"></div>
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
    import util from '../../../libs/util';

    export default {
        name: `IDECanvas`,
        components: {
            NodeTree: NodeTree,
            PropsEditor: PropsEditor,
            HoverPlaceHover: HoverPlaceHover,
            Preview: Preview
        },
        computed: {
            ...mapGetters({
                "pageEditing": storeTypes.state.data[`page.editing`]
            })
        },
        methods: {
            handleDrop(foo,widgetConfig) {
                let parentId = null;
                const toElement = event.toElement;
                if (toElement.id) {
                    parentId = toElement.id;
                }
                console.log(`handleDrop`,foo,widgetConfig,event)
                this[`insert.node`]({
                    parentId: parentId,
                    nodeConfig: widgetConfig
                })
                console.log('[handleDrag]widgetConfig',widgetConfig);
            },
            handleContextMenu(event) {
                event.preventDefault();
                // event.stopPropagation();
                const nodeId = this.logicFindNearestNode(event)
                if (nodeId) {
                    this[`select.editing.node`]({
                        nodeId
                    });
                }
            },
            handleMouseOver(event) {
                event.preventDefault();
                const node = this.logicFindNearestNode(event,`node`);
                if (node) {
                    const offset = node.getBoundingClientRect();
                    const width = offset.width;
                    const height = offset.height;
                    const nodeId = node.id;
                    this[`update.hover.placeholder`]({
                        nodeId,
                        width,
                        height
                    });
                    console.log('-->offset',offset,node)
                } else {
                    this[`update.hover.placeholder`](null);
                }
                console.log(`[handleMouseOver]event`,node)
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
                "update.hover.placeholder": storeTypes.mutations[`update.ui.canvas.hover.placeholder.offset`]
            }),
        }
    }
</script>

