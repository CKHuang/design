import Layout from './Layout'

export default [{
    tag: `Layout`,
    lib: `iview`,
    description: `上中下布局`,
    properties: {},
    children: [{
        tag: `Header`,
        lib: `iview`,
        description: `顶部容器`,
        properties: {}
    },{
        tag: `Content`,
        lib: `iview`,
        description: `内容容器`,
        properties: {}
    },{
        tag: `Footer`,
        lib: `iview`,
        description: `底部容器`,
        properties: {}
    }]
},{
    tag: `Layout`,
    lib: `iview`,
    description: `顶部侧边布局`,
    properties: {},
    children: [{
        tag: `Header`,
        lib: `iview`,
        description: `顶部容器`,
        properties: {}
    },{
        tag: `Layout`,
        lib: `iview`,
        description: `布局容器`,
        properties: {},
        children: [{
            tag: `Sider`,
            lib: `iview`,
            description: `侧栏容器`,
            properties: {}
        },{
            tag: `Content`,
            lib: `iview`,
            description: `内容容器`,
            properties: {}
        }]
    },{
        tag: `Footer`,
        lib: `iview`,
        description: `底部容器`,
        properties: {}
    }]
}]