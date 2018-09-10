<style>
.ide-widget-item {
    width: 101px;
    height: 100px;
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    overflow: hidden;
    cursor: move;
    border: 1px solid transparent;
    border: 1px solid #EEE;
    margin-top: -1px;
    margin-left: -1px;
    overflow: hidden;  
    padding: 10px;
    user-select: none;
    -webkit-user-select: none;
}
.ide-widget-item-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.ide-widget-item:hover {
    background-color: #f5f5f5;
}
.ide-widget-item:active {
    background-color: #f2f2f2;
}
.ide-widget-item-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
}
.ide-widget-grag {
    position: fixed;
    z-index: 950;
}
.ide-widget-drag-el {
    outline: 1px dashed #2d8cf0;
    background-color: #fff;
    opacity: .8;
}
</style>

<template>
    <div ref="box"></div>
</template>


<script>
    import DragWidget from './dragWidget'
    
    export default {
        name: `IDEDragWidget`,
        props: {
            config: {
                type: Object,
                default: () => ({
                    name: ``,
                    renderTag: ``,
                    description: ``
                })
            }
        },
        data() {
            return {
                drageWidget: null
            }
        },
        mounted() {
            this.drageWidget = DragWidget(this.config);
            this.drageWidget.mount(this.$refs['box']);
        }
    }
</script>
