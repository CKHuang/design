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
.ide-canvas-info {
    padding-right: 5px;
    color: #999;
}
</style>

<style>
/*
 * 拖拽预览的展位对象
 */
.ide-canvas-widget-placeholder {
    border: 1px solid #2d8cf0;
    background-color: #f0faff;
    display: inline-block;
    width: 100%;
    opacity: .6;
    height: 40px;
}
</style>


<template>
    <div class="ide-canvas">
        <div class="ide-canvas-scroll-view">
            <div class="ide-canvas-drawboard">
                <div class="ide-canvas-info pad-b-sm text-right">
                    320 x 560
                </div>
                <drop 
                    @drop="ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET" 
                    @dragover="SET_IDE_CANVAS_WIDGET_DRAGING_OVER(true)"
                    @dragleave="SET_IDE_CANVAS_WIDGET_DRAGING_OVER(false)"  
                >
                    <div class="ide-canvas-content" ref="canvas"></div>
                </drop>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        name: `IDECanvas`,
        computed: {},
        mounted() {
            this.SET_IDE_CANVAS_REF(this.$refs[`canvas`]);
        },
        methods: {
            ...mapMutations([
                `SET_IDE_CANVAS_WIDGET_DRAGING_OVER`,
                `SET_IDE_CANVAS_REF`
            ]),
            ...mapActions([
                `ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET`
            ])
        }
    }
</script>

