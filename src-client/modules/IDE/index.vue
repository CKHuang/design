<style scoped>
.ide {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
}
/*
 * 布局相关
 */
.ide-layout {
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-flex: 1;
    flex: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ide-layout.layout-horiz {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
}

.ide-layout .ide-layout-header,
.ide-layout .ide-layout-footer {
    -webkit-box-flex: 0;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
.ide-layout .ide-layout-header {
    z-index:905;
}
.ide-layout .ide-layout-content {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    overflow: auto;
    position: relative;
}
.ide-layout.layout-horiz .ide-layout-sider {
    width: 240px;
    position: relative;
    z-index: 901;
}
.ide-layout.layout-horiz .ide-layout-sider.auto-width {
    width: auto;
}
.ide-layout.layout-horiz .ide-layout-sider.set-box-shadow {
    box-shadow: rgba(39, 54, 78, 0.11) 0px -2px 30px 0px;
}
.ide-layout.layout-horiz .ide-layout-sider.set-right-box-shadow {
    box-shadow: rgba(39, 54, 78, 0.11) 2px -2px 21px -3px;
}
/*
 * 固定底部
 */
.fixed-bottom {
    width: 100%;
    position: absolute;
    bottom: 0px;
}

/*
 * ide的公共样式
 */
.ide-tigger {
    cursor: pointer;
}
.ide-tigger:hover {
    color: #333;
}
</style>

<style>
html,body {
    width:100%;
    height:100%;
    overflow: hidden;
}
</style>


<template>
   
    <div class="ide">
        <div class="ide-layout">
            <div class="ide-layout-header">
                <Toolbar></Toolbar>
            </div>
            <div class="ide-layout layout-horiz">
                <div class="ide-layout-sider auto-width set-right-box-shadow">
                    <div class="ide-layout layout-horiz">
                        <SiderMenu
                            v-model="leftSiderMenuActived"
                            :config="leftSiderMenuConfig"
                        >
                            <div slot="bottom">
                                <Icon class="ide-tigger" :type="leftSiderContentVisiabled? `ios-arrow-dropright` : `ios-arrow-dropleft`" size="18" @click="handleToggleLeftSideContent"/>
                            </div>
                        </SiderMenu>
                        <div class="ide-layout-content" style="width:200px;" v-if="leftSiderContentVisiabled">
                            <Widget v-if="leftSiderMenuActived == `widget`"></Widget>
                            <Page v-if="leftSiderMenuActived == `page`"></Page>
                            <NodeTree v-if="leftSiderMenuActived == `nodetree`"></NodeTree>
                        </div>
                    </div>
                </div>
                <div class="ide-layout-content" style="background-color: #f5f5f5;">
                    <div class="ide-layout">
                        <div class="ide-layout-content">
                            <Canvas></Canvas>
                        </div>
                        <div class="ide-layout-footer">
                            <Code></Code>
                        </div>
                    </div>
                </div>
                <!-- <PropsEditor></PropsEditor> -->
                <!-- <div class="ide-layout-sider set-box-shadow"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/index.vue'
    import Widget from './Widget/index.vue'
    import Canvas from './Canvas/index.vue'
    import Code from './Code/index.vue'
    import Page from './Page/index.vue'
    import SiderMenu from './Menu/siderMenu.vue'
    import PropsEditor from './PropsEditor/index.vue'
    import NodeTree from './NodeTree/index.vue'

    import widgets from '../../../widget/index.js'

    export default {
        name: `IDE`,
        components: {
            Toolbar: Toolbar,
            Widget: Widget,
            Canvas: Canvas,
            Code: Code,
            Page: Page,
            SiderMenu: SiderMenu,
            NodeTree: NodeTree,
            PropsEditor: PropsEditor
        },
        data() {
            return {
                leftSiderMenuConfig: [{
                    name: `widget`,
                    label: `控件`,
                    icon: `ios-apps-outline`
                },{
                    name: `page`,
                    label: `页面`,
                    icon: `ios-paper-outline`
                },{
                    name: `nodetree`,
                    label: `组件树`,
                    icon: `ios-list`
                },{
                    name: `database`,
                    label: `数据层`,
                    icon: `logo-buffer`
                }],
                leftSiderMenuActived: `widget`,
                leftSiderContentVisiabled: true,
                iviewWidgets: widgets.iview
            }
        },
        methods: {
            handleToggleLeftSideContent() {
                this.leftSiderContentVisiabled 
                    = this.leftSiderContentVisiabled ? false : true;
            }
        },
        watch: {
            leftSiderMenuActived: function(newValue,oldValue) {
                this.leftSiderContentVisiabled = true;
            }
        }
    }
</script>