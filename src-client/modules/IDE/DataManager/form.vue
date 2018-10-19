<style>
    .ide-datamanager-form {
        width: 300%;
        transform: translateX(-600px);
    }
    .ide-datamanager-form-body {
        padding: 0px;
        overflow: auto;
        height: 100%;
    }
    .ide-datamanager-form-body .inner {
        position: relative;
        padding: 10px;
    }
</style>

<template>
    <div :class="[`ide-page-form`, `ide-datamanager-form`, visiable ? `show` : ``]">
        <div class="ide-page-form-header">
            <span>新增数据项</span>
            <Icon class="btn-icon close-btn" @click="hide" type="md-close"/> 
        </div>
        <div class="ide-page-form-body ide-datamanager-form-body">
            <div class="inner">
                <RenderEditor ref="renderEditor"></RenderEditor>
            </div>
        </div>
        <div class="ide-page-form-footer text-right">
            <Button @click="handleResetForm">还原数据</Button>
            <Button type="primary" @click="handleSaveForm" style="margin-left:10px" >保存更新</Button>
        </div>
        
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import RenderEditor from './renderEditor.vue'

    export default {
        name: `DataManagerForm`,
        components: {
            RenderEditor: RenderEditor
        },
        computed: {
            ...mapGetters({
                'visiable': storeTypes.state.ui[`data.form.visiable`]
            })
        },
        methods: {
            ...mapMutations({
                'updateVisiable': storeTypes.mutations[`update.ui.data.form.visiable`],
                'resetForm': storeTypes.mutations[`reset.data.project.data.form.data`]
            }),
            hide() {
                this.updateVisiable({visiable:false})
                this.resetForm();
            },
            handleSaveForm() {
                this.$refs['renderEditor'].handleSaveForm()
            },
            handleResetForm() {
                this.$refs['renderEditor'].handleResetForm()
            }
        }
    }
</script>
