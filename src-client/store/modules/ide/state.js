import WIDGETS from '../../../../widget/index'

export default {
    /**
     * code面板
     */
    ide_code_spread: false,
    ide_code_actived_tab: ``,
    ide_code_modes: {
        "template": `htmlmixed`,
        "script": `javascript`,
        "style": `css`
    },
    /**
     * widget面板
     */
    ide_widgets: WIDGETS.libs,
    ide_widget_selected_lib: WIDGETS.default,
    ide_widget_draging: null,
    ide_widget_draging_position: {x:0,y:0},
    /**
     * canvas
     */
    // canvas里面所有的控件
    ide_canvas_ref: null,
    ide_canvas_widgets: [],
    ide_canvas_draging_over: false,
    ide_canvas_widget_placeholder: null,
}