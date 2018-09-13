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
            <Select placeholder="请选择UI组件库" v-model="ide_widget_selected_lib">
                <Option v-for="item in ide_widget_libs" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="ide-widget-scroll-view">
            <Collapse simple class="ide-widget-collapse">
                <Panel v-for="(item,index) in ide_widget_selected_widgetGroups_config" :key="index" :value="index" :name="item.name">
                    {{ ide_widget_selected_widgetGroups_config[index].label }}
                    <ul class="ide-widget-list" slot="content">
                        <div v-for="(widgetItem,widgetItemIndex) in ide_widget_selected_widgetGroups_config[index].widgets"  :key="widgetItemIndex">
                            <li class="ide-widget-item">
                                <div class="ide-widget-item-inner">
                                    <Widget 
                                        :config="ide_widget_selected_widgetGroups_config[index].widgets[widgetItemIndex]"
                                    ></Widget>
                                    <span class="mar-t-sm">{{ide_widget_selected_widgetGroups_config[index].widgets[widgetItemIndex].description}}</span>
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
 
    export default {
        name: `IDEWidget`,
        components: {
            Widget: Widget
        },
        computed: {
            ...mapGetters([
                `ide_widget_libs`,
                `ide_widget_default`,
                `ide_widget_selected_config`,
                `ide_widget_selected_widgetGroups_config`
            ]),
            ide_widget_selected_lib: {
                get () {
                    return this.$store.state.ide.ide_widget_selected_lib
                },
                set (value) {
                    this.$store.commit(`SET_IDE_WIDGET_SELECTED_LIB`,value)
                }
            }
        }
    }
</script>
