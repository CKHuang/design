import WIDGETS from '../../../../widget/index'
import types from './types'
import NodeTree from '../../struct/NodeTree'
import Record from '../../struct/Record'
import page from '../../struct/page'

const setNodeProps = (node) => {
    const properties = node.properties,
          nodeId = node.id,
          propsData = state[types.state.data["node.properties.data"]],
          editPage = state[types.state.data["page.editing"]];
    let propKey = ``;
    for( let group in properties ) {
        for( let field in properties[group] ) {
            propKey = `${nodeId}_${group}_${field}`
            propsData[propKey] = properties[group][field];
        }
    }
}

const delNodeProps = (nodes) => {
    const nodeIds = nodes.map(node => node.id),
          propsData = state[types.state.data["node.properties.data"]],
          isExist = (nodeId) => {
              return nodeIds.some(id => id.indexOf(nodeId) == 0)
          };
    for( let i in propsData ){
        if (isExist(propsData[i].id)) {
            delete propsData[i]
        }
    }
    console.log('-->dele',nodeIds,propsData)
}

const nodetree = new NodeTree();
    nodetree.on(nodetree.EVENT.SET_NODETREE, (nodeTree) => {
        state[types.state.data[`nodetree`]] = nodeTree
        state[types.state.data["page.editing"]].JSON_nodetree = nodeTree;
    })
    nodetree.on(nodetree.EVENT.INSERT_NODE, (nodes) => {
        state[types.state.data[`nodetree`]] = nodetree.nodeTree
        state[types.state.data["page.editing"]].JSON_nodetree = nodetree.nodeTree;
        // const st = Date.now()
        // nodes.forEach((node) => {
        //     setNodeProps(node)
        // })
        // state[types.state.data["page.editing"]].JSON_node_props_data = state[types.state.data["node.properties.data"]]
        //console.log('->耗时',Date.now() - st)
    })
    nodetree.on(nodetree.EVENT.DELETE_NODE, (nodes) => {
        state[types.state.data[`nodetree`]] = nodetree.nodeTree
        state[types.state.data["page.editing"]].JSON_nodetree = nodetree.nodeTree;
        // delNodeProps(nodes);
        // state[types.state.data["page.editing"]].JSON_node_props_data = state[types.state.data["node.properties.data"]]

    })
    nodetree.on(nodetree.EVENT.CHANGE_NODE_PROPS, ( 
        {nodeId,propsGroup,fieldName,newValue}
    ) => {
        const datas = state[types.state.data["node.properties.data"]];
        const key = `${nodeId}_${propsGroup}_${fieldName}`
        datas[key] = newValue;
        // state[types.state.data["page.editing"]].JSON_node_props_data = state[types.state.data["node.properties.data"]]
        // console.log('->datas',datas,'->key',key);
    });

const record = new Record();
      record.on('change',() => {
          console.log(`[Record change]`,record.record)
          state[types.state.data[`record`]] = record.record
      })

const state = {
    [types.state.ui["message.content"]]:{type:``,message:``},
    [types.state.ui["ide.toolbar.saving"]]: false,
    [types.state.ui['ide.toolbar.releasing']]:false,
     /**
     * @description 编辑器正在初始化
     * @type {boolean}
     */
    [types.state.ui["ide.loading"]]: true,
    /**
     * @description 当前画布里面的页面是否处于预览状态
     * @type {boolean}
     */
    [types.state.ui["ide.canvas.preview"]]: false,
    /**
     * @description 画布里面hover类型的占位符号的位置，null表示不可见
     * @type {null|object{width,height,left,top}}
     */
    [types.state.ui["ide.canvas.hover.placeholder.offset"]]: null,
     /**
     * @description 画布里面hover类型的占位符号的node配置
     * @type {null|object{width,height,left,top}}
     */
    [types.state.ui["ide.canvas.hover.placeholder.node"]]: null,
    /**
     * @description 保存cavas的dom节点
     * @type {htmlelement}
     */
    [types.state.ui["ide.canvas.ref"]]: null,
    /**
     * @description 左侧栏目展示
     * @type {boolean}
     */
    [types.state.ui["sidebar.spread"]]: true,
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
     * @description 页面模块编辑的表单是否可见
     * @type {boolean}
     */
    [types.state.ui["page.form.visiable"]]: false,
    [types.state.ui["data.form.visiable"]]: false,
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
    [types.state.data["record.act"]]: record.ACT,
   
    /**
     * @description 当前编辑的项目相关信息
     * @type {project}
     */
    [types.state.data["project"]]: {},
    /**
     * @description 当前编辑项目相关的页面列表
     * @type {array}
     */
    [types.state.data["project.page.list"]]: [],
    /**
     * @description 项目数据
     * @type {object} [key:string]: Data
     */
    [types.state.data["project.data"]]: [],
    /**
     * @description 当前正在编辑的页面
     * @type {page}
     */
    [types.state.data["page.editing"]]: null,
    /**
     * @description 页面模块的表单类型
     * @type {string}
     */
    [types.state.data["page.form.type"]]: null,
    /**
     * @description 页面模块的表单数据
     * @type {object}
     */
    [types.state.data["page.form.data"]]: page(``,``,``,``),
    /**
     * @description 项目数据层表单的填写
     */
    [types.state.data["project.data.form.data"]]: {key:``,value:``,type:``,desc:``},
    /**
     * @description 项目数据层表单的类型
     */
    [types.state.data["project.data.form.type"]]: null,
    /**
     * @description 项目的节点属性值
     */
    [types.state.data["node.properties.data"]]: {}
}

export default state