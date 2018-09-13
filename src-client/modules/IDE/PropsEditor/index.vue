<template>
    <Card style="position:fixed;z-index:9999" v-if="propEditorVisiabled">
        <span>属性编辑器</span>
    </Card>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        name: `IDEPropsEditor`,
        computed: {
            ...mapGetters([
                `editingProps`,
                `propEditorVisiabled`
            ])
        }
    }
</script>

