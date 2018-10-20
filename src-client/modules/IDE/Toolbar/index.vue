<style scoped>
/**
 * toolbar
 */
.ide-toolbar {

    position: relative;
    height: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px 0 6px 0 rgba(39,54,78,0.12);
    z-index: 901;
}
.ide-toolbar .toolbar-left {
    display: flex;
    display: -webkit-flex;
    height: 100%;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
    flex: 0 0 215px;
    max-width: 215px;
    overflow: hidden;
}
.ide-toolbar .toolbar-center {
    flex: 1;
    display: flex;
    justify-content: space-between;
    justify-content: flex-end;
    padding-right: 30px;
}
.ide-toolbar .back-btn {
    font-size: 14px;
    cursor: pointer;
}
.ide-toolbar .opera-btn{
    font-size: 18px;
    cursor: pointer;
    padding: 0px 10px;
}
.ide-toolbar .back-btn:hover,.ide-toolbar .opera-btn:hover {
    color: #000;
}
.ide-toolbar .title {
    padding-left: 5px;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>


<template>
    <div class="ide-toolbar">
        <div class="toolbar-left">
            <router-link :to="{name:'project-home'}" tag="span">
                <Icon type="ios-arrow-back" class="back-btn" />
            </router-link>
            <span class="title" :title="project.name">{{ project.name }}</span>  
        </div>
        <div class="toolbar-center">
            <div class="opera-btn">
                <Tooltip content="保存" transfer>
                    <Icon type="ios-cloud-upload-outline" @click="submit" />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'

    export default {
        name: `IDEToolBar`,
        computed: {
            ...mapGetters({
                'project': storeTypes.state.data[`project`]
            })
        },
        methods: {
            ...mapActions({
                "submit": storeTypes.actions[`save.project`]
            })
        }
    }
</script>

