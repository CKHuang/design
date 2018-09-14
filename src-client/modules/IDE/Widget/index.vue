<style scoped>
.ide-widget {
    width: 100%;
    height: 100%;
    position: relative;
}
.ide-widget-select {
    margin: 10px;
    box-sizing: border-box;
}
.ide-widget-scroll-view {
    position: relative;
    overflow-y: scroll;
}
.ide-widget-group-title {
    padding:10px;
    border-right: 1px solid #eee;
}
.ide-widget-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
}
</style>

<style>
/*
 * 只是ide用到的手风琴样式效果
 */
.ide-widget-collapse {
    border-color:#eee !important;
    border-top:0 !important;
}
.ide-widget-collapse .ivu-collapse-content {
    padding: 0px !important;
}
.ide-widget-collapse.ivu-collapse>.ivu-collapse-item {
    border-color:#eee !important;
}
.ide-widget-collapse .ivu-collapse-content-box {
    padding-bottom: 0px !important;
    margin-bottom: -1px;
}
.ide-widget-collapse.ivu-collapse-simple>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
    background-color:#eee;
}
/* .ide-widget-collapse.ivu-collapse-simple>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
    border-right:1px solid #eee;
} */
</style>


<template>
    <div class="ide-widget">
        <div class="ide-widget-select">
            <Select placeholder="请选择UI组件库" v-model="lib">
                <Option v-for="item in libs" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="ide-widget-scroll-view">
            <Collapse simple class="ide-widget-collapse">
                <Panel v-for="(item,index) in libWidgetsConfig" :key="index" :value="index" :name="item.name">
                    {{ libWidgetsConfig[index].label }}
                    <ul class="ide-widget-list" slot="content">
                        <div v-for="(widgetItem,widgetItemIndex) in libWidgetsConfig[index].widgets"  :key="widgetItemIndex">
                            <li class="ide-widget-item">
                                <div class="ide-widget-item-inner">
                                    <Widget 
                                        :config="libWidgetsConfig[index].widgets[widgetItemIndex]"
                                    ></Widget>
                                    <span class="mar-t-sm">{{libWidgetsConfig[index].widgets[widgetItemIndex].description}}</span>
                                </div>
                            </li>
                        </div>
                    </ul>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
    import Widget from './Widget.vue'
    import { mapGetters, mapMutations } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDEWidget`,
        components: {
            Widget: Widget
        },
        computed: {
            ...mapGetters({
                "libs": storeTypes.getters[`data.widget.libs.options`],
                "libConfig": storeTypes.getters[`data.widget.lib.config`],
                "libWidgetsConfig": storeTypes.getters[`data.widget.lib.widgets.config`]
            }),
            lib: {
                get () {
                    return this.$store.state.ide[storeTypes.state.data[`widget.lib`]]
                },
                set (value) {
                    this.$store.commit(storeTypes.mutations[`update.data.widget.lib`],value)
                }
            }
        }
    }
</script>
