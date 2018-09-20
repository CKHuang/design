<style>
.ide-propseditor {
    max-width: 240px;
}
</style>


<template>
    <Card  class="ide-propseditor" v-if="nodeEditing !== null" :dis-hover="true" style="position:fixed;z-index:9999;right:0px;top:40px;">
        <p slot="title">
            属性编辑
        </p>
        <a href="#" slot="extra" @click.prevent="removeEditNode({nodeConfig:null})">
            <Icon type="ios-loop-strong"></Icon>
            close
        </a>
        <span>正在编辑的节点<strong>{{nodeEditing.tag}}</strong></span>
        <span>({{nodeEditing.id}})</span>
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
        },
        methods: {
            ...mapMutations({
                "removeEditNode": storeTypes.mutations[`select.data.editing.node`]
            })
        }
    }
</script>

