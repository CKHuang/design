import {
    ACT_SET_IDE_WIDGET_DRAGIN_OFFSET,
    ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER,
    ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET
} from '../../action-types'
import {
    SET_IDE_WIDGET_DRAGING_OFFSET,
    SET_IDE_CANVAS_WIDGET_DRAGING_OVER
} from '../../mutation-types'
import createDragWidget from '../../../modules/IDE/Widget/dragWidget.js'
import util from '../../../libs/util'


/**
 * 判断两个矩形是否碰撞相交
 */
const isCollide = (p1,p2) => {
    let maxX,maxY,minX,minY;
    maxX = p1.x + p1.width >= p2.x + p2.width ? p1.x + p1.width : p2.x + p2.width;
    maxY = p1.y + p1.height >= p2.y + p2.height ? p1.y + p1.height : p2.y + p2.height;
    minX = p1.x <= p2.x ? p1.x : p2.x;
    minY = p1.y <= p2.y ? p1.y : p2.y;
    if (maxX - minX <= p1.width + p2.width
        && maxY - minY <= p1.height + p2.height
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * p1覆盖p2面积与p1面积的占比
 */
const coverRatio = (p1,p2) => {
    const area1 = p1.width * p1.height;
    const area2 = p1.widget * p2.height;

    const _x = [
        p1.x,
        p1.x + p1.width,
        p2.x,
        p2.x + p2.width
    ].sort((a,b) => a - b );

    const _w = _x[2] - _x[1];

    const _y = [
        p1.y,
        p1.y + p1.height,
        p2.y,
        p2.y + p2.height
    ].sort((a,b) => a - b );

    const _h = _y[2] - _y[1];

    const _area = _h * _w;

    console.log('--->_area',_area,'->area1',area1,'->_w',_w,'->_h',_h);
    return _area / area1;
}


export default {
    /**
     * 拖拽控件的时候需要计算一下前后两次的position是否有变更，有则触发
     */
    [ACT_SET_IDE_WIDGET_DRAGIN_OFFSET]({commit, state, dispatch},{x,y,height,width}) {
        const position = state.ide_widget_draging_offset;
        if (position.x != x || position.y != y) {
            //console.log('->action ACT_SET_IDE_WIDGET_DRAGIN_POSITION',)
            commit(SET_IDE_WIDGET_DRAGING_OFFSET,{x,y,height,width});
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
              dwOffset = state.ide_widget_draging_offset,
              // 画布里面的所以元素
              widgets = state.ide_canvas_widgets;
        
        if (isDragOver) {
            /**
             * @todo 
             * 此处应该会拿当前控件的位置和所有的组件进行位置判断
             * 来设置占位符的位置，这里会有比较大的计算量，占用js
             * 主线程的资源，但是这里的触发是通过事件的方式，如果
             * 执行慢多话会持续执行，这里做了个test，在这里sleep
             * 100
             */
            console.time(`ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER`)
            const ratios = [];
            widgets.forEach((widget) => {
                let ratio = 0;
                const wOffset = widget.offset;
                const p1 = {
                    width: dwOffset.width,
                    height: dwOffset.height,
                    x: dwOffset.x,
                    y: dwOffset.y
                },p2 = {
                    width: wOffset.width,
                    height: wOffset.height,
                    x: wOffset.x,
                    y: wOffset.y
                }
                if (isCollide(p1,p2)) {
                    ratio = coverRatio(p1,p2);
                }
                ratios.push(ratio);
            });
            console.log('->ratios 面积占比',ratios);
            console.timeEnd(`ACT_UPDATE_IDE_CANVAS_WIDGET_PLACEHOLDER`);    
        }
    },
    /**
     * @drop的时候添加控件
     */
    [ACT_INSERT_IDE_CANVAS_DRAGING_WIDGET]({commit, state}) {
        const dragWidget = util.deepClone(state.ide_widget_draging),
              pos = state.ide_widget_draging_offset,
              canvas = state.ide_canvas_ref;
       
        const el = createDragWidget(dragWidget,{
            draggable: false
        });
        el.mount(canvas);
        const toCanvasSize = el.getPosSize(canvas);
        Object.assign(dragWidget,{
            offset: {
                width: toCanvasSize.width,
                height: toCanvasSize.height,
                canvasX: toCanvasSize.left,
                canvasY: toCanvasSize.top,
                x: pos.x,
                y: pos.y
            }
        })
        /**
         * 这里是要加到里面的
         */
        state.ide_canvas_widgets.push(dragWidget);
        commit(SET_IDE_CANVAS_WIDGET_DRAGING_OVER,false)

        console.log('-->state',state.ide_canvas_widgets)
        
        // console.log('---->DragWidget',widget,DragWidget)
        // canvas.appendChild(widget.$el)
        
        // const element = util.vue.createDragComponent(dragWidget.renderTag);
        // console.log('->将要添加的控件',dragWidget,pos,canvas,element);
        // element.append(canvas);
        
    }
}