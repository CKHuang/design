export default class Record {

    constructor() {
        this.record = [];
        this.MOD = {
            [`node.properties`]: 1
        }
        this.ACT = {
            [`update`]: 1,
            [`insert`]: 2,
            [`delete`]: 3
        }
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
            oldValue: oldValue
        })
    }
}