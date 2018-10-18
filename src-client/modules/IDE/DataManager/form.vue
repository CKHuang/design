<style>
    .ide-datamanager-form {
        width: 300%;
        transform: translateX(-2000px);
    }
</style>

<template>
    <div :class="[`ide-page-form`, `ide-datamanager-form`, visiable ? `show` : ``]">
        <div class="ide-page-form-header">
            <span>新增数据项</span>
            <Icon class="btn-icon close-btn" @click="updateVisiable({visiable:false})" type="md-close"/> 
        </div>
        <div class="ide-page-form-body">
            <Button size="small">+添加</Button>
            <Form inline>
                <FormItem>
                    <Input v-model="key" type="text" placeholder="键名" size="small"></Input>
                </FormItem>
                <FormItem>
                    <Input v-model="desc" type="text" placeholder="说明" size="small"></Input>
                </FormItem>
                <FormItem>
                    <Select v-model="type" size="small" placeholder="类型">
                        <Option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem v-if="type == 'string'">
                    <Input size="small" type="text" v-model="value"></Input>
                </FormItem>
                <FormItem v-else-if="type == 'number'">
                    <InputNumber size="small" v-model="value"></InputNumber>
                </FormItem>
            </Form>
        </div>
        
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `DataManagerForm`,
        computed: {
            ...mapGetters({
                'visiable': storeTypes.state.ui[`data.form.visiable`]
            })
        },
        methods: {
            ...mapMutations({
                'updateVisiable': storeTypes.mutations[`update.ui.data.form.visiable`]
            })
        },
        data() {
            return {
                types: [
                    {label:`字符串`,value:`string`},
                    {label:`数值`,value:`number`},
                    {label:`数组`,value:`array`},
                    {label:`对象`,value:`object`}
                ],
                key: ``,
                type: `string`,
                value: ``,
                desc: ``
            }
        },
        watch: {
            type: function(newValue) {
                switch(newValue) {
                    case `number`: this.value = 0;break;
                    case `string`: this.value = ``;break;
                    case `object`: this.value = [];break;
                    case `array`: this.value = [];break;
                }
            }
        }
    }
</script>
