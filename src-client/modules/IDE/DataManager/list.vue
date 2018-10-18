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

    export default {
        name: `DataManagerList`,
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
            renderItem(h, {root, node, data}) {
                return h(`div`,{
                    "class": `ide-page-item`,
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
                                content: `类型：${data.type}，说明：${data.desc}`,
                                placement: "right"
                            }
                        },[h(`span`,data.title)])
                        
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

