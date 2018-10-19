<style>
.ide-data-item:hover .ide-page-item-btns {
    display: block;
}
</style>


<template>
    <Tree
        class="ide-page-tree"
        :data="renderTreeData"
    >
    </Tree>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import Emitter from 'iview/src/mixins/emitter'

    export default {
        name: `DataManagerList`,
        mixins: [Emitter],
        computed: {
            ...mapGetters({
                'projectData': storeTypes.state.data[`project.data`]
            })
        },
        data() {
            return {
                renderTreeData: []
            }
        },
        methods: {
            ...mapMutations({
                'updateFormVisiable': storeTypes.mutations[`update.ui.data.form.visiable`],
                'updateEditProjectData': storeTypes.mutations[`update.data.project.data.form.data`]
            }),
            renderItem(h, {root, node, data}) {
                return h(`div`,{
                    "class": `ide-page-item ide-data-item`,
                    on: {
                        click: (event) => {

                        }
                    }
                },[
                    h(`div`,{
                        'class': `ide-page-item-title`
                    },[
                        h(`Icon`,{
                            'class': `ide-page-item-icon`,
                            props: {
                                type: `ios-disc`,
                                size: 15
                            }
                        }),
                        h(`Tooltip`,{
                            props: {
                                transfer: true,
                                size: 'small',
                                content: `类型：${data.type}`,
                                placement: "right"
                            }
                        },[h(`span`,data.title)])
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
                                    this.updateEditProjectData({dataItem:data.dataItem});
                                    this.updateFormVisiable({visiable:true,formType:`edit`})
                                }
                            }
                        })
                    ])
                ])
            },
            updateRenderTreeData(newValue) {
                const result = [];
                newValue.forEach((value) => {
                    const item = {
                        title: value.key,
                        desc: value.desc,
                        type: value.type,
                        dataItem: value,
                        expand: false,
                        render: this.renderItem
                    }
                    result.push(item)
                });
                this.renderTreeData = result;
            }
        },
        watch: {
            "projectData": {
                handler: function(newValue,oldValue) {
                    this.updateRenderTreeData(newValue);
                },
                deep: true
            }
        }

    }
</script>

