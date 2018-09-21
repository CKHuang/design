<style>
.ide-canvas-hoverplaceholder {
    position: absolute;
    top:0px;
    left: 0px;
}
.ide-canvas-hoverplaceholder-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4)
}
</style>


<template>
    <div class="ide-canvas-hoverplaceholder" v-if="offset" 
        :style="{'width':offset.width+'px','height':offset.height+'px'}"
        @mouseover="handleMouseOver"
        @mousemove="handleMouseOver"
    >
        <div class="ide-canvas-hoverplaceholder-mask"></div>
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
                "offset": storeTypes.state.ui[`ide.canvas.hover.placeholder.offset`]
            })
        },
        methods: {
            handleMouseOver(event) {
                console.log('->over handleMouseOver')
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

