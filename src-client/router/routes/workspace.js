import WorkSpace from '../../pages/WorkSpace/index.vue'

export default {
    name: `workspace`,
    path: `workspace/:projectKey(\\w+)/:pageKey(\\w+)?`,
    component: WorkSpace,
    props: (router) => ({
        projectKey: router.params.projectKey || ``,
        pageKey: router.params.pageKey || ``
    })

}