const Header = (opts) => {
    return {
        tag: `i-header`,
        lib: 'iview',
        description: opts.description || `顶部布局`,
        properties: {},
        children: opts.children || []
    }
}

export default {
    Header,
    widgets: [Header()]
}