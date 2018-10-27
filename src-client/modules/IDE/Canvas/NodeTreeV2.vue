<style>
.ide-canvas-node,.ide-canvas-node-drop-area {
    display: initial;
}
.ide-canvas-content-inner [data-node="1"] {
    outline: 1px dashed rgba(170,170,170,0.7);
    outline-offset: 0px;
}

</style>

<template>
    <v-runtime-template :template="template"/>
</template>

<script>
    import util from '../../../libs/util'
    import builder from '../../../../config/build'
    import VRuntimeTemplate from "v-runtime-template"
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    /**
     * 画布的函式组件，
     * 用来分析节点数
     * 做全局渲染
     */
    export default {
        name: `IDECanvasNodeTree`,
        components: {
            VRuntimeTemplate: VRuntimeTemplate
        },
        data() {
            return {
                template: ``
            } 
        },
        computed: {
            ...mapGetters({
                "nodeTree": storeTypes.state.data[`nodetree`],
                "previewState": storeTypes.state.ui[`ide.canvas.preview`]
            })
        },
        watch: {
            'nodeTree': function(newValue,oldValue) {
                this.template = builder.template(newValue,2)
            }
        }
    }
</script>