import types from '../types'

const Layout = {
    tag: `Layout`,
    lib: `iview`,
    description: `布局容器`,
    properties: {
        style: {
            "width": {
                editControl: {
                    label: `宽度`,
                    control: types.Control.Input
                }
               
            },
            "height": {
                editControl: {
                    label: `高度`,
                    control: types.Control.Input
                }
            }
        }
    }
}

const Header = {
    tag: `i-header`,
    lib: `iview`,
    description: `顶部布局`,
    properties: {
        style: {
            "width": {
                editControl: {
                    label: `宽度`,
                    control: types.Control.Input
                }
               
            },
            "height": {
                editControl: {
                    label: `高度`,
                    control: types.Control.Input
                }
            }
        }
    }
}

const Sider = {
    tag: `Sider`,
    lib: `iview`,
    description: `侧边栏`,
    properties: {
        style: {
            "width": {
                editControl: {
                    label: `宽度`,
                    control: types.Control.Input
                }
               
            },
            "height": {
                editControl: {
                    label: `高度`,
                    control: types.Control.Input
                }
            }
        }
    }
}

const Content = {
    tag: `Content`,
    lib: `iview`,
    description: `内容容器`,
    properties: {
        style: {
            "width": {
                editControl: {
                    label: `宽度`,
                    control: types.Control.Input
                }
               
            },
            "height": {
                editControl: {
                    label: `高度`,
                    control: types.Control.Input
                }
            }
        }
    }
}

const Footer = {
    tag: `Footer`,
    lib: `iview`,
    description: `底部内容`,
    properties: {
        style: {
            "width": {
                editControl: {
                    label: `宽度`,
                    control: types.Control.Input
                }
               
            },
            "height": {
                editControl: {
                    label: `高度`,
                    control: types.Control.Input
                }
            }
        }
    }
}

export default [Layout,Header,Sider,Content,Footer]