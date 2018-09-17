import WIDGETS from '../../../../widget/index'
import types from './types'
import NodeTree from '../../struct/NodeTree'
import Record from '../../struct/Record';

const nodetree = new NodeTree();
    nodetree.on('change', () => {
        state[types.state.data[`nodetree`]] = nodetree.nodeTree
    })

const record = new Record();
      record.on('change',() => {
          console.log(`[Record change]`,record.record)
          state[types.state.data[`record`]] = record.record
      })

    // setTimeout(() => {
    //     nodetree.set([{
    //         tag: `Layout`,
    //         properties: {},
    //         children: [{
    //             tag: `Menu`,
    //             properties: {
    //                 props: {
    //                     'mode': `horizontal`
    //                 }
    //             },
    //             children: [{
    //                 tag: `MenuItem`,
    //                 properties: {
    //                     props: {
    //                         name: `1`
    //                     }
    //                 },
    //                 children: [{
    //                     tag: `Icon`,
    //                     properties: {
    //                         props: {
    //                             type: `ios-paper`
    //                         }
    //                     },
    //                     children: []
    //                 }]
    //             },{
    //                 tag: `MenuItem`,
    //                 properties: {
    //                     props: {
    //                         name: `1`
    //                     }
    //                 },
    //                 children: [{
    //                     tag: `Icon`,
    //                     properties: {
    //                         props: {
    //                             type: `ios-paper`
    //                         }
    //                     },
    //                     children: []
    //                 }]
    //             },{
    //                 tag: `MenuItem`,
    //                 properties: {
    //                     props: {
    //                         name: `1`
    //                     }
    //                 },
    //                 children: [{
    //                     tag: `Icon`,
    //                     properties: {
    //                         props: {
    //                             type: `ios-paper`
    //                         }
    //                     },
    //                     children: []
    //                 }]
    //             }]
    //         },{
    //             tag: `Content`,
    //             properties: {},
    //             children: [{
    //                 tag: `Card`,
    //                 properties: {},
    //                 children: [{
    //                     tag: `Form`,
    //                     properties: {
    //                         props: {
                                
    //                         }
    //                     },
    //                     children: [{
    //                         tag: `FormItem`,
    //                         properties: {
    //                             props: {
    //                                 label: `name`
    //                             }
    //                         },
    //                         children: [{
    //                             tag: `Input`,
    //                             properties: {
    //                                 props: {
    //                                     size: `default`
    //                                 }
    //                             },children: []
    //                         }]
    //                     },{
    //                         tag: `FormItem`,
    //                         properties: {
    //                             props: {
    //                                 label: `password`
    //                             }
    //                         },
    //                         children: [{
    //                             tag: `Input`,
    //                             properties: {}
    //                             ,children: []
    //                         }]
    //                     }]
    //                 }]
    //             }]
    //         }]  
    //     }])
    //   },1000);

const state = {
     /**
     * @description 展开状态
     * @type {boolean} false:收起,true:展开
     */
    [types.state.ui["code.spread"]]: false,
    /**
     * @description 当前激活的标签
     * @type {string} template、script、style其中一个
     */
    [types.state.ui["code.actived"]]: ``,
    /**
     * @description 代码编辑器的渲染模式
     * @type {object}
     */
    [types.state.ui["code.modes"]]: {
        "template": `htmlmixed`,
        "script": `javascript`,
        "style": `css`
    },
     /**
     * @description 选中的控件库
     * @type {string} 例如iview
     */
    [types.state.data["widget.lib"]]: WIDGETS.default,
    /**
     * @description 可选的组件库
     * @type {object}
     */
    [types.state.data["widget.libs"]]: WIDGETS.libs,
    /**
     * @description 节点树
     * @type {array}
     */
    [types.state.data[`nodetree`]]: [],
    /**
     * @description 节点树对象
     * @type {NodeTree}
     */
    [types.state.data["nodetree.instance"]]: nodetree,
    /**
     * @description 正在编辑的节点
     * @type {Node}
     */
    [types.state.data["node.editing"]]: null,
    /**
     * @description 操作记录的具体内容
     * @type {array}
     */
    [types.state.data["record"]]: [],
    /**
     * @description 操作记录的实例化
     * @type {Record}
     */
    [types.state.data["record.instance"]]: record,
    /**
     * @description 记录的模块
     * @type {Record.MOD}
     */
    [types.state.data["record.mod"]]: record.MOD,
    /**
     * @description 记录的行为
     * @type {Record.ACT}
     */
    [types.state.data["record.act"]]: record.ACT
}

export default state