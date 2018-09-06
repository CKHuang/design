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
    <li class="ide-widget-item">
        <div class="ide-widget-item-inner">
            <drag @drag="handleDrag" @dragstart="handleStartDrag" @dragend="handleEndDarg">
                <render-widget :config="config_"></render-widget>
            </drag>
            
            <span class="mar-t-sm">{{config_.description}}</span>
        </div>
    </li>
</template>


<script>
    import renderWidget from './renderWidget'
   
    export default {
        name: `IDEWidgetItem`,
        components: {
            renderWidget: renderWidget
        },
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
            console.log('-->WidgetItem',this.config);
            return {
                config_: this.config,
                dragX: 0,
                dragY: 0
            }
        },
        methods: {
            handleStartDrag() {
                console.log('-->开始拖拽')
            },
            handleEndDarg() {
                console.log('-->结束拖拽')
            },
            handleDrag(foo,event) {
                const x = event.x,
                      y = event.y;
                if ( this.dragX == x && this.dragY == y) {
                    return ;
                }
                this.dragX = x;
                this.dragY = y;
                this.$emit('on-drag',{
                    x: this.dragX,
                    y: this.dragY
                })
            }
        }
    }
</script>
