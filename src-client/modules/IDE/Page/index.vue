<template>
    <Tree
        :data="treeList"
    >
    </Tree>
</template>

<script>

    /**
     * @name IDEPage
     * @description IDE页面预览功能
     * @property {array} value [{file:{name,id,folder}]
     */
    export default {
        name: `IDEPage`,
        props: {
            value: {
                type: Array,
                default: () => ([])
            }
        },
        computed: {
            treeList() {
                const sortOutFiles = this.util.sortOut(this.value_,`folder_id`);
                const list = [];
                this.folders_.forEach((folder) => {
                   let item = {};
                       item.title = folder.folder_name;
                       item.expand = true;
                       item.children = [];
                       item.render = (h,{root,node,data}) => {
                           console.log('->Data',data);
                           return this.renderFolder(h,folder)
                       }
                       if (sortOutFiles[folder.folder_id]) {
                           sortOutFiles[folder.folder_id].forEach((file) => {
                               item.children.push({
                                   title: file.file_name,
                                   render: (h,{root,node,data}) => {
                                       console.log('->Data renderFile',data);
                                       return this.renderFile(h,file)
                                   }
                               })
                           });
                       }
                       list.push(item);
                });
                // 没有分类的
                sortOutFiles[""].forEach((file) => {
                    let item = {};
                        item.title = file.file_name,
                        item.expand = false;
                        item.render = (h,{root,node,data}) => {
                            return this.renderFile(h,file);
                        }
                    list.push(item);
                })
                //console.log('page tree',list,sortOutFiles,this.folders_);
                return list;
            }
        },
        created() {
            this.value_ =  [{
                file_name: `产品功能页面`,
                file_type: 0,
                file_id: `file_8273729308238`,
                project_id: `project_827374637366736362`,
                folder_id: `folder_2837292837472827374`
            },{
                file_name: `用户流信息页面`,
                file_type: 0,
                file_id: `file_827373874643`,
                project_id: `project_827374637366736362`,
                folder_id: ``
            },{
                file_name: `产品功能页面`,
                file_type: 0,
                file_id: `file_827372930232`,
                project_id: `project_827374637366736362`,
                folder_id: ``
            }];
            this.folders_ = [{
                folder_id: `folder_2837292837472827374`,
                folder_name: `前期规划`
            }]
        },
        data() {
            return {
                value_: this.value,
                folders_: [],
            }
        },
        methods: {
            renderFile(h,file) {
                return h(`span`,{
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                },[
                    h(`span`,[
                        h(`Icon`,{
                            props: {
                                type: 'ios-paper-outline'
                            },
                            class: `mar-r-sm`
                        }),
                        h(`span`,file.file_name)
                    ])
                ])
            },
            renderFolder(h,folder) {
                return h(`span`,{
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                },[
                    h(`span`,[
                        h(`Icon`,{
                            props: {
                                type: 'ios-folder-outline'
                            },
                            class: `mar-r-sm`
                        }),
                        h(`span`,folder.folder_name)
                    ])
                ])
            }
        }
    }
</script>

