import { mapGetters, mapMutations, mapActions } from 'vuex'
import Vue from 'vue';
import widget from './widget'
import store from '../../../store/index'

export default (
    config,
    opts = {
        clone: true,
        draggable: true
    }
) => {
    const _opts = {
        clone: typeof opts.clone == 'undefined' ? true : opts.clone,
        draggable: typeof opts.draggable == 'undefined' ? true : opts.draggable
    }
    return new Vue({
        name: `DragWidget`,
        store,
        components: {
            widget: widget
        },
        data() {
            return {
                config: config,
                draggable: _opts.draggable,
                clone: _opts.clone,
                width: 0,
                height: 0
            }
        },
        mounted(){
            const size = this.getSize();
            this.height = size.height;
            this.width = size.width;
        },  
        methods: {
            ...mapMutations([
                `SET_IDE_WIDGET_DRAGING`,
                `DEL_IDE_WIDGET_DRAGING`
            ]),
            ...mapActions([
                `ACT_SET_IDE_WIDGET_DRAGIN_OFFSET`
            ]),
            handleDrag(foo,event) {
                // console.log('->ACT_SET_IDE_WIDGET_DRAGIN_OFFSET',this.width,this.height)
                if (this.width == 0 || this.height == 0) {
                    const size = this.getSize();
                    this.width = size.width;
                    this.height = size.height;
                }
                this.ACT_SET_IDE_WIDGET_DRAGIN_OFFSET({
                    x: event.x,
                    y: event.y,
                    width: this.width,
                    height: this.height
                })
            },
            setDraggable(draggable) {
                this.draggable = draggable;
            },
            mount(parent) {
                parent.appendChild(this.$el);
            },
            getSize() {
                const info = this.$el.getBoundingClientRect();
                return {
                    width: info.width,
                    height: info.height
                }
            },
            getPosSize(parent = null) {
                const topInfo = 
                        parent === null 
                            ? null
                            : parent.getBoundingClientRect();
                const info = this.$el.getBoundingClientRect();
                return {
                    top: topInfo ? info.top - topInfo.top : info.top,
                    left: topInfo ? info.left - topInfo.left : info.left,
                    width: info.width,
                    height: info.height
                }
            }
        },
        template: 
            `<drag ` + 
                `style="display:inline-block;" ` +
                `:draggable="draggable" ` +
                `@drag="handleDrag" ` +
                `@dragstart="SET_IDE_WIDGET_DRAGING(config)" ` +
                `@dragend="DEL_IDE_WIDGET_DRAGING" ` +
            `>` +
                `<widget :config="config"></widget>` +
            `</drag>`
    }).$mount();
}