import mysql from 'mysql'

class SQL {

    constructor() {
        this.sql = []
    }

    select(fields = '*') {
        this.sql.push(`SELECT ${fields}`)
        return this;
    }

    insert(table = null) {
        this.sql.push(`INSERT INTO ${table}`);
        return this;
    }

    update(table = null) {
        this.sql.push(`UPDATE ${table}`);
        return this;
    }

    set(data) {
        if (typeof data == 'function') {
            data = data();
        }
        this.sql.push(
            mysql.format(`SET ?`,data)
        )
        return this;
    }

    from(table = null) {
        this.sql.push(`FROM ${table}`)
        return this;
    }

    where(rules = {}, logic = 'AND', equal = '=') {
        logic = ` ${logic} `
        const arr = [];
        for ( let i in rules ) {
            arr.push(
                // 主要针对 a.field 的情况，如果加了 `` 会报错
                i.indexOf('.') > -1 
                ? mysql.format(`${i} ${equal} ?`,[rules[i]])
                : mysql.format(`\`${i}\` ${equal} ?`,[rules[i]])
            )
        }
        this.sql.push(`WHERE ${arr.join(logic)}`)
        return this;
    }

    whereLike(rules = {}, logic = 'OR') {
        return this.where(rules,'OR','LIKE')
    }

    whereIn(key,values = []) {
        const plac = [];
        if (!Array.isArray(values)) {
            values = [values.toString()]
        }
        for ( let i in values ) {
            plac.push('?')
        }
        this.sql.push(
            mysql.format(`WHERE ${key} IN (${plac.join(',')}) `,values)
        )
        return this;
    }

    /**
     * 分页的sql
     * @param {number} page 
     * @param {number} per_page 
     */
    page(page,per_page) {
        this.sql.push(`LIMIT ${per_page} OFFSET ${(page-1)*per_page}`)
        return this;
    }

    /**
     * 排序字段
     * @param {string} orderby 排序字段
     * @param {boolean} desc 是否倒叙
     */
    sort(orderby, desc = true) {
        this.sql.push(`ORDER BY ${orderby} ${desc ? 'DESC' : ''}`)
        return this;
    }

    leftJoin(table,on) {
        this.sql.push(`LEFT JOIN ${table}`)
        return this;
    }

    /**
     * @example
     *  on([{
     *     leftKey,
     *     rightKey,
     *     equal
     *  }],equal)
     */
    on(keys,equal = 'AND') {
        const arr = []
        keys.forEach((item) => {
            arr.push(`${item.leftKey} ${item.equal ? item.equal : '='} ${item.rightKey}`)
        });
        this.sql.push(`ON ${arr.join(equal)}`)
        return this;
    }

    orderBy() {
        return this;
    }

    

    toString() {
        return this.sql.join(' ')
    }

    /**
     * 将sql转换成查询total总量的
     * @param {string} sql 
     */
    toQueryTotalString(sql) {
        sql = sql.replace(/\sLIMIT \d+ OFFSET \d+/,'')
        return `SELECT count(*) as total from(${sql}) as ${Date.now()}_table`
    }
}

const create = () => {
    return new SQL();
}

export default create
