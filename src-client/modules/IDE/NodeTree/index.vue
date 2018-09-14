<template>
    <Tree
        :data="data"
    >
    </Tree>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    
    export default {
        name: `IDENodeTree`,
        computed: {
            ...mapGetters({
                "data":storeTypes.getters[`data.nodetree.tree`]
            })
        }
    }
</script>

