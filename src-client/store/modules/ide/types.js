/**
 * @description IDE相关用到的state、getters等所有的type
 * @type {object}
 */
export default {
    state: {
        ui: {
            /**
             * @description code模块展开状态
             */
            [`code.spread`]: `ide.ui.code.spread`,
            /**
             * @description code模块的激活tab
             */
            [`code.actived`]: `ide.ui.code.actived`,
            /**
             * @description 代码编辑器的渲染模式
             */
            [`code.modes`]: `ide.code.modes`
        },
        data: {
            /**
             * @description 选中的控件库
             */
            [`widget.libs`]: `ide.data.widget.libs`,
            /**
             * @description 可选的组件库
             */
            [`widget.lib`]: `ide.data.widget.lib`,
            /**
             * @description 组件树
             */
            [`nodetree`]: `ide.data.nodetree`,
            /**
             * @description NodeTree实例
             */
            [`nodetree.instance`]: `ide.data.nodetree.instance`
        }
    },
    getters: {
        [`ui.code.editor.options`]: `ui.code.editor.options`,
        [`data.widget.lib.config`]: `data.widget.lib.config`,
        [`data.widget.lib.widgets.config`]: `data.widget.lib.widgets.config`,
        [`data.widget.libs.options`]: `ide.widget.libs.options`,
        [`data.nodetree.tree`]: `ide.nodetree.tree`
    },
    mutations: {
        [`insert.data.nodetree.node`]: `ide.insert.data.nodetree.node`,
        [`update.data.widget.lib`]: `ide.update.data.widget.lib`,
        [`toggle.ui.code.spread`]: `ide.toggle.ui.code.spread`
    }
}