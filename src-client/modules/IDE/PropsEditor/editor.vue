<style>
.ide-propseditor-control {
    margin-bottom: 10px;
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
                "widgetConfig": storeTypes.getters[`data.node.editing.widget.config`]
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
                const controls = [];
                for ( let i in widgetProps ) {
                    const widgetPropsGroups = widgetProps[i]; 
                    for ( let k in widgetPropsGroups ) {
                        const widgetPropsItem = widgetPropsGroups[k];
                        if ( widgetPropsItem.editControl ) {
                            let value = undefined;
                            if (nodeProps[i] && typeof nodeProps[i][k] != 'undefined') {
                                value = nodeProps[i][k];
                            }
                            controls.push(
                                this.renderControl(
                                    h,
                                    i,
                                    k,
                                    widgetPropsItem.editControl,
                                    value
                                )
                            )
                        }
                    }
                }
                return controls;
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
            return h(`Form`,{
                props: {
                    labelWidth: 80
                }
            },this.renderEditor(
                h,
                this.widgetConfig.properties,
                this.nodeEditing.properties
            ))
        }
    }
</script>

