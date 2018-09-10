import {
    ACT_SET_IDE_WIDGET_DRAGIN_POSITION,
    ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER,
    ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET
} from '../../action-types'
import {
    SET_IDE_WIDGET_DRAGING_POSITION
} from '../../mutation-types'
import createDragWidget from '../../../modules/IDE/Widget/dragWidget.js'


export default {
    /**
     * 拖拽控件的时候需要计算一下前后两次的position是否有变更，有则触发
     */
    [ACT_SET_IDE_WIDGET_DRAGIN_POSITION]({commit, state, dispatch},{x,y}) {
        const position = state.ide_widget_draging_position;
        if (position.x != x || position.y != y) {
            //console.log('->action ACT_SET_IDE_WIDGET_DRAGIN_POSITION',)
            commit(SET_IDE_WIDGET_DRAGING_POSITION,{x,y});
            dispatch(ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER);
        }
    },
    /**
     * 拖拽控件更新position时候会派发事件到这里来
     * 这里主要是操作拖拽widget的占位标签的渲染
     */
    [ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER]({commit, state}) {
              // 是否在canvas范围之内
        const isDragOver = state.ide_canvas_draging_over,
              // 拖拽对象的xy坐标
              pos = state.ide_widget_draging_position;
        
        if (isDragOver) {
            /**
             * @todo 
             * 此处应该会拿当前控件的位置和所有的组件进行位置判断
             * 来设置占位符的位置，这里会有比较大的计算量，占用js
             * 主线程的资源，但是这里的触发是通过事件的方式，如果
             * 执行慢多话会持续执行，这里做了个test，在这里sleep
             * 100
             */
            const _now = Date.now();
             
        }
    },
    /**
     * @drop的时候添加控件
     */
    [ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET]({commit, state}) {
        const dragWidget = state.ide_widget_draging,
              pos = state.ide_widget_draging_position,
              canvas = state.ide_canvas_ref;
       
        const el = createDragWidget(dragWidget,{
            draggable: false
        });
        console.log('-->el',el);
        el.mount(canvas);

        /**
         * 这里是要加到里面的
         */
        state.ide_canvas_widgets.push(dragWidget);

        console.log('-->state',state.ide_canvas_widgets)
        
        // console.log('---->DragWidget',widget,DragWidget)
        // canvas.appendChild(widget.$el)
        
        // const element = util.vue.createDragComponent(dragWidget.renderTag);
        // console.log('->将要添加的控件',dragWidget,pos,canvas,element);
        // element.append(canvas);
        
    }
}