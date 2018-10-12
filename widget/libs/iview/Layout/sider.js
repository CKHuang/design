const Sider = (opts) => {
    return {
        tag: `Sider`,
        lib: `iview`,
        description: opts.description || `侧边栏`,
        properties: {},
        children: opts.children || []
    }
}

export default {
    Sider,
    widgets: [Sider()]
}