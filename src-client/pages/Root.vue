<template>
    <router-view :key="key"></router-view>
</template>
<script>
    export default {
        name: `Root`,
        computed: {
            key() {
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        }
    };
</script>