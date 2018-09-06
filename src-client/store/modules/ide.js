import {
    SET_IDE_CODE_ACTIVED_TAB,
    SET_IDE_CODE_TOGGLE
} from '../mutation-types'

import WIDGETS from '../../../widget/index'

const state = {
    ide_code_spread: false,
    ide_code_actived_tab: ``,
    ide_code_modes: {
        "template": `htmlmixed`,
        "script": `javascript`,
        "style": `css`
    },
    ide_widgets: WIDGETS,
    ide_widget_selected_lib: ``,
    ide_widget_selected_config: {}

    
    // /**
    //  * code模块相关
    //  */
    // code: {
    //     /**
    //      * @var {string}
    //      * @description 显示的代码类型
    //      */
    //     type: ``,
    //     /**
    //      * @var {boolean}
    //      * @description 表示code模块是展开或者收起状态
    //      */
    //     spread: false,
    //     mode_: {
    //         "template": `htmlmixed`,
    //         "script": `javascript`,
    //         "style": `css`
    //     }
    // },
}

const getters = {
    ide_code_editor_options(state,getters) {
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
     * 获取当前渲染的code代码，会根据当前的类型来判断
     * @return {string}
     */
    code(state,getters) {
        return `.header{color:#ccc}\r\nbody{background:#eee}`
    },
    /**
     * 获取脚本代码
     * @return {string}
     */
    scriptCode(state,getters) {
        return `export default {\r\n}`;
    },
    /**
     * 获取模版代码
     * @return {string}
     */
    templateCode(state,getters) {
        return `<h1>H1的标签</h1>`
    }

}

const mutations = {
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
    }
}



export default {
    state,
    getters,
    mutations
}