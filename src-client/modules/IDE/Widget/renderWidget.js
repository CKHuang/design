export default {
    name: `IDEWidgetRenderWidget`,
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
        return h(ctx.props.config.renderTag);
    }
}