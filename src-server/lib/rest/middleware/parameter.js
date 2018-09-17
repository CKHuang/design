/**
 * 默认的参数，
 * 如果为空
 * 则会使用默认
 */
const _DEF = {
    per_page: 20
}

const parameter = {
    /**
     * 获取分页数据
     * @return {per_page,page}
     */
    pagination() {
        return this.parameter.getQuery([{
            name: 'per_page',
            def: _DEF.per_page
        },{
            name: 'page',
            def: 1
        }])
    },

    /**
     * 获取列表参数,如果没有这个参数
     * 系统已经默认使用primaryKey
     * @return {orderby}
     */
    sort() {
        return this.parameter.getQuery([{
            name:'orderby'
        }])
    },

    /**
     * 过滤字段,如果没有则默认是null
     * @param {array} fileds 要过滤的字段
     * @return {object}
     */
    filter(fileds = []) {
        const args = [];
        fileds.forEach((field) => {
            args.push({
                name: field,
                def: null
            })
        });
        return this.parameter.getQuery(args);
    },

    /**
     * 获取post插入的数据
     * @return {object}
     */
    inserted() {
        return this.parameter.getBody();
    },


    /**
     * 获取put更新的数据
     * @return {object}
     */
    updated() {
        return this.parameter.getBody();
    },

    /**
     * 获取query的参数
     * @param {array} query {name,def}
     * @return {object}
     */
    getQuery(querys = []) {
        const res = {}
        if (querys.length == 0) {
            return this.query;
        }
        querys.forEach((query) => {
            res[query.name] = typeof this.query[query.name] != "undefined"
                                ? this.query[query.name]
                                : ( typeof query.def != "undefined" ? query.def : null ) 
            if (typeof res[query.name] == 'string' && /^\d+$/.test(res[query.name])) {
                res[query.name] = Number(res[query.name])
            }
        });
        return res;
    },

    /**
     * 获取body的数据
     * @param {array} query {name,def}
     * @return {object}
     */
    getBody(querys = []) {
        const res = {};
        const body = this.request.body || {}
        if (querys.length == 0) {
            return body;
        }
        querys.forEach((query) => {
            res[query.name] = typeof body[query.name] != "undefined"
                                ? body[query.name]
                                : ( typeof query.def != 'undefined' ? query.def : null )
            if (typeof res[query.name] == 'string' && /^\d+$/.test(res[query.name])) {
                res[query.name] = Number(res[query.name])
            }
        })
        return res;
    }
}

/**
 * @param {object} opts 
 * @param {object} opts.default 默认的数据配置
 */
export default (opts = {
    default: _DEF
}) => {
    const def = opts.default;
    return async (ctx,next) => {
        ctx.parameter = ctx.parameter || {}
        for( let key in parameter ) {
            ctx.parameter[key] = parameter[key].bind(ctx)
        }
        await next();
    }
}