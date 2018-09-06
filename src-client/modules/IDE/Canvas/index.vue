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
    border: 1px dashed #e1e1e1;
    /* border-color: #CDB; */
    box-shadow: 0 2px 30px 0 rgba(213,213,213,0.50);
}
.ide-canvas-info {
    padding-right: 5px;
    color: #999;
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
                    @drop="handleDrop" 
                    @dragover="handleDragOver" 
                    @dragleave="handleDragLevel"
                >
                    <div class="ide-canvas-content"></div>
                </drop>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: `IDECanvas`,
        methods: {
            handleDragOver: () => {
                console.log('-->在上空盘旋')
            },
            handleDragLevel: () => {
                console.log('-->离开了')
            },
            handleDrop: () => {
                console.log('-->添加了')
            }
        }
    }
</script>

