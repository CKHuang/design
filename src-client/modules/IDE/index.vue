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
    transition: all  .25s  ease-in;
    -moz-transition: all  .25s  ease-in;
    -webkit-transition: all  .25s  ease-in;
}
.ide-layout .ide-layout-header {
    z-index:905;
}
.ide-layout .ide-layout-content {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    position: relative;
    height: 100%;
    /* overflow: hidden; */
}
.ide-layout.layout-horiz .ide-layout-sider {
    width: 240px;
    position: relative;
    z-index: 901;
    transition: all  .25s  ease-in;
    -moz-transition: all  .25s  ease-in;
    -webkit-transition: all  .25s  ease-in;
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
 .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.ide-loading .ide-layout-header {
    transform:translateY(-40px);
}
.ide-loading .ide-layout.layout-horiz .ide-layout-sider {
    transform:translateX(-240px);
}
.ide-loading .ide-layout-content {
    visibility: hidden;
}
.ide-loading-spin {
    opacity: 1;
    display: none;
}
.ide-loading .ide-loading-spin {
    transition: all  .1s  ease-in;
    -moz-transition: all  .1s  ease-in;
    -webkit-transition: all  .1s  ease-in;
    opacity: 1;
    display: -webkit-box;
}

</style>


<template>
    <div :class="[`ide`, loading ? `ide-loading`: ``]">
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
                                <Icon class="ide-tigger" :type="sidebarSpread? `ios-arrow-dropright` : `ios-arrow-dropleft`" size="18" @click="toggleSidebarSpread"/>
                            </div>
                        </SiderMenu>
                        <div class="ide-layout-content" style="width:200px;" v-show="sidebarSpread">
                            <Widget v-show="leftSiderMenuActived == `widget`"></Widget>
                            <Page v-show="leftSiderMenuActived == `page`"></Page>
                            <NodeTree v-show="leftSiderMenuActived == `nodetree`"></NodeTree>
                            <DataManager v-show="leftSiderMenuActived == `datamanager`"></DataManager>
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
        <div class="ide-loading-spin">
            <Spin fix>
                <Icon type="ios-loading" size=40 class="demo-spin-icon-load mar-b-lg"></Icon>
                <div>正在初始化项目，请稍后</div>
            </Spin>
        </div>
        <CommonMessage></CommonMessage>
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
    import DataManager from './DataManager/index.vue'
    import CommonMessage from '../Common/Message.vue'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../store/modules/ide/types'

    import widgets from '../../../widget/index.js'

    export default {
        name: `IDE`,
        props: {
            projectKey: {
                type: String,
                default: ``
            },
            pageKey: {
                type: String,
                default: ``
            }
        },
        components: {
            Toolbar: Toolbar,
            Widget: Widget,
            Canvas: Canvas,
            Code: Code,
            Page: Page,
            SiderMenu: SiderMenu,
            NodeTree: NodeTree,
            PropsEditor: PropsEditor,
            DataManager: DataManager,
            CommonMessage: CommonMessage
        },
        async created() {
            await this[`init.data`]({
                projectKey: this.projectKey,
                pageKey: this.pageKey
            })
        },
        computed: {
            ...mapGetters({
                "loading": storeTypes.state.ui[`ide.loading`],
                "sidebarSpread": storeTypes.state.ui[`sidebar.spread`]
            })
        },
        data() {
            return {
                leftSiderMenuConfig: [{
                    name: `page`,
                    label: `页面`,
                    icon: `ios-paper-outline`
                },{
                    name: `widget`,
                    label: `控件`,
                    icon: `ios-apps-outline`
                },{
                    name: `nodetree`,
                    label: `组件树`,
                    icon: `ios-list`
                },{
                    name: `datamanager`,
                    label: `数据层`,
                    icon: `logo-buffer`
                }],
                leftSiderMenuActived: `page`,
                leftSiderContentVisiabled: true,
                // iviewWidgets: widgets.iview
            }
        },
        methods: {
            ...mapActions({
                'init.data': storeTypes.actions[`init.data`]
            }),
            ...mapMutations({
                "toggleSidebarSpread": storeTypes.mutations[`toggle.ui.sidebar.spread`]
            })
        },
        watch: {
            leftSiderMenuActived: function(newValue,oldValue) {
                this.leftSiderContentVisiabled = true;
            }
        }
    }
</script>