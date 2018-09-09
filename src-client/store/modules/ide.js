import {
    SET_IDE_CODE_ACTIVED_TAB,
    SET_IDE_CODE_TOGGLE,
    SET_IDE_WIDGET_SELECTED_LIB,
    SET_IDE_WIDGET_DRAGING,
    DEL_IDE_WIDGET_DRAGING,
    SET_IDE_WIDGET_DRAGING_POSITION,
    SET_IDE_CANVAS_DRAGING_WIDGET,
    SET_IDE_CANVAS_DRAGING_WIDGET_PREVIEW,
    SET_IDE_CANVAS_WIDGET_DRAGING_OVER
} from '../mutation-types'
import {
    ACT_SET_IDE_WIDGET_DRAGIN_POSITION,
    ACT_SET_IDE_CANVAS_WIDGET_PLACEHOLDER
} from '../action-types'

import WIDGETS from '../../../widget/index'
import util from '../../libs/util'

const compiler = require('vue-template-compiler')

console.log('->compiler',compiler)

const nodes = compiler.compile([
    `<div class="wrapper">`,
        `<Layout>`,
            `<Header>`,
                `<Menu v-if="showMenu" v-model="menuList" :config="menuListConfig">`,
                    '<MenuItem>',
                        `<Button size="small" @click="handleClick">按钮</Button`,
                    `</MenuItem>`,
                `</Menu>`,
            `</Header>`,
        `</Layout>`,
    `</div>`
].join('\r\n'))

console.log('--->nodes',nodes)


const state = {
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
    ide_canvas_widgets: [{
        renderTag: `Layout`,
        props: {}
    }],
    ide_canvas_draging_over: false,
    ide_canvas_widget_placeholder: null,
}

const getters = {
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
    }
}

var _t = 0;

function sleep(n) {
    var start = new Date().getTime();
    while(true)  if(new Date().getTime()-start > n) break;
}

const actions = {
    /**
     * 拖拽控件的时候需要计算一下前后两次的position是否有变更，有则触发
     */
    [ACT_SET_IDE_WIDGET_DRAGIN_POSITION]({commit, state, dispatch},{x,y}) {
        const position = state.ide_widget_draging_position;
        if (position.x != x || position.y != y) {
            commit(SET_IDE_WIDGET_DRAGING_POSITION,{x,y});
            dispatch(ACT_SET_IDE_CANVAS_WIDGET_PLACEHOLDER);
        }
    },
    /**
     * 拖拽控件更新position时候会派发事件到这里来
     * 这里主要是操作拖拽widget的占位标签的渲染
     */
    [ACT_SET_IDE_CANVAS_WIDGET_PLACEHOLDER]({commit, state}) {
              // 是否在canvas范围之内
        const isDragOver = state.ide_canvas_draging_over,
              // 拖拽对象的xy坐标
              pos = state.ide_widget_draging_position;
        
        if (isDragOver) {
            /**
             * 
             */
            const _now = Date.now();
            console.log('->pos',pos.x,pos.y,_now - _t);
            sleep(100)
            _t = _now    
        }


    },
    // [ACT_SET_IDE_CANVAS_DRAGING_WIDGET_PREVIEW]({commit, state}) {
    //     const position = state.ide_widget_draging_position;
    //     const dragWidget = state.ide_widget_draging;

    //     console.log(state.ide_canvas_widget_placeholder.toString())
    //     if (!state.ide_canvas_draging_over && state.ide_canvas_widget_placeholder) {
    //         const el = document.querySelector(
    //             `#`+state.ide_canvas_widget_placeholder
    //         );
    //         const parent = el.parentElement;
    //         parent.removeChild(el);
    //         return ;
    //     }

    //     if (state.ide_canvas_widget_placeholder
    //     ) {
    //         const el = document.querySelector(
    //             `#`+state.ide_canvas_widget_placeholder
    //         );
    //         const parent = el.parentElement;
    //         parent.removeChild(el);
    //     }

    //     /**
    //      * @todo
    //      * 这里的代码后面应该要封装到utils里面
    //      */
    //     const canvas = document.querySelector('#canvas');
    //     const dom = document.createElement(`div`);
    //     const id = `placeholder_${util.randomStr(12)}`;
    //     dom.setAttribute('class',`ide-canvas-widget-placeholder`);
    //     dom.setAttribute('id',id);

        
    //     console.log('--->dome',dom,canvas);
    //     canvas.appendChild(dom);
    //     state.ide_canvas_widget_placeholder = id;

       
        

    //     // if (!dragWidget || typeof h == 'undefined') {
    //     //     return h(`template`);
    //     // }
        
    //     // return h(`div`,{
    //     //     class: `ide-canvas-render-preview`
    //     // },[h(dragWidget.renderTag)])
    // }
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
    [SET_IDE_WIDGET_DRAGING_POSITION](state,{x,y}) {
        return Object.assign(state,{
            ide_widget_draging_position: {
                x: x,
                y: y
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
     * 在画布中添加预设置组件进入页面功能
     */
    [SET_IDE_CANVAS_DRAGING_WIDGET_PREVIEW](state) {

    },
    /**
     * 在画布中真正的添加节点内容，会添加到节点树里面
     */
    [SET_IDE_CANVAS_DRAGING_WIDGET](state) {
        
    }
}



export default {
    state,
    actions,
    getters,
    mutations
}