export default (opts) => {
    return async (ctx,next) => {
        ctx.user = `visitor`;
        await next();
        return ;
    }
}