import apiRoute from './api/index'
import webRoute from './web/index'

const routes = [].concat(
    apiRoute,
    webRoute
)

const route = (app) => {
    routes.forEach((route) => {
        app.use(route.routes());
        app.use(route.allowedMethods())
    })
}

export default route;