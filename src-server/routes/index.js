import apiRoute from './api/index'

const routes = [].concat(
    apiRoute
)


const route = (app) => {
    routes.forEach((route) => {
        app.use(route.routes());
        app.use(route.allowedMethods())
    })
}

export default route;