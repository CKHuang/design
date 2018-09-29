<template>
    <div>
        <ProjectForm></ProjectForm>
    </div>
</template>

<script>

    import ProjectForm from '../../../modules/Project/Form/index.vue'

    export default {
        name: `PageProjectForm`,
        components: {
            ProjectForm: ProjectForm
        }
    }
</script>