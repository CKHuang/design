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
        <div class="ide-canvas-scroll-view">
            <div class="ide-canvas-drawboard">
                <div class="ide-canvas-info pad-b-sm text-right">
                    320 x 560
                </div>
                    <div class="ide-canvas-content" >
                        <drop 
                            @drop="handleDrop(`foo`,...arguments)"
                            class="ide-canvas-content-inner"
                        >
                            <div class="ide-canvas-content-inner">
                                <NodeTree :nodeTree="nodeTree"></NodeTree>
                            </div>
                            <div class="ide-canvas-widget-placeholder" id="ide-canvas-widget-placeholder"></div>
                        </drop>
                    </div>
                </drop>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import NodeTree from './NodeTree'

    export default {
        name: `IDECanvas`,
        computed: {
            ...mapGetters([
                `nodeTree`
            ])
        },
        components: {
            NodeTree: NodeTree
        },
        mounted() {
            this.SET_IDE_CANVAS_REF(this.$refs[`canvas`]);
        },
        methods: {
            handleDrop(foo,widgetConfig) {
                this.INSERT_NODE({
                    parentId: null,
                    node: {
                        tag: widgetConfig.tag,
                        properties: widgetConfig.properties
                    }
                })
                console.log('[handleDrag]widgetConfig',widgetConfig);
            },
            ...mapMutations([
                `INSERT_NODE`,
                `SET_IDE_CANVAS_REF`
            ]),
            ...mapActions([
                `ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET`
            ])
        }
    }
</script>

