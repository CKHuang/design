<style>
.ide-canvas-hoverplaceholder {
    position: absolute;
    top:0px;
    left: 0px;
    z-index: 101
}
.ide-canvas-hoverplaceholder-mask {
    /* width: 100%;
    height: 100%;
    background-color: rgba(232, 245, 253, 0.397);
    outline: rgb(59, 151, 227) 2px dashed; */
}
.ide-canvas-hoverplaceholder-tag {
    position: absolute;
    top: -19px;
    background-color: rgb(164, 201, 231);
    color: #fff;
    padding: 1px 5px;
    display: inline-block;
    left: -1px; 
}

.ide-canvas-node-hover {
    background-color: rgba(232, 245, 253, 0.397);
    outline: rgb(164, 201, 231) 2px dashed !important;
    outline-offset: 0px !important;
    position: relative !important;
    z-index: 900;
}
</style>


<template>
    <div class="ide-canvas-hoverplaceholder" v-if="offset" 
        :style="{top:(offset.top - 1)+'px',left:(offset.left-1)+'px'}"
        @mouseover="handleMouseOver"
    >   
        <span class="ide-canvas-hoverplaceholder-tag">{{ nodeConfig.tag }}</span>
        <!-- <div class="ide-canvas-hoverplaceholder-mask"></div> -->
    </div>
</template>

<script>
    import util from '../../../libs/util'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDECanvasHoverPlaceHolder`,
        computed: {
            ...mapGetters({
                "offset": storeTypes.state.ui[`ide.canvas.hover.placeholder.offset`],
                "nodeConfig": storeTypes.state.ui[`ide.canvas.hover.placeholder.node`]
            })
        },
        methods: {
            handleMouseOver(event) {
                event.preventDefault();
                event.stopPropagation()
            },
            clearOldHoverClass(oldValue) {
                if (oldValue) {
                    const dom = document.querySelector(`#${oldValue.id}`);
                    util.removeClass(dom,`ide-canvas-node-hover`)
                }
            },
            setNewHoverClass(newValue) {
                if (newValue) {
                    const dom = document.querySelector(`#${newValue.id}`);
                    util.addClass(dom,`ide-canvas-node-hover`);
                }
            }
        },
        watch: {
            nodeConfig: function(newValue,oldValue) {
                if (newValue != oldValue) {
                    this.clearOldHoverClass(oldValue);
                    this.setNewHoverClass(newValue);
                }
            }
        }
    }
</script>

