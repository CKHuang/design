<template>
    <Card v-if="nodeEditing !== null" :dis-hover="false" style="position:fixed;z-index:9999;right:0px;top:40px;">
        <span>属性编辑器</span>
        <span>正在编辑的节点<strong>{{nodeEditing.tag}}</strong></span>
        <Editor></Editor>
    </Card>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import Editor from './editor'

    export default {
        name: `IDEPropsEditor`,
        components: {
            Editor: Editor
        },
        computed: {
            ...mapGetters({
                "nodeEditing": storeTypes.state.data[`node.editing`]
            })
        }
    }
</script>

