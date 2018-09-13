import NodeTree from '../../struct/NodeTree'

const nt = new NodeTree();
      nt.on('change',() => {
          
          state.node_tree = nt.nodeTree
      });

      setTimeout(() => {
        nt.set([{
            tag: `Layout`,
            properties: {},
            children: [{
                tag: `Menu`,
                properties: {
                    props: {
                        'mode': `horizontal`
                    }
                },
                children: [{
                    tag: `MenuItem`,
                    properties: {
                        props: {
                            name: `1`
                        }
                    },
                    children: [{
                        tag: `Icon`,
                        properties: {
                            props: {
                                type: `ios-paper`
                            }
                        },
                        children: []
                    }]
                },{
                    tag: `MenuItem`,
                    properties: {
                        props: {
                            name: `1`
                        }
                    },
                    children: [{
                        tag: `Icon`,
                        properties: {
                            props: {
                                type: `ios-paper`
                            }
                        },
                        children: []
                    }]
                },{
                    tag: `MenuItem`,
                    properties: {
                        props: {
                            name: `1`
                        }
                    },
                    children: [{
                        tag: `Icon`,
                        properties: {
                            props: {
                                type: `ios-paper`
                            }
                        },
                        children: []
                    }]
                }]
            },{
                tag: `Content`,
                properties: {},
                children: [{
                    tag: `Card`,
                    properties: {},
                    children: [{
                        tag: `Form`,
                        properties: {},
                        children: [{
                            tag: `FormItem`,
                            properties: {
                                props: {
                                    label: `name`
                                },children: []
                            },
                            children: [{
                                tag: `Input`,
                                properties: {
                                    props: {
                                        size: `default`
                                    }
                                },children: []
                            }]
                        },{
                            tag: `FormItem`,
                            properties: {
                                props: {
                                    label: `password`
                                }
                            },
                            children: [{
                                tag: `Input`,
                                properties: {}
                                ,children: []
                            }]
                        }]
                    }]
                }]
            }]  
        }])
      },1000);
     

const state = {
    /**
     * @var {array}
     * 节点树
     */
    nodeTree: nt,
    node_tree: []
}

export default state