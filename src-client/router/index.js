import Root from '../pages/Root.vue'
import Layout from '../pages/Common/Layout/index.vue'
import LayoutEmpty from '../pages/Common/Layout/empty.vue'

import errorRoute from './routes/error'
import workSpaceRoute from './routes/workspace'

export default {
    routes: [{
        path: `/`,
        name: `root`,
        component: Root,
        children: [{
            path: `/web`,
            name: 'layout-empty',
            component: LayoutEmpty,
            children: [
                workSpaceRoute
            ]
        },{
            path: `/web`,
            name: `layout`,
            component: Layout,
            children: [
                // workSpaceRoute
            ],
            meta: {
                requiresAuth: true
            }
        },
          errorRoute
          
        ]
    }],
    beforeEach: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // if (!auth.loggedIn()) {
            //     next();
            //     // next({
            //     //     name: `auth-login`,
            //     //     query: {redirect: to.fullPath}
            //     // })
            // } else {
            //     next();
            // }
        } else {
            next();
        }
    },
    afterEach: (to, from) => {
        
    }
}