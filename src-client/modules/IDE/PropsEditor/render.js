export default {
    functional: true,
    props: {
        editingProps: {
            type: Object,
            default: () => ({})
        }
    },
    render(h,ctx) {
        console.log(`[PropsEditor]editingProps`,ctx.props.editingProps)
    }
}