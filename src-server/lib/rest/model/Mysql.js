import mysql from 'mysql'
import sQL from './sql'
import logger from '../../logger';
import moment from 'moment'
import util from '../../util'
import StatusError from '../StatusError'



const TYPE_DATETIME = 12;

/**
 * 解析通过query接口获取数据后返回
 * @param {function} one 获取单个数据的返回
 */
const getReturn = {
    /**
     * 获取列表数据的第一项
     * 针对select语句单条数据使用
     * @param {object} res {results,fields} 通过query返回的数据
     * @return {object|null} 有则返回对象数据，没有则返回null
     */
    listFirst(res) {
        return ( Array.isArray(res.results) 
                && res.results.length > 0 )
                ? res.results[0]
                : null
    },
    /**
     * 针对toQueryTotal转化的sql返回的
     * @param {object} res {results,fields} 通过query返回的数据
     * @return {number} 
     */
    total(res) {
        return ( Array.isArray(res.results)
                && res.results.length > 0 )
                ? res.results[0].total
                : 0
    },
    /**
     * 获取插入数据的insertId
     * @param {object} res {results,fields} 通过query返回的数据 
     * @return {number}
     */
    insertId(res) {
        return res.results && res.results.insertId
                ? res.results.insertId
                : 0; 
    },
    /**
     * 返回更新的行数
     * @param {object} res  {results,fields} 通过query返回的数据 
     * @return {number}
     */
    updateRows(res) {
        return res.results && res.results.affectedRows 
                ? res.results.affectedRows
                : 0; 
    }
}


const result = {
    /**
     * 获取列表数据的第一项
     * 针对select语句单条数据使用
     * @param {object} res {results,fields} 通过query返回的数据
     * @return {object|null} 有则返回对象数据，没有则返回null
     */
    one(res) {
        return ( Array.isArray(res.results) 
                && res.results.length > 0 )
                ? res.results[0]
                : null
    },

    /**
     * 返回所有的列表数据
     * @param {object} res {results,fields} 
     * @returns {array}
     */
    all(res) {
        return Array.isArray(res.results )
                ? res.results
                : []
    },
     /**
     * 返回更新的行数
     * @param {object} res  {results,fields} 通过query返回的数据 
     * @return {number}
     */
    updates(res) {
        return res.results && res.results.affectedRows 
                ? res.results.affectedRows
                : 0; 
    },
     /**
     * 获取插入数据的insertId
     * @param {object} res {results,fields} 通过query返回的数据 
     * @return {number}
     */
    insertId(res) {
        return res.results && res.results.insertId
                ? res.results.insertId
                : 0; 
    },
     /**
     * 针对toQueryTotal转化的sql返回的
     * @param {object} res {results,fields} 通过query返回的数据
     * @return {number} 
     */
    total(res) {
        return ( Array.isArray(res.results)
                && res.results.length > 0 )
                ? res.results[0].total
                : 0
    }
}


export default class Mysql {
    /**
     * 构造函数
     * @param {object} endpoint 连接点 host、password、user、database
     * @param {string} table 表的名称
     * @param {string} primaryKey 主键的名称
     */
    constructor(endpoint,table,primaryKey){
        this.endpoint = endpoint
        this.table = table;
        this.primaryKey = primaryKey
        this.sql = sQL;
        this.result = result;
        this.isConnect = false;
        this.connection = null;
        return this;
    }

