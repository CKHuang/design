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
            [`code.modes`]: `ide.code.modes`,
             /**
             * @description 编辑器正在初始化
             */
            [`ide.loading`]: `ide.loading`
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
            [`nodetree.instance`]: `ide.data.nodetree.instance`,
            /**
             * @description 正在编辑的节点
             */
            [`node.editing`]: `ide.data.node.editing`,
            /**
             * @description 所有的操作记录
             */
            [`record`]: `ide.data.record`,
            /**
             * @description 操作记录
             */
            [`record.instance`]: `ide.data.record.instance`,
            /**
             * @description 记录的模块
             */
            [`record.mod`]: `ide.data.record.mod`,
            /**
             * @description 记录的行为
             */
            [`record.act`]: `ide.data.record.act`,
            /**
             * @description 项目相关的信息
             */
            [`project`]: `ide.data.project`,
            /**
             * @description 项目相关的页面列表
             */
            [`project.page.list`]: `ide.data.project.list`,
            /**
             * @description 当前编辑的页面
             */
            [`page.editing`]: `ide.data.page.editing`,
            
        }
    },
    getters: {
        [`ui.code.editor.options`]: `ui.code.editor.options`,
        [`data.widget.lib.config`]: `data.widget.lib.config`,
        [`data.widget.lib.widgets.config`]: `data.widget.lib.widgets.config`,
        [`data.widget.libs.options`]: `ide.widget.libs.options`,
        [`data.nodetree.tree`]: `ide.nodetree.tree`,
        [`data.node.editing.widget.config`]: `data.node.editing.widget.config`
    },
    mutations: {
        [`update.ide.loading`]: `ide.update.ide.loading`,
        [`insert.data.nodetree.node`]: `ide.insert.data.nodetree.node`,
        [`update.data.widget.lib`]: `ide.update.data.widget.lib`,
        [`toggle.ui.code.spread`]: `ide.toggle.ui.code.spread`,
        [`select.data.editing.node`]: `select.data.editing.node`,
        [`update.data.editing.node.properties`]: `update.data.editing.node.properties`,
        [`insert.editor.record`]: `insert.editor.record`,
        [`update.data.project`]: `update.data.project`,
        [`update.data.project.page.list`]: `update.data.project.page.list`,
        [`select.data.editing.page`]: `select.data.editing.page`
    },
    actions: {
        [`init.data`]: `ide.init.data`
    }
}