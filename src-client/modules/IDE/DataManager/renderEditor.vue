<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import util from '../../../libs/util'

    export default {
        name: `IDEDataManagerRenderEditor`,
        data() {
            return {
                cloneDataItem: {key:``,desc:``,type:`string`,value:``},
                srcCloneDataItem: {key:``,desc:``,type:`string`,value:``},
                types: [
                    {label:`字符串`,value:`string`},
                    {label:`数值`,value:`number`},
                    {label:`数组`,value:`array`},
                    {label:`对象`,value:`object`}
                ]
            }
        },
        computed: {
            ...mapGetters({
                'dataItem': storeTypes.state.data[`project.data.form.data`],
                'projectData': storeTypes.state.data[`project.data`],
                'projectDataJson': storeTypes.getters[`data.project.data.json`]
            })
        },
        methods: {
            ...mapMutations({
                'updateProjectDataItem': storeTypes.mutations[`update.project.data.item`],
                'insertProjectDataItem': storeTypes.mutations[`insert.project.data.item`],
                "updateFormVisiable": storeTypes.mutations[`update.ui.data.form.visiable`],
                'resetForm': storeTypes.mutations[`reset.data.project.data.form.data`]
            }),
            renderTypeOptions(h) {
                const res = [];
                this.types.forEach((type) => {
                    res.push(h(`Option`,{
                        props: {
                            value: type.value
                        },
                        domProps: {
                            innerHTML: type.label
                        }
                    }))
                })
                return res
            },
            handleChange(field,newValue,oldValue,obj) {
                obj[field] = newValue;
                if (field == 'type' && oldValue != newValue) {
                    switch (newValue) {
                        case `number`: obj[`value`] = 0;break;
                        case `string`: obj[`value`] = ``;break;
                        case `object`: obj[`value`] = [];break;
                        case `array`: obj[`value`] = [];break;
                    }
                }
            },
            renderValueInput(h,config,parentType,lvl) {
                const type = config.type,
                      render = [];
                if (type == 'number' || type == 'string') {
                    const tag = type == 'number' ? `InputNumber` : `Input`;
                    render.push(h(tag,{
                        props: {
                            value: config.value,
                            placeholder: `值`
                        },
                        on: {
                            'input': (newValue) => {
                                this.handleChange(`value`,newValue,config[`value`],config)  
                            }
                        }
                    }))
                } else if (type == 'array' || type == 'object') {
                    const btnText = type == 'array' ? `+添加子项` : `+添加子属性`
                    render.push(h(`Button`,{
                        props: {
                           
                            ghost: true,
                            type: `primary`
                        },
                        domProps: {
                            innerHTML: btnText
                        },
                        on: {
                            'click': () => {
                                config.value.unshift({
                                    key: ``,
                                    desc: ``,
                                    type: `string`,
                                    value: ``
                                })
                                console.log('--->点击添加属性',config)
                            }
                        }
                    }))
                }
                if ( (parentType == 'array' || parentType == 'object') && lvl != 0) {
                    render.push(h(`Tooltip`,{
                        props: {
                            'content': `点击删除该值`,
                            'transfer': true,
                            "placement": 'right'
                        },
                        style: {
                            position: `absolute`,
                            right: `-24px`,
                            top: `0px`
                        }
                    },[
                        h(`Icon`,{
                            props: {
                                type: `md-remove-circle`,
                                size: 20
                            },
                            style: {
                                "font-size": `16px`,
                                cursor: `pointer`,
                                "color":"#888"
                                
                            },
                            on: {
                                'click': () => {
                                    console.log('--->点击删除该项')
                                }
                            }
                        })
                    ]))
                }
                return render;
            },
            renderDataItem(h,config,parent,lvl = 0) {
                let parentType = parent && parent.type ? parent.type : ``;    
                const form = [];
                if (parentType !== 'array') {
                    form.push(h(`FormItem`,{},
                        [h(`Input`,{
                            props: {
                                value: config.key,
                                placeholder: `键名`
                            },
                            on: {
                                'input': (newValue) => {
                                    this.handleChange(`key`,newValue,config['key'],config)
                                }
                            }
                        })]
                    ))
                }
                form.push(h(`FormItem`,{},[
                    h(`Select`,{
                        props: {
                            value: config.type,
                            placeholder: `类型`
                        },
                        on: {
                            'on-change': (newValue) => {
                                this.handleChange(`type`,newValue,config['type'],config)
                            }
                        }
                    },this.renderTypeOptions(h))
                ]))
                form.push(
                    h(`FormItem`,{},this.renderValueInput(h,config,parentType,lvl))
                )
                return h(`div`,{
                    style: {
                        'paddingLeft': (lvl*25)+'px'
                    }
                },[
                    h(`Form`,{
                        props: {
                            inline: true
                        }
                    },form)
                ])
            },
            renderEditor(h,dataItem,parent,lvl){
                const type = dataItem.type,
                      editor = this.renderDataItem(h,dataItem,parent,lvl);
                if (type == 'number' || type == 'string') {
                    return editor;
                } else if (type == 'array' || type == 'object') {
                    const list = [];
                    lvl = lvl + 1;
                    dataItem.value.forEach((item,index) => {
                        list.push(
                            this.renderEditor(h,dataItem.value[index],dataItem,lvl)
                        )
                    });
                    list.unshift(editor);
                    return h(`div`,{},list)
                }
            },
            handleSaveForm() {
                const key = this.cloneDataItem.key;
                if (!/^[a-zA-Z]+\w$/.test('key')) {
                    this.$Message.error(`数据的键名只能是英文字母开头以及和数字的结合`);
                    return ;
                }
                const filterEmpty = (config,parent,key) => {
                    const type = config.type,
                          value = config.value,
                          dkey = config.key;
                    if (type == 'array' || type == 'object') {
                        for (let i = 0,len = value.length; i < len; i++) {
                            const item = value[i];
                            if (filterEmpty(item,config,i)) {
                                i = i - 1;
                                len = value.length;
                            }
                        }
                    } else if (type == 'number' || type == 'string') {
                        if (value == '' && dkey == '' && parent) {
                            parent.value.splice(key,1)
                            return true
                        }
                    }
                    return false;
                }
                filterEmpty(this.cloneDataItem,null,null);
                let updateIndex = null;
                this.projectData.forEach((item,index) => {
                    if (item.key == key) {
                        updateIndex = index
                    }
                });
                updateIndex == null 
                    ? this.insertProjectDataItem({data:this.cloneDataItem})
                    : this.updateProjectDataItem({data:this.cloneDataItem,key:updateIndex})
                this.updateFormVisiable({visiable:false})
                this.resetForm();
            },
            handleResetForm() {
                this.cloneDataItem = util.deepClone(this.srcCloneDataItem)
            }
        },
        render(h) {
            return this.renderEditor(h,this.cloneDataItem,null,0)
        },
        watch: {
            'dataItem': function(newValue) {
                this.cloneDataItem = util.deepClone(newValue);
                this.srcCloneDataItem = util.deepClone(newValue)
            }
        }
    }
</script>