    connect(callback) {
        if (this.isConnect == true) {
            callback && callback(this.connection);
            return ;
        }
        this.connection = mysql.createConnection(this.endpoint)
        this.connection.connect((err) => {
            if (err) {
                throw err
            }
            this.isConnect = true;
            callback && callback(this.connection)
        })
        this.connection.on('error', (error) => {
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                this.isConnect = false;
            }
        })
        return;
    }

    /**
     * 默认格式化results列表数据
     * @param {object} res {results,fitleds} 通过query获取返回的数据
     * @param {object}
     */
    _formatResult(res) {
        const results = res.results;
        const fields = res.fields;
        if (Array.isArray(results) && results.length > 0) {
            const datetimeFields = [];
            const jsonFields = [];
            fields.forEach((field) => {
                if (field.type == TYPE_DATETIME) {
                    datetimeFields.push(field.name)
                }
                if (field.name.indexOf('JSON_') == 0) {
                    jsonFields.push(field.name)
                }
            })
            results.forEach((result) => {
                for ( let field of datetimeFields ) {
                    result[field] = moment(result[field]).format(`YYYY-MM-DD HH:mm:ss`)
                }
                for ( let field of jsonFields ) {
                    try {
                        if ( result[field] != "" && result[field]) {
                            result[field] = JSON.parse(result[field]);
                        }
                    } catch (error) {
                        logger.error(`_formatResult`,error)  
                    }
                }
            });
        }
        return {results,fields}
    }
    /**
     * 默认格式化insert以及update的数据,如果有字段是JSON开头会解析为字符串
     * @param {object} data 将要被insert或者是update的数据
     * @return {object}
     */
    _formatSet(data) {
        for ( let field in data ) {
            if (field.indexOf('JSON_') == 0 && typeof data[field] != 'string') {
                data[field] = JSON.stringify(data[field])
            }
            // 对于时间是timestamp类型自动转化为YYYY-MM-DD HH:mm:ss
            if (field.indexOf(`_time`) > -1 
                && /^\d{13}$/.test(String(data[field])) 
                && moment.isDate(new Date(data[field]))
            ) {
                data[field] = moment(data[field]).format(
                    `YYYY-MM-DD HH:mm:ss`
                )
            }
        }
        return data;
    }
    /**
     * 将sql语句解析完整
     * @param {string} sql 语句
     * @param {object|array} params 参数
     * @return {string}
     */
    sqlFormat(...args) {
        return mysql.format(...args)
    }
    /**
     * 事物操作
     * @param {array} sqls 要执行事物的mysql处理函数
     */
    async transaction(sqls) {
        return new Promise(async (resolve,reject) => {
            this.connect((connection) => {
                connection.beginTransaction(async (error) => {
                    if (error) {
                        reject(this.error(error));
                        return ;
                    }
                    let res = [];
                    for ( let sql of sqls ) {
                        try {
                            res.push(await this.query(sql))
                        } catch(error) {
                            connection.rollback(() => {
                                reject(this.error(error))
                            });
                            return;
                        }
                    }
                    connection.commit((error) => {
                        if (error) {
                            connection.rollback(() => {
                                reject(this.error(error))
                            })
                        }
                        resolve(res)
                    })
                })
            })
            
        });
    }
    /**
     * 执行sql语句
     * @param {string} sql 执行sql语句
     * @return {object} {results,fields}
     */
    async query(sql) {
        return new Promise((resolve,reject) => {
            logger.trace(`sql:${sql}`);
            this.connect((connection) => {
                connection.query(sql,(error,results,fields) => {
                    if (error) {
                        error.sqlMessage += `[sql:${error.sql}][srcSQL:${sql}]`
                        reject(this.error(error))
                        return ;
                    }
                    resolve(this._formatResult({
                        results,
                        fields
                    }))
                });
            })
            
        })
    }


    /**
     * 列表数据查询
     * @param {object} rules 查询条件
     * @param {object} pagination 分页数据
     * @param {object} sort 排序数据
     * @param {object} filter 过滤数据
     */
    async list(
        rules,
        pagination,
        sort = {
            orderby: this.primaryKey
        },
        filter = {
            result: null,
            state: null
        }
    ) {
        return await this._list(
            this.sql()
                .select('*')
                .from(this.table)
                .where((() => {
                    const where = util.deepClone(rules);
                    for ( let i in filter ) {
                        if (filter[i] !== null) {
                            where[i] = filter[i]
                        }
                    }
                    return where
                })())
                .sort(sort.orderby)
                .page(pagination.page,pagination.per_page)
                .toString(),
            pagination
        )
    }

    /**
     * 查询列表数据,对query进一层的封装
     * @param {string} sql sql 执行的语句
     * @param {object} pagination 当前的分页信息{per_page,page}
     * @return {object} {list,total}
     */
    async _list(sql,pagination) {
        const resList = await this.query(sql)
        const resCount = await this.query(
            this.sql().toQueryTotalString(sql)
        )
        return {
            list: resList.results,
            page: {
                total: this.result.total(resCount),
                page: Number(pagination.page),
                per_page: Number(pagination.per_page)
            }
        }
    }


     /**
     * 查询全部的信息
     * @param {object} rule 查询的条件规则
     * @param {string} rule.method 查询的方法有 where、whereIn、whereLike
     * @param {array}  rule.args 查询条件的参数
     * @param {object} [opts] 可选参数
     * @param {string} [opts.table] 查询的表
     * @returns {array}
     */
    async all(
        rule = {
            method: `where`,
            args: []
        },
        opts = {
            table: this.table,
            orderby: this.primaryKey
        }
    ) {
        if (!rule.method || !util.oneOf(rule.method,['where','whereLike','whereIn']) ) {
            throw this.error(`arguments rule.method error`,`method:${rule.method}`);
        }
        if (!rule.args || !Array.isArray(rule.args)) {
            throw this.error(`arguments rule.args error`,`method:${rule.method}`)
        }
        let sql = this.sql();
        sql = sql
                .select('*')
                .from(opts.table)
        if (rule.args.length != 0) {
            sql[rule.method].apply(sql,rule.args)
        }
        sql = sql.sort(opts.orderby)
        return await this.result.all(
            await this.query(
                sql.toString()
            )
        )
    }

    

    /**
     * 查询中其中一个的值
     * @param {object} rules 查询的规则
     * @param {string} table 表
     */
    async one(rules,table = this.table) {
        return this.result.one(
            await this.query(
                this.sql()
                    .select('*')
                    .from(table)
                    .where(rules)
                    .toString()
            )
        )
    }


    /**
     * 插入数据，会转换一些数据
     * @param {object} inserted 要被插入的数据
     * @return {number} insertId 插入数据的id
     */
    async insert(
        inserted,
        table = this.table
    ) {
        return this.result.insertId(
            await this.query(
                this.sql()
                    .insert(table)
                    .set(this._formatSet(
                        typeof inserted == 'function'
                            ? inserted()
                            : inserted
                    ))
                    .toString()
            )
        )
    }

    /**
     * 更新某个数据

     * @param {number} id 数据的id
     * @param {object|function} updated 更新的数据，如果是function则需要return一个object
     */
    async update(
        id,
        updated,
        table = this.table
    ) {
        return this.result.updates(
            await this.query(
                this.sql()
                    .update(table)
                    .set(this._formatSet(
                        typeof updated == 'function'
                            ? updated()
                            : updated
                    ))
                    .where({
                        [this.primaryKey]:id
                    })
                    .toString()
            )
        )
    }


    /**
     * 抛出错误
     * @param {string} message 错误的信息
     * @param {string} sql 要执行的sql语句
     */
    error(
        message,
        sql,
        status = StatusError.HTTP_INTERNAL_SERVER_ERROR
    ) {
        if (StatusError.isStatusError(message)) {
            return StatusError;
        } else {
            return StatusError.toStatusError(
                message,
                status
            )
        }
    }
}