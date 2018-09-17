import Router from 'koa-router'

const AllowMethods = ['GET','POST','PUT','DELETE']
const RouteProps = ['method','path','action','desc']

/**
 * 路由配置检测
 * @param {object} route 路由配置
 * @param {string} route.method 请求的方法,GET、POST、DELETE、PATCH
 * @param {string|array} route.path 请求的路径
 * @param {function} route.action 路由的行为方法 (ctx) => {}
 */
const routeCheck = (route = null) => {
    let keys = typeof route == 'object' ? Object.keys(route) : null;
    if ( keys && keys.every((item) => RouteProps.indexOf(item) > -1 ) ) {
        if ( AllowMethods.indexOf(route.method) > -1 
            && typeof route.action == 'function'
            && ( typeof route.path == 'string' || Array.isArray(route.path) )
        ) {
            return true;
        }
    }
    return false;
    
}

/**
 * 注册路由
 * @param {object} opts 可选配置
 * @param {string} opts.prefix 请求路径的前缀
 * @param {array} routes 路由配置
 * @example
 *      router([{
 *          method:'get',
 *          path: '/api/business/:id',
 *          action: () => {}
 *      }])
 *      // 多个路由指向一个action
 *      router([{
 *          method:'get'
 *          path: ['/api/business/:id/:action','/api/business/:id/search']
 *          action: () => {}
 *      }])
 *      // 添加路由前缀
 *      router({
 *          prefix: '/api'
 *      },[{
 *          method:'get',
 *          path:'/business/:id'
 *          action: () => {}
 *      }])
 *      
 */
const router = (opts,routes = []) => {
    const router = new Router();
    if (Array.isArray(opts)) {
        routes = opts;
    } else if ( typeof opts == 'object') {
        if ( typeof opts.prefix == 'string') {
            router.prefix(opts.prefix)
        }
    }
    routes.forEach((route) => {
        if (!routeCheck(route)) {
            throw new TypeError(`${route.desc} route no need props`);
        }
        const paths = Array.isArray(route.path) ? route.paths : [route.path];
        for ( let path of paths ) {
            router[route.method.toLowerCase()](path,async (ctx,next) => {
                await next();
                await route.action.call(router,ctx)
            })
        }
    })
    return router;
}

export default router;
