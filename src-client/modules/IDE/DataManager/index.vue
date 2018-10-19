<template>
    <div>
        <Divider orientation="right">
            <Button icon="ios-add-circle-outline" size="small" @click="updateFormVisiable({visiable:true,formType:`add`})" >新增数据</Button>
        </Divider>
        <DataList></DataList>
        <DataForm></DataForm>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    import DataForm from './form.vue'
    import DataList from './list.vue'
    
    export default {
        name: `DataManager`,
        components: {
            DataForm: DataForm,
            DataList: DataList
        },
        computed: {
            ...mapGetters({
                'projectDataJson': storeTypes.getters[`data.project.data.json`],
                'projectData': storeTypes.state.data[`project.data`]
            })
        },
        methods: {
            ...mapMutations({
                'updateFormVisiable': storeTypes.mutations[`update.ui.data.form.visiable`],
                
            })
        }
    }
</script>

