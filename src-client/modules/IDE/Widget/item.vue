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
            <drag 
                @drag="handleDrag" 
                @dragstart="SET_IDE_WIDGET_DRAGING(config)" 
                @dragend="DEL_IDE_WIDGET_DRAGING"
            >
                <render-widget :config="config"></render-widget>
            </drag>
            <span class="mar-t-sm">{{config.description}}</span>
        </div>
    </li>
</template>


<script>
    import renderWidget from './renderWidget'
    import { mapGetters, mapMutations, mapActions } from 'vuex'

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
        computed: {},
        methods: {
            ...mapMutations([
                `SET_IDE_WIDGET_DRAGING`,
                `DEL_IDE_WIDGET_DRAGING`
            ]),
            ...mapActions([
                `ACT_SET_IDE_WIDGET_DRAGIN_POSITION`
            ]),
            handleDrag(foo,event) {
                this.ACT_SET_IDE_WIDGET_DRAGIN_POSITION({
                    x: event.x,
                    y: event.y
                })
            }
        }
    }
</script>
