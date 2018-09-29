<template>
    <Row>
        <Col span="24" v-for="(project,index) in projects" :key="index" :value="index">
            <Item :project="project"></Item>
        </Col>
    </Row>
</template>

<script>
    import Item from './item.vue'

    /**
     * @description 项目的列表
     * @prop {array} projects 项目列表信息
     */
    export default {
        name: `ProjectList`,
        props: {
            projects: {
                type: Array,
                default: () => ([])
            }
        },
        components: {
            Item: Item
        }
    }
</script>
