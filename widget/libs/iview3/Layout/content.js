const Content = (opts) => {
    return {
        tag: `Content`,
        lib: 'iview',
        description: opts.description || `内容容器`,
        properties: {},
        children: opts.children || []
    }
}


export default {
    Content,
    widgets: [Content()]
}