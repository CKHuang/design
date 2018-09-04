<template>
    <div>
        <IDE></IDE>
    </div>
</template>

<script>
    import IDE from '../../modules/IDE/index.vue'

    export default {
        name: `PageWorkSpace`,
        components: {
            IDE: IDE
        },
        data() {
            return {}
        }
    }
</script>