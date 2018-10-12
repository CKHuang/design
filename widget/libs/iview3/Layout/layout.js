const Layout = (opts) => {
    return {
        tag: `Layout`,
        lib: `iview`,
        description: opts.description || `布局容器`,
        properties: {},
        children: opts.children || []
    }
}

export default {
    Layout,
    widgets: [Layout()]
}