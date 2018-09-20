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
    line-height: 18px;
    border-radius: 2px;
}

.ide-page-item:hover {
    background-color: #f5f5f5;
}
.ide-page-item.current {
    background-color: #efefef;
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
    height: 100%;
    width: 18px;
}
.ide-page-item:hover .ide-page-item-btns  {
    display: block;
}
.ide-page-item-title .ivu-icon {
    margin-right: 3px;
}

</style>


<template>
    <div>
        <Divider orientation="right">
            <Button @click="updatePageFormVisiable({visiable:true,formType:`add`})" icon="ios-add-circle-outline" size="small">新页面</Button>
        </Divider>
        <Tree
            class="ide-page-tree"
            :data="renderTreeData"
        >
        </Tree>
        <PageForm></PageForm>
    </div>
   
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import PageForm from './form'

    /**
     * @name IDEPage
     * @description IDE页面预览功能
     * @property {array} value [{file:{name,id,folder}]
     */
    export default {
        name: `IDEPage`,
        components: {
            PageForm: PageForm
        },
        data() {
            return {
                renderTreeData: [],
                selectIndex: null
            }
        },
        computed: {
            ...mapGetters({
                "projectPageList": storeTypes.state.data[`project.page.list`],
                "pageEditing": storeTypes.state.data[`page.editing`]
            })
        },
        methods: {
            ...mapMutations({
                "select.data.editing.page": storeTypes.mutations[`select.data.editing.page`],
                "updatePageFormVisiable": storeTypes.mutations[`update.ui.page.form.visiable`],
                "updatePageSelectData": storeTypes.mutations[`update.data.page.form.data`]
            }),
            renderPageItem(h, {root, node, data}) {
                return h(`div`,{
                    "class": `ide-page-item ${data.nodeKey == this.selectIndex ? "current" : ""}`,
                    on: {
                        click: (event) => {
                            const page = this[`projectPageList`][data.nodeKey]
                            this[`select.data.editing.page`](page);                          
                        }
                    }
                },[
                    h(`div`,{
                        'class': `ide-page-item-title`
                    },[
                        h(`Icon`,{
                            'class': `ide-page-item-icon`,
                            props: {
                                type: `ios-document-outline`,
                                size: 15
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
                                type: `ios-create-outline`,
                                size: 15
                            },
                            on: {
                                click: (event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    const page = this[`projectPageList`][data.nodeKey];
                                    this[`updatePageFormVisiable`]({
                                        visiable: true,
                                        formType: `edit`
                                    })
                                    this[`updatePageSelectData`]({
                                        page: page
                                    })
                                    //const page = this[`projectPageList`][data.nodeKey]
                                    console.log('-->点击编辑页面',page)
                                    //this[`updatePageFormVisiable`]()
                                }
                            }
                        }),
                        h(`Icon`,{
                            'class': `btn-item`,
                            props: {
                                type: `ios-trash-outline`,
                                size: 15
                            },
                            on: {
                                click: (event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
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
            },
            updateSelectPage(pageEditing) {
                let select = null,
                    selectIndex = null;
                if (pageEditing) {
                    this.projectPageList.forEach((page,index) => {
                        if (page.id == pageEditing.id) {
                            select = page;
                            selectIndex = index;
                        }
                    })
                }
                this.selectIndex = selectIndex
            }
        },
        watch: {
            "projectPageList": {
                handler: function(newValue,oldValue) {
                    this.updateRenderTreeData(newValue);
                },
                deep: true
            },
            "pageEditing": {
                handler: function(newValue,oldValue) {
                    this.updateSelectPage(newValue)
                },
                deep: true
            }
        }
    }
</script>

