<template>
    <Card v-if="nodeEditing !== null" style="position:fixed;z-index:9999;right:0px;top:40px;">
        <span>属性编辑器</span>
        <span>正在编辑的节点<strong>{{nodeEditing.tag}}</strong></span>
        <render-form></render-form>
    </Card>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import renderForm from './render'

    export default {
        name: `IDEPropsEditor`,
        components: {
            renderForm: renderForm
        },
        computed: {
            ...mapGetters({
                "nodeEditing": storeTypes.state.data[`node.editing`],
                "widgetConfig": storeTypes.getters[`data.node.editing.widget.config`]
            })
        },
        watch:{
            nodeEditing: function(newValu) {
                console.log('=>[nodeEditing]',newValu)
            },
            widgetConfig: function(newVal) {
                console.log('=>[widgetConfig]',newVal)
            }
        }
    }
</script>

