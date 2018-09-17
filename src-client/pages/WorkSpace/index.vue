<template>
    <div>
        <IDE
            :projectKey="projectKey"
            :pageKey="pageKey"
        ></IDE>
    </div>
</template>

<script>
    import IDE from '../../modules/IDE/index.vue'

    export default {
        name: `PageWorkSpace`,
        components: {
            IDE: IDE
        },
        props: {
            projectKey: {
                type: String,
                default: ``
            },
            pageKey: {
                type: String,
                default: ``
            }
        }
    }
</script>