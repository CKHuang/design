<template>
    <div>
        <Row type="flex" justify="end">
            <Col span="4">
                <Button :to="{ name: 'project-form'}" type="primary">新建项目</Button>
            </Col>
        </Row>
        <ProjectList :projects="list"></ProjectList>
    </div>
</template>

<script>

    import ProjectList from '../../../modules/Project/List/index.vue'

    export default {
        name: `PageProjectHome`,
        components: {
            ProjectList: ProjectList
        },
        data() {
            return {
                list: []
            }
        },
        async created() {
            await this.getData();
        },
        methods: {
            async getData() {
                try {
                    const res = await this.models.project.all();
                    this.list = res;
                } catch (e) {
                    this.model.showErrorMessage(e,this)
                }
            }
        }
    }
</script>