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
.ide-widget-icon {
    display: block !important;
    text-align: center;
    font-size: 16px;
    margin-bottom: 5px;
}
</style>

<template>
    <div>
        <drag :transfer-data="config">
            <!-- <render-widget :config="config"></render-widget> -->
            <Icon class="ide-widget-icon" :type="config.icon ? config.icon : 'ios-cube-outline'" />  
        </drag>
        <span class="mar-t-sm">{{config.description}}</span>
    </div>
</template>


<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import renderWidget from './render.js'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDEWidget`,
        props: {
            /**
             * 组件的配置
             */
            config: {
                type: Object,
                default: () => ({
                    tag: ``,
                    description: ``,
                    properties: {
                        props: {}
                    }
                })
            },
            /**
             * 是否可以拖拽
             */
            draggable: {
                type: Boolean,
                default: true
            }
        },
        components: {
            renderWidget: renderWidget
        },
        computed: {
            ...mapGetters({
                'nodeTreeInstance': storeTypes.state.data[`nodetree.instance`]
            })
        }
    }
</script>

