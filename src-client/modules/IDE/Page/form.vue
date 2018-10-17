
<style>
.ide-page-form {
    width: 96%;
    transition: all  .25s  ease-in;
    -moz-transition: all  .25s  ease-in;
    -webkit-transition: all  .25s  ease-in;
    transform: translateX(-300px);
    background-color: #fff;
    height: 100%;
    position: absolute;
    top: 10px;
    border-radius: 2px;
    box-shadow: 1px 1px 8px #e0e0e0;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    position: absolute;
    z-index: 100;
}
.ide-page-form.show {
    transform: translateX(0px)
}
.ide-page-form-body {
    padding: 20px 8px;
}
.ide-page-form-body .ivu-form-item {
    margin-bottom: 20px;
}
.ide-page-form-header {
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
}
.ide-page-form-header span {
    width: 100%;
}
.ide-page-form-header .close-btn {
    flex: 1 0 15px;
}
</style>

<template>
    <div :class="[`ide-page-form`, visiable ? `show` : ``]" title="Basic Drawer" placement="left">
        <div class="ide-page-form-header">
            <span>{{ formType == `add` ? `新增页面`: `编辑页面`}}</span>
            <Icon class="btn-icon close-btn" type="md-close" @click="updatePageFormVisiable({visiable:false})"/> 
        </div>
        <div class="ide-page-form-body">
            <Form label-position="top">
                <FormItem label="页面名称">
                    <Input size="small" autofocus v-model="formData.name" placeholder="填写页面名称"></Input>
                </FormItem>
                <FormItem label="路由组件">
                    <Input size="small" v-model="formData.router_name" placeholder="路由名称"></Input>
                </FormItem>
                <FormItem label="路由路径">
                    <Input size="small" v-model="formData.router_path" placeholder="路由路径"></Input>
                </FormItem>
                <FormItem>
                    <Button v-if=" formType == 'add'" size="small" type="primary" @click="addNewPage({page:formData})">新建页面</Button>
                    <Button v-else-if=" formType == 'edit'" size="small" type="primary">修改页面</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDEPageForm`,
        computed: {
            ...mapGetters({
                "project": storeTypes.state.data[`project`],
                "visiable": storeTypes.state.ui[`page.form.visiable`],
                "formType": storeTypes.state.data[`page.form.type`],
                "formData": storeTypes.state.data[`page.form.data`]
            })
        },
        methods: {
            ...mapMutations({
                "updatePageFormVisiable": storeTypes.mutations[`update.ui.page.form.visiable`],
                "addNewPage": storeTypes.mutations[`insert.data.project.page.list`]
            })
        }
    }
</script>

