<style>
.ide-canvas-editnode-foucs {
    position: absolute;
    top:0px;
    left: 0px;
    z-index: 101
}
.ide-canvas-editnode-foucs-info {
     position: absolute;
    top: -21px;
    left: -1px;
    display: flex;
    line-height: 20px;
}
.ide-canvas-editnode-foucs-info span {
    background-color: #3b97e3;
    color: #fff;
    padding: 1px 8px;
    display: inline-block;
}

.ide-canvas-editnode-opera .opera-btn {
        cursor: pointer;
    background-color: #3988c7;
    color: #fff;
    padding: 1px 6px;
    display: inline-block;
    height: 100%;
    line-height: 20px;
}
.ide-canvas-editnode-selected {
    /* background-color: rgba(232, 245, 253, 0.397); */
    outline: #2d8cf0 2px solid !important;
    outline-offset: 0px !important;
    position: relative !important;
    z-index: 902;
}
</style>


<template>
   <div class="ide-canvas-editnode-foucs" 
        v-if="nodeConfig"
        :style="{top:(offset_top - 1)+'px',left:(offset_left-1)+'px',width:width+'px'}"
    >
        
        <div class="ide-canvas-editnode-foucs-info">
            <span>{{ nodeConfig.tag }}</span>
            <div class="ide-canvas-editnode-opera">
                <Icon title="删除节点" class="opera-btn" type="md-trash" @click="deleteNode(nodeConfig.id)"/>
            </div>
        </div>
   </div>
</template>

<script>
    import util from '../../../libs/util'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDECanvasEditNode`,
        computed: {
            ...mapGetters({
                "nodeConfig": storeTypes.state.data[`node.editing`],
                "canvasRef": storeTypes.state.ui[`ide.canvas.ref`]
            })
        },
        data() {
            return {
                offset_left: 0,
                offset_top: 0,
                width: 0
            }
        },
        methods: {
            ...mapMutations({
                "deleteNode": storeTypes.mutations[`delete.data.nodetree.node`]
            }),
            clearOldHoverClass(oldValue) {
                if (oldValue) {
                    const dom = document.querySelector(`#${oldValue.id}`);
                    dom && util.removeClass(dom,`ide-canvas-editnode-selected`)
                }
            },
            setNewHoverClass(newValue) {
                if (newValue) {
                    const dom = document.querySelector(`#${newValue.id}`);
                    const canvasOffset = this.canvasRef.getBoundingClientRect();
                    if (dom) {
                        const offset = dom.getBoundingClientRect();
                        this.offset_left = offset.x - canvasOffset.x;
                        this.offset_top = offset.y - canvasOffset.y;
                        this.width = offset.width > 150 ? offset.width : 150;
                        dom && util.addClass(dom,`ide-canvas-editnode-selected`);
                    } 
                }
            }
        },
        watch: {
            nodeConfig: {
                handler: function(newValue,oldValue) {
                    this.clearOldHoverClass(oldValue);
                    this.setNewHoverClass(newValue);
                },
                deep: true
            }
        }
        
    }
</script>

