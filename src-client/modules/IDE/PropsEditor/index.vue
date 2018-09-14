<template>
    <Card style="position:fixed;z-index:9999;right:0px;top:40px;">
        <span>属性编辑器</span>
        <span>正在编辑的节点<strong></strong></span>
        <render-form></render-form>
    </Card>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import renderForm from './render'

    export default {
        name: `IDEPropsEditor`,
        components: {
            renderForm: renderForm
        },
        computed: {
            
        }
    }
</script>

