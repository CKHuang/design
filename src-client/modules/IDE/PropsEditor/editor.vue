<style>
.ide-propseditor-control {
    margin-bottom: 3px;
}
.ide-propseditor-control .ivu-form-item{
    margin-bottom: 0px;
}
.ide-propseditor-control .ivu-form-item .ivu-form-item-label{
    text-align: left;
    color: #666;
}
</style>


<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import renderControl from './control.js'

    export default {
         name: `IDEPropsEditorEditor`,
         components: {
             renderControl: renderControl
         },
         computed: {
            ...mapGetters({
                "nodeEditing": storeTypes.state.data[`node.editing`],
                "widgetConfig": storeTypes.getters[`data.node.editing.widget.config`],
                "pageList": storeTypes.state.data[`project.page.list`]
            })
        },
        methods: {
            ...mapMutations({
                "updateNodeProperties": storeTypes.mutations[`update.data.editing.node.properties`]
            }),
            handleChange(propsGroup,fieldName,newValue) {
                this[`updateNodeProperties`]({
                    nodeId: this[`nodeEditing`].id,
                    propsGroup: propsGroup,
                    fieldName: fieldName,
                    newValue: newValue
                });
            },
            renderEditor(h,widgetProps,nodeProps) {
                if (widgetProps === null || Object.keys(widgetProps) == 0) {
                    return h(`span`,`该节点没有可添加属性`);
                }
                const groups = [];
                for ( let i in widgetProps ) {
                    const widgetPropsGroups = widgetProps[i];
                    let nodePropsGroups = {};
                    if (nodeProps[i]) {
                        nodePropsGroups = nodeProps[i]
                    }
                    if (Object.keys(widgetPropsGroups).length == 0) {
                        continue;
                    }
                    groups.push(
                        this.renderEditorGroup(
                            h,
                            i,
                            widgetPropsGroups,
                            nodePropsGroups
                        )
                    )
                }
                return groups;
            },
            renderEditorGroup(h,propsGroupKey,widgetPropsGroups,nodeProps) {
                const controls = []
                for ( let k in widgetPropsGroups ) {
                    const widgetPropsItem = widgetPropsGroups[k];
                    if (widgetPropsItem.editControl ) {
                        let value = undefined;
                        if (typeof nodeProps[k] != 'undefined') {
                            value = nodeProps[k]
                        }
                        controls.push(
                            this.renderControl(
                                h,
                                propsGroupKey,
                                k,
                                widgetPropsItem.editControl,
                                value
                            )
                        )
                    }
                }
                return h('Panel',{
                    props: {
                        name:propsGroupKey,
                    },
                    key: propsGroupKey,
                },[
                    h('span',propsGroupKey),
                    h('Form',{
                        props: {
                            labelWidth: 100
                        },
                        slot: 'content'
                    },[controls])
                ])
            },
            renderControl(h,propsGroup,fieldName,editControl,value) {
                return h(`render-control`,{
                    props: {
                        value: value,
                        propsGroup: propsGroup,
                        fieldName: fieldName,
                        editorControl: editControl,
                        nodeEditing: this.nodeEditing
                    }
                })
            }
        },
        render(h,ctx) {
            return h('Collapse',{
                props: {
                    simple: true
                }
            },this.renderEditor(
                h,
                ( typeof this.widgetConfig == 'undefined'
                || typeof this.widgetConfig.properties == 'undefined' )
                    ? null 
                    : this.widgetConfig.properties,
                this.nodeEditing.properties
            ))
        }
    }
</script>

