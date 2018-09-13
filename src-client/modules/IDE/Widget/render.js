/**
 * 组件的函式组件，
 * 用来动态渲染组件
 */
export default {
    functional: true,
    props: {
        /**
         * 组件配置
         */
        config: {
            type: Object,
            default: () => ({
                tag: ``,
                description: ``,
                properties: {
                    props: {}
                }
            })
        }
    },
    render(h,ctx) {
        return h(ctx.props.config.tag)
    }
}