import { EventEmitter } from 'events';

export default class Record extends EventEmitter {

    constructor() {
        super();
        this.record = [];
        this.MOD = {
            [`node`]: `node`,
            [`node.properties`]: `node.properties`
        }
        this.ACT = {
            [`update`]: `update`,
            [`insert`]: `insert`,
            [`delete`]: `delete`
        }
        this.EVENT = {
            CHANGE: `change`
        }
    }

    _emit(event,...args) {
        this.emit(event,...args);
    }

    /**
     * @description 添加操作历史
     * @param {number} mod 模块，可对应MOD
     * @param {number} act 行为，对应ACT
     * @param {object} config 配置
     * @param {anyval} newValue 新的值
     * @param {anyval} oldValue 旧的值
     */
    push(mod,act,config,newValue,oldValue) {
        this.record.push({
            mod: mod,
            act: act,
            config: config,
            newValue: newValue,
            oldValue: oldValue,
            time: Date.now()
        })
        this._emit(this.EVENT.CHANGE);
    }
}