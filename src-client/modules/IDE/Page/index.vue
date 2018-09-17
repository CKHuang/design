<style>
.ide-page-item-btns {
    display: none;
}
.ide-page-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 5px;
    cursor: pointer;
}
.ide-page-item:hover .ide-page-item {
    display: block;
}
.ide-page-item:hover {
    background-color: #e1e1e1;
}
.ide-page-item-title {
    flex: 1 0 90px;
}
.ide-page-tree {
    padding: 0px 10px;
}
.ide-page-tree.ivu-tree ul li {
    margin: 0px;
}
.ide-page-tree .ivu-tree-arrow{
    display: none;
}
.ide-page-item-btns .btn-item {
    cursor: pointer;
}

</style>


<template>
    <div>
        <Divider orientation="right">
            <Button icon="ios-add-circle-outline" size="small">新页面</Button>
        </Divider>
        <Tree
            class="ide-page-tree"
            :data="renderTreeData"
        >
        </Tree>
    </div>
   
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    /**
     * @name IDEPage
     * @description IDE页面预览功能
     * @property {array} value [{file:{name,id,folder}]
     */
    export default {
        name: `IDEPage`,
        data() {
            return {
                renderTreeData: []
            }
        },
        computed: {
            ...mapGetters({
                "projectPageList": storeTypes.state.data[`project.page.list`]
            })
        },
        methods: {
            renderPageItem(h, {root, node, data}) {
                console.log('->renderPageItem',root,node,data)
                return h(`div`,{
                    "class": `ide-page-item`
                },[
                    h(`div`,{
                        'class': `ide-page-item-title`
                    },[
                        h(`Icon`,{
                            'class': `ide-page-item-icon`,
                            props: {
                                type: `ios-document-outline`
                            }
                        }),
                        h(`span`,data.title)
                    ]),
                    h(`div`,{
                        'class': `ide-page-item-btns`
                    },[
                        h(`Icon`,{
                            'class': `btn-item`,
                            props: {
                                type: `ios-create-outline`
                            },
                            on: {
                                click: () => {
                                    console.log('-->点击编辑页面',data)
                                }
                            }
                        }),
                        h(`Icon`,{
                            'class': `btn-item`,
                            props: {
                                type: `ios-trash-outline`
                            },
                            on: {
                                click: () => {
                                    console.log('-->点击删除页面',data)
                                }
                            }
                        })
                    ])
                ])
            },
            updateRenderTreeData(projectPageList) {
                const result = [];
                projectPageList.forEach((page) => {
                    const item = {
                        title: page.name,
                        expand: false,
                        render: this.renderPageItem
                    }
                    result.push(item)
                });
                this.renderTreeData = result;
                console.log('-->projectPageList',projectPageList,result)
            }
        },
        watch: {
            "projectPageList": {
                handler: function(newValue,oldValue) {
                    if (newValue != oldValue) {
                        this.updateRenderTreeData(newValue);
                    }
                },
                deep: true
            }
        }
    }
</script>

