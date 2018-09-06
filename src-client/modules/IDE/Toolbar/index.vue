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
            <Icon type="ios-arrow-back" class="back-btn" />
            <span class="title" title="雷克萨斯供应商管理雷克萨斯供应商管理雷克萨斯供雷克萨斯供应商管理雷克萨斯供应商管理雷克萨斯供应商管理应商管理">雷克萨斯供应商管理雷克萨斯供雷克萨斯供应商管理雷克萨斯供应商管理雷克萨斯供应商管理应商管理雷克萨斯供应商管理</span>  
        </div>
        <div class="toolbar-center">
            <div class="opera-btn">
                <Tooltip content="保存">
                    <Icon type="ios-cloud-upload-outline" />
                </Tooltip>
            </div>
            <div class="opera-btn">
                <Tooltip content="预览">
                    <Icon type="ios-eye-outline" />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: `IDEToolBar`,
        data() {
            return {}
        }
    }
</script>

