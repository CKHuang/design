import {
    SET_IDE_CODE_ACTIVED_TAB,
    SET_IDE_CODE_TOGGLE,
    SET_IDE_WIDGET_SELECTED_LIB,
    SET_IDE_WIDGET_DRAGING,
    DEL_IDE_WIDGET_DRAGING,
    SET_IDE_WIDGET_DRAGING_OFFSET,
    SET_IDE_CANVAS_WIDGET_DRAGING_OVER,
    SET_IDE_CANVAS_REF
} from '../../mutation-types'

export default {
    /**
     * 设置ide里面code模块激活的tab
     */
    [SET_IDE_CODE_ACTIVED_TAB](state,tab) {
        return Object.assign(state,{
            ide_code_actived_tab: tab,
            ide_code_spread: true
        });
    },
    /**
     * toggle切换tab激活的状态
     */
    [SET_IDE_CODE_TOGGLE](state,tab) {
        if (tab != state.ide_code_actived_tab) {
            return Object.assign(state,{
                ide_code_actived_tab: tab,
                ide_code_spread: true
            })
        } else {
            return Object.assign(state,{
                ide_code_actived_tab: ``,
                ide_code_spread: false
            })
        }
    },
    /**
     * 选中其他的控件库
     */
    [SET_IDE_WIDGET_SELECTED_LIB](state,lib) {
        return Object.assign(state,{
            ide_widget_selected_lib: lib
        })
    },
    /**
     * 设置拖拽中的控件
     */
    [SET_IDE_WIDGET_DRAGING](state,widget) {
        return Object.assign(state,{
            ide_widget_draging: widget
        })
    },
    /**
     * 删除拖拽中的控件
     */
    [DEL_IDE_WIDGET_DRAGING](state) {
        return Object.assign(state,{
            ide_widget_draging: null
        })
    },
    /**
     * 设置拖拽中控件的位置
     */
    [SET_IDE_WIDGET_DRAGING_OFFSET](state,{x,y,width,height}) {
        return Object.assign(state,{
            ide_widget_draging_offset: {
                x: x,
                y: y,
                width,
                height
            }
        })
    },
    /**
     * 设置画布面板上空是否有拖拽的控件在盘旋
     */
    [SET_IDE_CANVAS_WIDGET_DRAGING_OVER](state,isDragOver) {
        return Object.assign(state,{
            ide_canvas_draging_over: isDragOver
        })
    },
    /**
     * 设置canvas的dom节点内容
     */
    [SET_IDE_CANVAS_REF](state,canvas) {
        console.log('-->SET_IDE_CANVAS_REF canvas',canvas)
        return Object.assign(state,{
            ide_canvas_ref: canvas
        })
    }
}