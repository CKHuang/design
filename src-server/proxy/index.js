import watch from './watch'

let effective = [];

watch((effect) => {
    effective = effect
});

export default (opts) => {
    return async (ctx,next) => {
        try {
            const proxyProjs = effective.filter((item) => {
                return ctx.request.path.indexOf(`/${item.key}`) == 0
            })
            if (proxyProjs.length == 0) {
                await next();
            }
            if (proxyProjs.length == 1){
                await proxyProjs[0].app(ctx.req,ctx.res);
                return ;
            }
        } catch (error) {
            console.error(error)
            throw error
        }    
    }
}