<template>
    <Tree
        :data="tree_nodeTree"
    >
    </Tree>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    
    export default {
        name: `IDENodeTree`,
        computed: {
            ...mapGetters([
                `tree_nodeTree`
            ])
        }
    }
</script>

