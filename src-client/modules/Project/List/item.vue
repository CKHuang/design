<template>
    <Card>
        <span>{{ project.name }}</span>
        <span>{{ project.owner }}</span>
        <router-link :to="{name:'workspace',params:{projectKey:project.key}}">
            <Button type="text">编辑项目</Button>
        </router-link>
    </Card>
</template>

<script>
    export default {
        name: `ProjectListItem`,
        props: {
            project: {
                type: Object,
                default: () => ({
                    id: 0,
                    key: ``,
                    name: ``,
                    create_time: ``,
                    creater: ``,
                    page_width: 0,
                    page_height: 0,
                    type: 0,
                    owner: ``
                })
            }
        }
    }
</script>

