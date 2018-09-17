import status from './status'
import logger from '../logger'

const statusKeys = Object.keys(status);

export default class Res {

    constructor(status,msg,data) {
        this._status  = typeof status != 'undefined' ? status :  null;
        this._data    = typeof data   != 'undefined' ? data :  null;
        this._msg     = typeof msg    != 'undefined' ? msg :  null;
    }

    status(status) {
        this._status = status;
        return this;
    }

    message(message) {
        this._msg = message;
        return this;
    }

    data(data) {
        this._data = data;
        return this;
    }

    export() {
        return {
            status: this._status,
            data: this._data,
            message: this._msg 
                ? this._msg 
                : statusKeys.find(key => status[key] == this._status)
        }
    }

    flush(ctx) {
        const res = this.export();
        if (res.status === status.Ok) {
            if (res.data === null) {
                ctx.status = status.No_Content;
                ctx.body = JSON.stringify({
                    message: res.message,
                    time: Date.now()
                })
            } else {
                ctx.body = JSON.stringify({
                    data: res.data,
                    time: Date.now()
                })
            }
            //logger.error(`response.succ`,`[status:${ctx.status}][body:${ctx.body}]`)
        } else {
            ctx.status = res.status;
            ctx.body = JSON.stringify({
                message: res.message,
                time: Date.now()
            })
            logger.error(`response.fail`,`[status:${ctx.status}][body:${ctx.body}]`)
        }
    }
}