import axios from 'axios';
import code from './util/code'
import vue from './util/vue'
import validator from './util/validator'

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};


util.validator = validator;

/**
 * 代码操作
 */
util.code = code;

/**
 * vue相关
 */
util.vue = vue;

util.map = cb => arr => Array.prototype.map.call(arr,cb);

util.max = arr => arr.reduce((acc, cur) => {
    if (cur >= acc) return cur;
    else return acc;
}, arr[0]);


util.hasClass = ( elements,cName ) => {
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );
}

util.addClass = ( elements,cName ) => {
    if( !util.hasClass( elements,cName ) ){
        elements.className += " " + cName;
    };
}

util.removeClass = (elements, cName) => {
    if (util.hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); 
    };
};

/**
 * 找到指定规则最近的父节点
 * @param {htmlelement} htmlElement 
 * @param {function} rule 
 */
util.findNearestParent = (htmlElement,rule) => {
    let result = null;
    const run = (element) => {
        if (rule(element)) {
            result = element;
        } else if (element.parentElement) {
            run(element.parentElement)
        }
    }
    run(htmlElement);
    return result
}

/**
 * 查到指定条件的子对象
 * @param {htmlelement} htmlElement 
 */
util.findChildNodes = (htmlElement,rule = () => {return true}) => {
    let nodes = [],
        childNodes = htmlElement.childNodes;
    console.log('->childNodes',htmlElement,childNodes);
    childNodes.forEach((child) => {
        if (rule(child)) {
            nodes.push(child)
        }
    });
    return nodes;
}

/**
 * 为object扩展对象
 * @param {object} obj 
 * @param {object} extend 
 */
util.objExtendAttr = (obj,key,extend,isCover = true) => {
    if (typeof obj[key] == 'undefined') {
        obj[key] = {};
    }
    for ( let i in extend ) {
        if (isCover) {
            obj[key][i] = extend[i];
        } else {
            if (typeof obj[key][i] == 'undefined') {
                obj[key][i] = extend[i]
            }
        }
    }    
    return obj;
}

/**
 * 求树的最大深度
 * @param {array} nodeTree 
 */
util.treeDepth = (nodeTree,handle) => {
    const nextChildren = node => {
        if (node.children.length === 0) return 1;
        else {
            const deeps = util.map(nextChildren)(node.children);
            handle(deeps,node)
            return 1 + util.max(deeps);
        }
    }
    return nextChildren(nodeTree);
}

/**
 * 递归处理
 * @param {array} list 将要递归处理的数据
 * @param {function} nextList 处理解析出来是否需要递归，返回数组表示需要，返回null表示不用
 * @param {function} handleNextListResult 处理递归的结果
 *    @param {object} item 被递归处理数据的对象
 *    @param {any} result 递归处理的结果
 * @param {function} handleTransferItem 处理修改每一项的数据并返回处理结果
 */
util.traverse = (
    list,
    handleRetNextList,
    handleNextListResult,
    handleTransferItem
) => {
    const handle = (_list) => {
        const result = [];
        _list.forEach((item) => {
            const nextList = handleRetNextList(item);
            if (nextList !== null && Array.isArray(nextList)) {
               item = handleNextListResult(item,handle(nextList))
            }
            item = handleTransferItem(item);
            result.push(item)
        })
        return result;
    }
    return handle(util.deepClone(list));
}

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

util.isUndefined = (data) => {
    return typeof data == 'undefined'
}

/**
 * 计算el相对otherEl的相对位置，如果otherEl为null则表示相对窗口的位置
 * @param {HTMLElement|object} el 元素对象，或者是已经计算出来的x,y节点
 * @param {HTMLElement|object} otherEl 相对元素，或者是已经计算出来的x,y位置,默认是null
 * @return {object} {x,y}
 */
util.offset = (el,otherEl = null) => {
    let offset;
    if (!util.isUndefined(el.x) && !util.isUndefined(el.y)) {
        offset = {
            left: el.x,
            top: el.y
        }
    } else {
        offset = el.getBoundingClientRect()
    }
    if (otherEl === null) {
        return {
            x: offset.left,
            y: offset.top
        }
    } else {
        let pOffset;
        if (otherEl.x && otherEl.y) {
            pOffset = {
                left: otherEl.x,
                y: otherEl.y
            }
        } else {
            pOffset = otherEl.getBoundingClientRect();
        } 
        return {
            x: offset.left - pOffset.left,
            y: offset.top - pOffset.top
        }
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