<style>
    .project-list-item .project-name {
        display: block;
        font-size: 30px;
        font-weight: bold;
    }
    .project-list-item .project-desc {
        display: block;
        margin: 10px 0px;
        font-size: 13px;
        color: #a0a0a0;
        padding-left: 10px;
        /* border-left: 3px solid #ccc; */
        margin-left: -16px;
        background: #f5f4f4;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-right: -16px;
    }
    .project-list-item {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .project-oprs {
        box-sizing: border-box;
    }
    .project-editor-btn {
            position: absolute;
    top: 10px;
    right: 10px;
    }
</style>

<template>
    <Card class="project-list-item">
        <span class="project-name">{{ project.name }}</span>
        <span class="project-desc">{{ project.desc }}</span>    
         <router-link :to="{name:'workspace',params:{projectKey:project.key}}">
            <Button class="project-editor-btn" type="default" >编辑项目</Button>
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
                    owner: ``,
                    desc: ``
                })
            }
        }
    }
</script>

