import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: `IDEDragWidget`,
    functional: true,
    props: {
        config: {
            type: Object,
            default: () => ({
                renderTag: ``
            })
        }
    },
    render: (h,ctx) => {
        const config = ctx.props.config;
        return h(config.renderTag,{})
    }
}