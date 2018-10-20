import types from './types'
import util from '../../../libs/util'
import translater from '../../../../config/translater'

export default {
    /**
     * @description ide编辑器正在加载中
     * @return {boolean}
     */
    [types.state.ui["ide.loading"]](state) {
        return state[types.state.ui["ide.loading"]]
    },
    /**
     * @description 获取当前画布是否处于预览状态
     * @return {boolean}
     */
    [types.state.ui["ide.canvas.preview"]](state) {
        return state[types.state.ui["ide.canvas.preview"]]
    },
    /**
     * @description 获取canvas节点
     * @return {htmlelement}
     */
    [types.state.ui["ide.canvas.ref"]](state){
        return state[types.state.ui["ide.canvas.ref"]]
    },
    /**
     * @description 获取画布hover占位符号的位置信息
     * @return {object|null}
     */
    [types.state.ui["ide.canvas.hover.placeholder.offset"]](state) {
        return state[types.state.ui["ide.canvas.hover.placeholder.offset"]]
    },
    /**
     * @description 获取画布hover占位符号的node
     * @return {nodeConfig}
     */
    [types.state.ui["ide.canvas.hover.placeholder.node"]](state) {
        return state[types.state.ui["ide.canvas.hover.placeholder.node"]]
    },
    /**
     * @description 获取编辑器的配置
     * @return {object}
     */
    [types.getters["ui.code.editor.options"]](state) {
        return {
            mode: state[types.state.ui["code.modes"]]
                       [state[types.state.ui["code.actived"]]],
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2
        }
    },
    /**
     * @description 获取code面板当前激活的tab
     * @return {string} template、style、script其中一个
     */
    [types.state.ui["code.actived"]](state) {
        return state[types.state.ui["code.actived"]]
    },
    /**
     * @description 获取code面板展开收起的状态
     * @return {boolean}
     */
    [types.state.ui["code.spread"]](state) {
        return state[types.state.ui["code.spread"]]
    },
    /**
     * @description 获取左侧sidebar是否展开
     * @return {boolean}
     */
    [types.state.ui["sidebar.spread"]](state) {
        return state[types.state.ui["sidebar.spread"]]
    },
    /**
     * @description 获取页面编辑表单的可见性
     * @return {boolean}
     */
    [types.state.ui["page.form.visiable"]](state) {
        return state[types.state.ui["page.form.visiable"]]
    },
    [types.state.ui["data.form.visiable"]](state) {
        return state[types.state.ui["data.form.visiable"]]
    },
    /**
     * @description 获取选中的组件库的名称
     * @return {string}
     */
    [types.state.data["widget.lib"]](state) {
        return state[types.state.data["widget.lib"]]
    },
    /**
     * @description 获取选中组件库的WidgetLib
     * @return {WidgetLib}
     */
    [types.getters["data.widget.lib.config"]](state,getter) {
        return getter[types.state.data["widget.libs"]]
                     [getter[types.state.data["widget.lib"]]]
    },
    /**
     * @description 获取选中组件库所有组件的配置
     * @return {WidgetGroup[]}
     */
    [types.getters["data.widget.lib.widgets.config"]](state,getter) {
        return getter[types.getters["data.widget.lib.config"]].widgetGroups
    },
    /**
     * @description 获取所有可用的组件库
     * @return {[key:string]:WidgetLib}
     */
    [types.state.data["widget.libs"]](state) {
        return state[types.state.data["widget.libs"]]
    },
    /**
     * @description 获取所有可选组件库的Options
     * @return {{label,value}[]}
     */
    [types.getters["data.widget.libs.options"]](state) {
        const libs = state[types.state.data["widget.libs"]];
        const options = [];
        const names = Object.keys(libs);
        names.forEach((name) => {
            options.push({
                label: name,
                value: name
            })
        });
        return options;
    },
    /**
     * @description 获取节点树
     * @return {array}
     */
    [types.state.data[`nodetree`]](state) {
        return state[types.state.data[`nodetree`]]
    },
    /**
     * @description 获取节点树的实例化对象
     * @return {NodeTree}
     */
    [types.state.data["nodetree.instance"]](state) {
        return state[types.state.data["nodetree.instance"]]
    },
    /**
     * @description 获取节点树使用在Tree组件的数据
     * @return {array}
     */
    [types.getters["data.nodetree.tree"]](state) {
        return util.vue.data.tree(
            state[types.state.data[`nodetree`]]
        )
    },
    [types.getters["data.nodetree.node"]]: (state) => (nodeId) => {
        const nodetreeInstance = state[types.state.data["nodetree.instance"]];
        return nodetreeInstance.find(nodeId);
    },
    /**
     * @description 获取正在更新的节点
     * @return {Node}
     */
    [types.state.data["node.editing"]](state) {
        return state[types.state.data["node.editing"]]
    },
    /**
     * @description 获取正在编辑节点的widget配置
     * @return {object}
     */
    [types.getters["data.node.editing.widget.config"]](state,getter) {
        const nodeConfig = state[types.state.data["node.editing"]];
        let lib = null;
        if (nodeConfig && nodeConfig.lib) {
            lib = state[types.state.data["widget.libs"]][nodeConfig.lib];
        }
        if (lib === null) {
            return null;
        }
        const widgetGroups = lib.widgetGroups;
        let   widgets = [];
        widgetGroups.forEach((group) => {
            widgets = widgets.concat(group.widgets);
        });
        return widgets.find(item => item.tag == nodeConfig.tag);
    },
    /**
     * @description 获取当前正在编辑的页面
     * @return {page}
     */
    [types.state.data["page.editing"]](state) {
        return state[types.state.data["page.editing"]];
    },
    /**
     * @description 获取项目的所有页面列表
     * @return {array}
     */
    [types.state.data["project.page.list"]](state) {
        return state[types.state.data["project.page.list"]]
    },
    /**
     * @description 获取页面模块表单的类型有add/edit
     * @return {string}
     */
    [types.state.data["page.form.type"]](state) {
        return state[types.state.data["page.form.type"]]
    },
    /**
     * @description 获取当前要编辑属性或者是要删除的页面
     * @return {page}
     */
    [types.state.data["page.select"]](state) {
        return state[types.state.data["page.select"]]
    },
    /**
     * @description 获取页面表单填写的数据
     * @return {object}
     */
    [types.state.data["page.form.data"]](state) {
        return state[types.state.data["page.form.data"]]
    },
    [types.state.data["project.data.form.data"]](state){
        return state[types.state.data["project.data.form.data"]]
    },
    /**
     * @description 获取当前编辑的项目信息
     * @return {object}
     */
    [types.state.data.project](state) {
        return state[types.state.data.project]
    },
    /**
     * @description 获取项目的数据配置
     * @return {array}
     */
    [types.state.data["project.data"]](state) {
        return state[types.state.data["project.data"]]
    },
    /**
     * @description 获取项目数据的json数据类型
     * @return {object}
     */
    [types.getters["data.project.data.json"]](state) {
        const configs = state[types.state.data["project.data"]];
        return translater["project.data.json"](configs)
    }
}