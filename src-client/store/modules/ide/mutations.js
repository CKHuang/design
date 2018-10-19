import types from './types'
import page from '../../struct/page'
import tpyesConfig from '../../../../config/types'
import util from '../../../libs/util';

export default {
    /**
     * @description 更新ide的加载状态
     * @param {boolean} isLoading 是否加载中
     */
    [types.mutations["update.ide.loading"]](state,isLoading) {
        return Object.assign(state,{
            [types.state.ui["ide.loading"]]: isLoading
        })
    },
    /**
     * @description 更新canvas节点
     * @param {htmlelement} htmlelement
     */
    [types.mutations["update.ui.canvas.ref"]](state,htmlelement) {
        return Object.assign(state,{
            [types.state.ui["ide.canvas.ref"]]: htmlelement
        })
    },  
    /**
     * @description 设置画布当前编辑页面的预览状态
     * @param {boolean} isPreview 是否预览状态
     */
    [types.mutations["update.ui.ide.canvas.preview"]](state,isPreview) {
        this.commit(types.mutations["update.ui.sidebar.spread"],isPreview ? false : true)
        return Object.assign(state,{
            [types.state.ui["ide.canvas.preview"]]: isPreview
        })
    },
    /**
     * @description 更新画布里面hover占位符号的offset
     * @param {null|object{width,height,left,top}} offset
     */
    [types.mutations["update.ui.canvas.hover.placeholder.offset"]](state,offset) {
        return Object.assign(state,{
            [types.state.ui["ide.canvas.hover.placeholder.offset"]]: offset
        })
    },
    /**
     * @description 更新画布里面hover占位符号的节点配置
     * @param {nodeConfig} nodeConfig
     */
    [types.mutations["update.ui.canvas.hover.placeholder.node"]](state,nodeId) {
        let nodeConfig = nodeId;
        if (nodeId != null) {
            const nodeTreeInstance = state[types.state.data["nodetree.instance"]]
            nodeConfig = nodeTreeInstance.find(nodeId);
        }
        return Object.assign(state,{
            [types.state.ui["ide.canvas.hover.placeholder.node"]]: nodeConfig
        })
    },
    /**
     * @description 显示表单
     * @param {boolean} visiable 是否可见
     * @param {string} formType 表单类型，是add还是edit
     */
    [types.mutations["update.ui.page.form.visiable"]](state,{visiable,formType = `add`}) {
        if ( visiable ) {
            this.commit(types.mutations["update.data.page.form.type"],formType)
        }
        return Object.assign(state,{
            [types.state.ui["page.form.visiable"]]: visiable
        })
    },
    /**
     * @description 更新数据管理表单可视化
     */
    [types.mutations["update.ui.data.form.visiable"]](state,{visiable,formType = `add`}) {
        if (visiable) {
            
        }
        console.log('--->visiable',visiable);
        return Object.assign(state,{
            [types.state.ui["data.form.visiable"]]: visiable
        })
    },
    /**
     * @description 设置左侧sidebar展开与否
     * @param {boolean} isSpread 是否展开
     */
    [types.mutations["update.ui.sidebar.spread"]](state,isSpread) {
        return Object.assign(state,{
            [types.state.ui["sidebar.spread"]]: isSpread
        })
    },
    /**
     * @description 切换sidebar的展开
     */
    [types.mutations["toggle.ui.sidebar.spread"]](state) {
        const sidebarSpread = state[types.state.ui["sidebar.spread"]];
        return Object.assign(state,{
            [types.state.ui["sidebar.spread"]]: sidebarSpread ? false : true
        })
    },
    /**
     * @description 切换code面板不同的tab
     * @param {string} tab 面板名称,template
     */
    [types.mutations["toggle.ui.code.spread"]](state,tab) {
        if ( tab != state[types.state.ui["code.actived"]] ) {
            return Object.assign(state,{
                [types.state.ui["code.actived"]]: tab,
                [types.state.ui["code.spread"]]: true
            })
        } else {
            return Object.assign(state,{
                [types.state.ui["code.actived"]]: ``,
                [types.state.ui["code.spread"]]: false
            })
        }
    },
    /**
     * @description 更新当前选中的组件库
     * @param {stirng} lib 组件库的名称
     */
    [types.mutations["update.data.widget.lib"]](state,lib) {
        return Object.assign(state,{
            [types.state.data["widget.lib"]]: lib
        })
    },
    /**
     * @description 更新当前节点树的树，主要是页面变更的时候触发
     * @param {NodeTree} nodeTree 存储的节点树 
     */
    [types.mutations["select.data.nodetree"]](state,{nodeTree}) {
        state[types.state.data["nodetree.instance"]].set(nodeTree);
    },
    /**
     * @description 删除节点树中的某个节点以及其子节点
     * @param {string} nodeId 节点id
     */
    [types.mutations["delete.data.nodetree.node"]](
        state,
        nodeId
    ) {
        state[types.state.data['nodetree.instance']].delete(nodeId)
        this.commit(types.mutations["insert.editor.record"],{
            mod: state[types.state.data["record.mod"]][`node`],
            act: state[types.state.data['record.act']][`delete`],
            config: nodeId,
            newValue: null,
            oldValue: nodeId
        });
        this.commit(types.mutations["select.data.editing.node"],{nodeConfig:null})
    },
    /**
     * @description 在节点树插入节点对象
     * @param {object} parentId 父亲节点的id，如果是顶级则这个为null
     * @param {object} nodeConfig 节点配置
     * @param {string} insertMethod 插入的方式，push、unshift、还是slice，默认是push
     * @param {number} insertIndex 插入的位置，对于slice有效
     */
    [types.mutations["insert.data.nodetree.node"]](
        state,
        {parentId,nodeConfig,insertMethod = 'push',insertIndex = 0}
    ) {
        nodeConfig.lib = state[types.state.data["widget.lib"]];
        state[types.state.data["nodetree.instance"]].insert(
            parentId,
            nodeConfig,
            insertMethod,
            insertIndex
        )
        this.commit(types.mutations["insert.editor.record"],{
            mod: state[types.state.data["record.mod"]][`node`],
            act: state[types.state.data["record.act"]][`insert`],
            config: null,
            newValue: {parentId,nodeConfig,insertMethod,insertIndex},
            oldValue: null
        })
    },
    /**
     * @description 更换正在编辑的节点
     * @param {object} nodeConfig 两个其中传一个
     * @param {object} nodeId nodeId的优先级比nodeConfig高
     */
    [types.mutations["select.data.editing.node"]](
        state,
        {nodeConfig,nodeId}
    ) {
        if (nodeId) {
            nodeConfig = state[types.state.data["nodetree.instance"]].find(nodeId)
        }
        return Object.assign(state,{
            [types.state.data["node.editing"]]: nodeConfig 
        })
    },
    /**
     * @description 修改正在编辑节点的properties属性
     * @param {string} nodeId 节点ID
     * @param {string} propsGroup 属性组
     * @param {string} fieldName 属性名称
     * @param {string} newValue 更新后的值
     */
    [types.mutations["update.data.editing.node.properties"]](
        state,
        {nodeId,propsGroup,fieldName,newValue}
    ) {
        const { oldValue } = state[types.state.data["nodetree.instance"]].updateProperties(
            nodeId,
            propsGroup,
            fieldName,
            newValue
        )
        /**
         * 更新了属性，不会触发editor里面的正在编辑节点的变动，需要重新设置值
         */
        this.commit(types.mutations['select.data.editing.node'],{
            nodeId
        })
        this.commit(types.mutations["insert.editor.record"],{
            mod: state[types.state.data["record.mod"]][`node.properties`],
            act: state[types.state.data["record.act"]][`update`],
            config: {nodeId,propsGroup,fieldName,newValue},
            newValue: newValue,
            oldValue: oldValue
        })
    },
    /**
     * @description 添加编辑记录
     * @param {number} mod 模块
     * @param {number} act 行为
     * @param {object} config 配置
     * @param {anyval} newValue 新的值
     * @param {anyval} oldValue 旧的值
     */
    [types.mutations["insert.editor.record"]](
        state,
        {mod,act,config,newValue,oldValue}
    ) {
        state[types.state.data["record.instance"]].push(
            mod,
            act,
            config,
            newValue,
            oldValue
        )
    },
    /**
     * @description 更新选中当前编辑的项目
     * @param {project} project
     */
    [types.mutations["select.data.project"]](
        state,
        project
    ) {
        return Object.assign(state,{
            [types.state.data[`project`]]: project
        })
    },
    /**
     * @description 更新当前编辑项目所属的页面列表
     * @param {array} pageList
     */
    [types.mutations["update.data.project.page.list"]](
        state,
        pageList
    ) {
        return Object.assign(state,{
            [types.state.data["project.page.list"]]: pageList
        })
    },
    /**
     * @description 当前项目列表添加新的页面
     * @param {page} page 页面配置
     */
    [types.mutations["insert.data.project.page.list"]](
        state,
        {page}
    ) { 
        const project = state[types.state.data[`project`]],
              pageSize = tpyesConfig.PAGE_SIZE[project.type];
              page.page_height = pageSize.height;
              page.page_width = pageSize.width;
        state[types.state.data["project.page.list"]].push(page);
        this.commit(types.mutations["update.ui.page.form.visiable"],{visiable:false})
        this.commit(types.mutations["reset.data.page.form.data"]);
        this.commit(types.mutations["select.data.editing.page"],page)
    },
    /**
     * @description 选择当前正在编辑的页面
     * @param {page} page
     */
    [types.mutations["select.data.editing.page"]](
        state,
        page
    ) {
        Object.assign(state,{
            [types.state.data["page.editing"]]: page
        })
        this.commit(types.mutations["select.data.nodetree"],{nodeTree:page.nodetree}); 
    },
    /**
     * @description 更新页面模块的表单类型，有新建以及修改
     * @param {string} type add/edit
     */
    [types.mutations["update.data.page.form.type"]](
        state,
        type
    ) {
        return Object.assign(state,{
            [types.state.data["page.form.type"]]: type
        })
    },
    /**
     * @description 更新当前表单的字段内容
     * @param {object} data 表单填写的内容
     */
    [types.mutations["update.data.page.form.data"]](
        state,
        data
    ) {
        return Object.assign(state,{
            [types.state.data["page.form.data"]]: data
        })
    },
    /**
     * @description 重置page表单的值
     */
    [types.mutations["reset.data.page.form.data"]](state) {
        return Object.assign(state,{
            [types.state.data["page.form.data"]]: page(``,``,``,``)
        })
    },
    /**
     * @description 更新当前选中的页面，在编辑页面属性以及删除页面使用
     * @param {page} page
     */
    [types.mutations["update.data.page.select"]](
        state,
        {page}
    ) {
        return Object.assign(state,{
            [types.state.data["page.select"]]: page
        })
    },
    /**
     * @description 重新设置项目的数据
     * @param {object} data
     */
    [types.mutations["set.project.data"]](
        state,
        {data}
    ) {
        return Object.assign(state,{
            [types.state.data["project.data"]]: data
        })
    },
    [types.mutations["insert.project.data.item"]](state,{data}) {
        const datas = state[types.state.data["project.data"]];
        datas.unshift(data)
    },
    /**
     * @description 更新项目数据某个数据项的数据
     * @param {string} key 字段内容
     * @param {object} data
     */
    [types.mutations["update.project.data.item"]](
        state,
        {key,data}
    ) {
        state[types.state.data["project.data"]].splice(key,1)
        this.commit(types.mutations["insert.project.data.item"],{
            data: data
        })
        // state[types.state.data["project.data"]][key] = null;
        // state[types.state.data["project.data"]][key] = data;
        //console.log('-->after update',state[types.state.data["project.data"]][key])
    },
    /**
     * @description 删除项目某个数据项的数据
     * @param {string} key 字段内容
     */
    [types.mutations["delete.project.data.item"]](
        state,
        {key}
    ) {
        const datas = state[types.state.data["project.data"]];
        delete datas[key];
    },
    /**
     * @description 更新项目数据表单编辑的数据
     */
    [types.mutations["update.data.project.data.form.data"]](
        state,
        {dataItem}
    ) {
        return Object.assign(state,{
            [types.state.data["project.data.form.data"]]: dataItem
        })
    },
    [types.mutations["reset.data.project.data.form.data"]](
        state
    ) {
        return Object.assign(state,{
            [types.state.data["project.data.form.data"]]: {key:``,value:``,type:`string`,desc:``}
        })
    }
}