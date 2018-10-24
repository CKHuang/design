<style scoped>
.content {
    min-height: 200px;
}
</style>

<template>
    <Content :style="{padding: '0 50px'}">
        <router-view></router-view>
    </Content>
</template>

<script>
    export default {
        name: `zContent`
    }
</script>

