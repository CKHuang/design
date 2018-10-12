<style>
.ide-propseditor {
    max-width: 240px;
    min-width: 240px;
    position: absolute !important;
    top: 0px;
    z-index: 999;
    right: 0px;
    max-height: 100%;
    overflow: auto;
}
.ide-propseditor .ivu-card-head {
    border-bottom: none;
}
.ide-propseditor .ivu-collapse>.ivu-collapse-item {
    border-top-style: dashed;  
}
.ide-propseditor .ivu-collapse{
    border-bottom: none;
}
</style>


<template>
    <Card class="ide-propseditor" v-if="nodeEditing !== null" :padding="0" :dis-hover="true">
        <p slot="title">
            属性编辑
        </p>
        <a href="#" slot="extra" @click.prevent="removeEditNode({nodeConfig:null})">
            <Icon type="ios-loop-strong"></Icon>
            close
        </a>
        <!-- <span>正在编辑的节点<strong>{{nodeEditing.tag}}</strong></span> -->
        <!-- <span>({{nodeEditing.id}})</span> -->
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

