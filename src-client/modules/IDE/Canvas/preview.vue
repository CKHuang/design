<style>
.ide-canvas-preview {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 998;
}
</style>

<template>
    <div class="ide-canvas-preview">
        <Button size="small" v-if="previewState == false" @click="updatePreviewStatus(true)">预览当前页面</Button>
        <Button size="small" type="primary" v-else @click="updatePreviewStatus(false)">退出预览</Button>
    </div>
</template>


<script>
    import util from '../../../libs/util'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDECanvasPerview`,
        computed: {
            ...mapGetters({
                "previewState": storeTypes.state.ui[`ide.canvas.preview`]
            })
        },
        methods: {
            ...mapMutations({
                "updatePreviewStatus": storeTypes.mutations[`update.ui.ide.canvas.preview`]
            })
        }
    }
</script>
