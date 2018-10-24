<template>
    <div></div>
</template>

<script>
    import { mapGetters, mapMutations, mapState } from 'vuex'
    import storeTypes from '../../store/modules/ide/types'

    export default {
        name: `CommonMessage`,
        computed: {
            ...mapState({
                'message': state => state.ide[storeTypes.state.ui[`message.content`]]
            })
        },
        watch: {
            'message': function(newValue,oldeValue) {
                this.$Message[newValue.type](newValue.message)
            }
        }
    }
</script>
