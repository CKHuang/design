export default {
    ide_code_editor_options(state) {
        return {
            mode: state.ide_code_modes[state.ide_code_actived_tab],
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2
        }
    },
    ide_code_actived_tab(state) {
        return state.ide_code_actived_tab
    },
    ide_code_spread(state) {
        return state.ide_code_spread
    },
    /**
     * widget
     */
    ide_widget_default(state) {
        return state.ide_widget_default;
    },
    ide_widget_libs(state) {
        const libs = [];
        for ( let i in state.ide_widgets ) {
            libs.push({
                label: `${i} (${state.ide_widgets[i].version})`,
                value: i
            })
        }
        return libs;
    },
    ide_widget_selected_lib(state) {
        return state.ide_widget_selected_lib;
    },
    ide_widget_selected_config(state,getter) {
        return state.ide_widgets[getter.ide_widget_selected_lib];
    },
    ide_widget_selected_widgetGroups_config(state,getter) {
        return getter.ide_widget_selected_config.widgetGroups
    },
    ide_canvans_ref(state,getter) {
        return state.ide_canvas_ref
    },
    /**
     * 获取节点树
     */
    ide_data_nodetree(state) {
        return state.ide_data_nodetree;
    }
}