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
            <Collapse simple class="ide-widget-collapse" :value="widgetGroupsViewsName">
                <Panel v-for="(item,index) in widgetGroupsConfig_" :key="index" :value="index" :name="item.name">
                    {{ widgetGroupsConfig_[index].label }}
                    <ul class="ide-widget-list" slot="content">
                        <div v-for="(widgetItem,widgetItemIndex) in widgetGroupsConfig_[index].widgets"  :key="widgetItemIndex">
                             <WidgetItem 
                                :config="widgetGroupsConfig_[index].widgets[widgetItemIndex]"
                                @on-drag="handleDrag"
                            ></WidgetItem>
                        </div>
                    </ul>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
    import WidgetItem from './item.vue'
    import widgets from '../../../../widget/index.js'
 
    export default {
        name: `IDEWidget`,
        components: {
            WidgetItem: WidgetItem
        },
        data() {
            return {
                lib: ``,
                config_: {
                    name: ``,
                    version: ``,
                    description: ``,
                    widgetGroups: [{
                        label: ``,
                        widgets: [{
                            name: ``,
                            renderTag: ``,
                            description: ``,
                            props: {}
                        }]
                    }]
                },
                widgetGroupsConfig_: [],
                widgetGroupsViewsName: [],
            }
        },
        created() {
           this.lib = widgets.default;
        },
        computed: {
            widgetGroupsIndex() {
                return Object.keys(this.widgetGroupsConfig_);
            },
            libs() {
                const libs = [];
                for ( let i in widgets.libs ) {
                    libs.push({
                        label: `${i} (${widgets.libs[i].version})`,
                        value: i
                    })
                }
                return libs;
            }
        },
        methods: {
            handleDrag({x,y}) {
                // console.log('->x',x,'->y',y);
            },
            updateWidgetGroupsConfig(widgetGroups) {
                const configs = [];
                const names = [];
                const _widgetGroups = this.util.deepClone(widgetGroups);
                _widgetGroups.forEach((item) => {
                    item.name = this.util.randomStr(12);
                    configs.push(item);
                    names.push(item.name);
                });
                this.$nextTick(() => {
                    this.widgetGroupsViewsName = names;
                })
                this.widgetGroupsConfig_ = configs;
            }
        },
        watch: {
            lib: function(newVal,oldVal) {
                if (newVal != oldVal) {
                    if (widgets.libs[newVal]) {
                        this.config_ = widgets.libs[newVal];
                        this.updateWidgetGroupsConfig(
                            this.config_.widgetGroups
                        );
                    }
                    
                }
            }
        }
    }
</script>
