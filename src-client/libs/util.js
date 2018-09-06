import axios from 'axios';
import code from './code'

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};


/**
 * 代码操作
 */
util.code = code;


/**
 * 生成随机字符串
 * @param {number} len 字符串长度
 */
util.randomStr = function(len) {
    let words = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = '',
        pos;
    for (let i = 0; i < len; i++) {
        pos = Math.round(Math.random() * (words.length - 1));
        res += words[pos]
    }
    return res;
}

/**
 * 解析出来url的参数
 * @param {Vue.Compoent} _this Vue的组件
 * @return {Object} {params,query}
 */
util.parseUrl = function(_this){
    const url = _this.$router.history.current;
    return {
        params: url.params,
        query: url.query
    }
}

/**
 * 判断是否在数组中
 * @param {string|number} value
 * @param {array} list 
 * @param {string|number} defaultVal
 * @return 如果存在defaultVal参数，如果不存在则返回defaultVal
 *         如果不存在defaultVal参数，如果不存在则返回false，存在返回true
 */
util.oneOf = function(value,list,defaultVal = null) {
    const has = list.indexOf(value) > -1;
    if (has) {
        return defaultVal === null ? true : value;
    } else {
        return defaultVal === null ? false : defaultVal
    }
}


/**
 * 判断是不是空对象或者是数组
 * @param {object|array} obj 
 */
util.isEmpty = (obj) => {
    if ( typeof obj == 'object' ) {
        const len = Array.isArray(obj) 
                        ? obj.length
                        : Object.keys(obj).length;
        return len == 0;
    }
    return true;
}

/**
 * 对比origin以及target，如果
 * target里面的key在origin存在
 * 则会覆盖
 * @param {object} origin 
 * @param {object} target 
 */
util.extend = (origin = {},target = {}) => {
    origin = util.deepClone(origin);
    target = util.deepClone(target);
    for ( let i in target ) {
        origin[i] = target[i]
    }
    return origin;
}

/**
 * 将数据数据归类
 * @param {array} list 原始的数据
 * @param {string} sortOutKey 每一项归类的key，如果有填写key，则会以sortOutKey来作为归类的key,如果没有则直接以item作为归类key
 * @return {object} {[sortOutKey:string]:item[]}
 */
util.sortOut = (list,sortOutKey = false) => {
    const _list = list.slice(0);
    const result = {};
    _list.forEach((item) => {
        let key;
        console.log('-->item',item,item[sortOutKey]);
        if (sortOutKey && typeof item[sortOutKey] != 'undefined') {
            key = item[sortOutKey].toString();
        } else {
            key = item.toString();
        }
        if (typeof result[key] == 'undefined') {
            result[key] = [];
        }
        result[key].push(item);
    });
    return result;
}

/**
 * 深度克隆
 * @param {object} obj 被克隆额度对象
 * @return {object}
 */
util.deepClone = (obj = {}) =>{
    const keys = Object.keys(obj)
    const newObject = Array.isArray(obj) ? [] : {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (typeof obj[key] === 'object' && obj[key]) {
            newObject[key] = util.deepClone(obj[key])
        } else {
            newObject[key] = obj[key]
        }
    }
    return newObject
}

/**
 * 保护转换parser
 * @param {string} data 要被转的数据
 * @param {mixed} errRet 抛出错误的时候返回
 */
util.defendJsonParse = (data,errRet = {}) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return errRet;
    }
}

/**
 * 对比两个object，并返回不同的字段
 * @param {object} origin 原始object
 * @param {object} target 目标object
 * @return {array} 如果完全一样则返回空数组,如果不是object则直接返回true/false,[{
 *     type: 'add'/'update'/'delete',
 *     key: 键名
 *     origin: 原始数据的值
 *     target: 目标数据的值
 * }]
 */
util.compare = (origin = {},target = {}) => {
    if ( typeof origin !== 'object' || typeof target !== 'object') {
        return origin === target;
    }
    const originKeys = Object.keys(origin);
    const targetKeys = Object.keys(target);

    // 不一致的数据
    const diff = [];

    // 获取两个对象的差key
    const diffKeys = originKeys.concat(targetKeys).filter(
        v => !originKeys.includes(v) || !targetKeys.includes(v)
    )

    diffKeys.forEach((key) => {
        if ( target.includes(key) ) {
            diff.push({
                type: 'add',
                key: key,
                origin: null,
                target: target[key]
            })
        } else {
            diff.push({
                type: 'delete',
                key: key,
                origin: origin[key],
                target: null
            })
        }
    });

    // 需要将 origin 以及 target 对比的key
    const compareKeys = targetKeys.filter(
        v => !diffKeys.includes(v)
    )

    for ( let i in target ) {
        if ( ( typeof target[i] == 'object' 
                && typeof origin[i] == 'object' 
                && !Object.is(target[i],origin[i]) )
            || target[i] !== origin[i] ) {
                diff.push({
                    type: 'update',
                    key: i,
                    origin: origin[i],
                    target: target[i]
                })
        }
    }

    return diff;
}


/**
 * 获取cookie名称
 * @param {string} name cookie名称 
 */
util.getCookie = (name) => {
    let arr,
        reg = RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2])
    }
    return null
}

export default util;