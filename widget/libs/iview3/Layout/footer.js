const Footer = (opts) => {
    return {
        tag: `Footer`,
        lib: `iview`,
        description: opts.description || `底部容器`,
        properties: {},
        children: opts.children || []
    }
}

export default {
    Footer,
    widgets: [Footer()]
}