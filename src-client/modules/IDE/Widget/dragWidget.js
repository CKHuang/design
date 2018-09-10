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
    console.log()
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
                clone: _opts.clone
            }
        },
        mounted(){
            console.log(this);
        },  
        methods: {
            ...mapMutations([
                `SET_IDE_WIDGET_DRAGING`,
                `DEL_IDE_WIDGET_DRAGING`
            ]),
            ...mapActions([
                `ACT_SET_IDE_WIDGET_DRAGIN_POSITION`
            ]),
            handleDrag(foo,event) {
                this.ACT_SET_IDE_WIDGET_DRAGIN_POSITION({
                    x: event.x,
                    y: event.y
                })
            },
            setDraggable(draggable) {
                this.draggable = draggable;
            },
            mount(parent) {
                parent.appendChild(this.$el);
            }
        },
        template: 
            `<drag ` + 
                `:draggable="draggable" ` +
                `@drag="handleDrag" ` +
                `@dragstart="SET_IDE_WIDGET_DRAGING(config)" ` +
                `@dragend="DEL_IDE_WIDGET_DRAGING" ` +
            `>` +
                `<widget :config="config"></widget>` +
            `</drag>`
    }).$mount();
}