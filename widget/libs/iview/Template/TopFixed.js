import template from '../../../base/template'
import Span from '../../html/Span'
import Div from '../../html/Div'
import P from '../../html/P'
import layout from '../Layout'
import nav from '../Nav'

const Layout = layout.Layout,
      Header = layout.Header,
      Content = layout.Content,
      Footer = layout.Footer;

const IMenu = nav.IMenu,
      IMenuItem = nav.IMenuItem;

export default () => {

    const nodetree = {
        tag: Layout,
        description: `上中下布局`,
        properties: {
            "style": {
                "minHeight": "100%"
            }
        },
        children: [{
            tag: Header,
            properties: {
                "style": {
                    "position": "relative",
                    "width": "100%",
                    "display":"flex"
                }
            },
            children: [{
                tag: Div,
                properties: {
                    "style": {
                        "height": "30px",
                        "float": "left",
                        "position": "relative",
                        "top": "15px",
                        "left": "20px",
                        "marginRight": "30px",
                        "fontSize": "20px",
                        "fontWeight": "bold",
                        "color": "#fff",
                        "lineHeight": "30px",
                        "paddingLeft": "10px",
                        "paddingRight": "10px"
                    },
                    "domProps": {
                        "innerHTML": `MoggyDesign`
                    }
                }
            },{
                tag: IMenu,
                properties: {
                    "style": {
                        "width": "450px"
                    },
                    "props": {
                        "mode": "horizontal",
                        "theme": "dark",
                        "active-name": "1"
                    }
                },
                children: [{
                    tag: IMenuItem,
                    properties: {
                        "props": {
                            "name": "1"
                        }
                    },
                    children: [{
                        tag: Span,
                        properties: {
                            "domProps": {
                                "innerHTML": "Item 1"
                            }
                        }
                    }]
                },{
                    tag: IMenuItem,
                    properties: {
                        "props": {
                            "name": "2"
                        }
                    },
                    children: [{
                        tag: Span,
                        properties: {
                            "domProps": {
                                "innerHTML": "Item 2"
                            }
                        }
                    }]
                }]
            }]
        },{
            tag: Content,
            properties: {
                "style": {
                    "marginTop": "30px",
                    "marginRight": "88px",
                    "marginBottom": "30px",
                    "marginLeft": "88px",
                    "background": "#fff",
                    "height": "500px",
                    "flex":"none"
                }
            },
            children: [{
                tag: P,
                properties: {
                    "style": {
                        "paddingTop": "20px",
                        "paddingBottom": "20px",
                        "textAlign": "center"
                    }
                }
            }]
        },{
            tag: Footer,
            properties: {
                "style": {
                    "textAlign": "center"
                }
            },
            children: [{
                tag: Span,
                properties: {
                    domProps: {
                        "innerHTML": `2018-2020 © moggyTeam`
                    }
                }
            }]
        }]
    }

    return template(nodetree);
}
