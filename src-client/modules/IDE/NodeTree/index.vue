<template>
    <Tree
        :style="{'height': '100%','overflow':'auto'}"
        :data="data"
        @on-select-change="handleSelectNode"
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
        },
        methods: {
            ...mapMutations({
                "select.editing.node": storeTypes.mutations[`select.data.editing.node`]
            }),
            handleSelectNode(value) {
                const node = value.length == 1 ? value[0] : null;
                if (node) {
                    this[`select.editing.node`]({
                        nodeId: node.id
                    })
                }
            }
        }
    }
</script>

