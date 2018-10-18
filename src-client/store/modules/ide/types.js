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
             * @description 左侧栏展示与否
             */
            [`sidebar.spread`]: `sidebar.spread`,
            /**
             * @description dom节点
             */
            [`ide.canvas.ref`]: `ide.canvas.ref`,
            /**
             * @description ide的预览状态
             */
            [`ide.canvas.preview`]: `ide.preview`,
            /**
             * @description 画布里面hover类型的占位元素是否可见的位置,如果为null表示不可见
             */
            [`ide.canvas.hover.placeholder.offset`]: `ide.canvas.hover.placeholder.offset`,
            /**
             * @description 画布里面hover类型的占位符focus的节点配置
             */
            [`ide.canvas.hover.placeholder.node`]: `ide.canvas.hover.placeholder.node`,
             /**
             * @description 编辑器正在初始化
             */
            [`ide.loading`]: `ide.loading`,
            /**
             * @description 页面模块编辑的表单是否可见
             */
            [`page.form.visiable`]: `page.form.visiable`,
            /**
             * @description 数据管理器的额表单是否可见
             */
            [`data.form.visiable`]: `data.form.visiable`
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
             * @description 当前编辑的页面
             */
            [`page.editing`]: `ide.data.page.editing`,
            /**
             * @description 页面表单的类型
             */
            [`page.form.type`]: `ide.page.form.type`,
            /**
             * @description 页面表单的数据
             */
            [`page.form.data`]: `ide.page.form.data`,
            /**
             * @description 当前选中修改或者是删除的页面
             */
            [`page.select`]: `ide.data.page.select`,


            /**
             * @description 项目相关的信息
             */
            [`project`]: `ide.data.project`,
            /**
             * @description 项目相关的页面列表
             */
            [`project.page.list`]: `ide.data.project.list`,
            /**
             * @description 相关页面相关的节点树
             */
            [`project.page.nodetrees`]: `ide.data.project.page.nodetrees`,
            /**
             * @description 项目数据中心
             */
            [`project.data`]: `ide.data.project.data`,
        }
    },
    getters: {
        [`ui.code.editor.options`]: `ui.code.editor.options`,
        [`data.widget.lib.config`]: `data.widget.lib.config`,
        [`data.widget.lib.widgets.config`]: `data.widget.lib.widgets.config`,
        [`data.widget.libs.options`]: `ide.widget.libs.options`,
        [`data.nodetree.tree`]: `ide.nodetree.tree`,
        [`data.nodetree.node`]: `ide.nodetree.node`,
        [`data.node.editing.widget.config`]: `data.node.editing.widget.config`,
        [`data.project.data.json`]: `data.project.data.json`
    },
    mutations: {
        [`toggle.ui.code.spread`]: `ide.toggle.ui.code.spread`,
        [`update.ui.canvas.ref`]: `update.ui.canvas.ref`,
        [`update.ui.canvas.hover.placeholder.offset`]: `update.ui.canvas.hover.placeholder.offset`,
        [`update.ui.canvas.hover.placeholder.node`]: `update.ui.canvas.hover.placeholder.node`,
        [`update.ui.page.form.visiable`]: `update.ui.page.form.visiable`,
        [`update.ui.data.form.visiable`]: `update.ui.data.form.visiable`,
        [`update.ui.sidebar.spread`]: `update.ui.sidebar.spread`,
        [`toggle.ui.sidebar.spread`]: `toggle.ui.sidebar.spread`,
        [`update.ui.ide.canvas.preview`]: `update.ui.ide.canvas.preview`,
        [`update.ide.loading`]: `ide.update.ide.loading`,
        [`select.data.nodetree`]: `select.data.nodetree`,
        [`insert.data.nodetree.node`]: `ide.insert.data.nodetree.node`,
        [`delete.data.nodetree.node`]: `delete.data.nodetree.node`,
        [`update.data.widget.lib`]: `ide.update.data.widget.lib`,
        [`select.data.editing.node`]: `select.data.editing.node`,
        [`update.data.editing.node.properties`]: `update.data.editing.node.properties`,
        [`insert.editor.record`]: `insert.editor.record`,
        [`select.data.project`]: `select.data.project`,
        [`update.data.project.page.list`]: `update.data.project.page.list`,
        [`insert.data.project.page.list`]: `insert.data.project.page.list`,
        [`set.project.data`]: `set.project.data`,
        [`update.project.data.item`]: `update.project.data.item`,
        [`delete.project.data.item`]: `delete.project.data.item`,
        [`select.data.editing.page`]: `select.data.editing.page`,
        [`update.data.page.form.type`]: `update.data.page.form.type`,
        [`update.data.page.form.data`]: `update.data.page.form.data`,
        [`reset.data.page.form.data`]: `reset.data.page.form.data`
    },
    actions: {
        /**
         * @description 初始化ide的数据
         */
        [`init.data`]: `ide.init.data`,
        /**
         * @description 创建新的页面
         */
        [`new.page`]: `new.page`,
        /**
         * @description 改变选中其他页面
         */
        [`change.page`]: `change.page`
    }
}