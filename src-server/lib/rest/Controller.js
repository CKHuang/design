import EventEmitter from 'events'
import Res from './Res'
import status from './status'
import StatusError from './StatusError'
import util from '../util'

export default class Controller extends EventEmitter {

    /**
     * RESTful api的controller基类
     * @param {string} name controller的名字 
     */
    constructor(name) {
        super();
        this.name = name || 'controller';
    }

    _beforeAction(ctx,ret) {}

    _afterAction(ctx) {}

    /**
     * 修饰执行的action
     * @param {function} fn 要执行的action
     * @param {boolean} hasRes 修饰的时候是否加上res的参数
     * @return {function} (ctx) => Res
     */
    _decorator(fn,hasRes = true) {
        return async (ctx) => {
            const res = new Res(status.Ok);
            const args = hasRes === false ? [ctx] : [ctx,res];
            await fn.apply(this,args)
            return hasRes === false ? null : res;
        }
    }

    /**
     * 代理执行某个action
     * @param {string} name action的名字，例如action为queryById，this.invokeAction('queryById')，且要存在queryByIdAction的方法
     * @return {function} (ctx) => {}
     */
    invokeAction(name) {
        if (typeof this[`${name}Action`] !== 'function') {
            throw new ReferenceError(`${this.name} ${name} action non-existent`)
        }
        return async (ctx) => {
            ctx.controller = this.name;
            ctx.action = name;
            const execQueue = [
                this._beforeAction,
                this[`${name}Action`]
            ]
            let res;
            let hasError = false;
            try {
                for (let fn of execQueue) {    
                    res = await this._decorator(fn).call(this,ctx);
                    if (res.export().status !== status.Ok) {
                        hasError = true;
                        break;
                    }
                }
                res.flush(ctx);
                // 相当于hook来执行，有了error就不执行了
                if (!hasError) {
                    await this._decorator(this._afterAction).call(this,ctx,false)
                }
            } catch (statusError) {
                if (statusError instanceof StatusError) {
                    new Res(Number(statusError.status),statusError.webMessage).flush(ctx);
                } else {
                    new Res(Number(StatusError.HTTP_INTERNAL_SERVER_ERROR)).flush(ctx);
                }
                ctx.app.emit('error',statusError);
            }   
        }
    }
}