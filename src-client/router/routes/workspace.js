import WorkSpace from '../../pages/WorkSpace/index.vue'

export default {
    name: `workspace`,
    path: `workspace/:pkey(\\w+)/:key(\\w+)?`,
    component: WorkSpace,
    props: (router) => ({
        projectKey: router.params.pkey || ``,
        pageKey: router.params.key || ``
    })

}