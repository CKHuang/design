import index from '../../pages/Project/index.vue'
import home from '../../pages/Project/Home/index.vue'
import form from '../../pages/Project/Form/index.vue'

export default {
    name: `project`,
    path: `project`,
    component: index,
    children: [{
        path: `form/:projectKey(\\w+)?`,
        name: `project-form`,
        component: form,
        props: (router) => ({
            projectKey: router.params.projectKey || ``
        })
    },{
        path: `(\\w+)?`,
        name: `project-home`,
        component: home
    }]
}