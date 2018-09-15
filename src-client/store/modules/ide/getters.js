import types from './types'
import util from '../../../libs/util'

export default {
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
     * @description 获取节点树使用在Tree组件的数据
     * @return {array}
     */
    [types.getters["data.nodetree.tree"]](state) {
        return util.vue.data.tree(
            state[types.state.data[`nodetree`]]
        )
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
        const widgetConfig = widgets.find(item => item.tag == nodeConfig.tag);
        console.log('->[widgetGroups]',widgets)
    }
}