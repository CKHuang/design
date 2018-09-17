const util = {}


/**
 * 目标数组对比原始数组，获取原始数组比目标数据多出来的数据
 * @param {array} origin 原始数组
 * @param {array} target 目标数组
 * @return {array}
 */
util.compareExtra = (origin,target) => {
    return origin.filter(item => !target.includes(item))
}

/**
 * 判断是否属于{status,Error}类型的error
 * @param {object} error Error / {status,Error}
 * @return {boolean} 
 */
util.isErrorWithStatus = (error) => {
    return typeof error['status'] == 'number' && error instanceof Error;
}

/**
 * 获取数组以及字符串最后一个
 * @param {array|string} data
 * @return {any}
 */
util.getLast = (data) => {
    return data[data.length - 1]
}

/**
 * 将keys转换为默认的对象
 * @param {array} keys 
 * @param {any} defVal 
 * @return {object} {[key:string]:defVal}
 */
util.setDefaultValue = (keys,defVal = []) => {
    const obj = {}
    keys.forEach((key) => {
        obj[key] = defVal
    })
    return obj;
}


/**
 * 将数组数据归类
 * @param {array} srcList 原始数据列表
 * @param {string} [sortKey] 每一项归类的key，如果有填写则会以sortKey来作为归类的key，如果没有则直接以item作为归类key
 * @param {object} {[sortKey:string]:item[]}
 */
util.sortOut = (srcList,sortKey = false) => {
    const _list = srcList.slice(0);
    const result = {}
    _list.forEach((item) => {
        let key;
        if (sortKey && typeof item[sortKey] != 'undefined') {
            key = item[sortKey].toString()
        } else {
            key = item.toString()
        }
        if (typeof result[key] == 'undefined') {
            result[key] = []
        }
        result[key].push(item)
    })
    return result;
}

/**
 * 以对象的key来合并两个对象的值
 * @param {object} obj1
 * @param {object} obj2
 * @param {function} handleDiffMerage 合并的处理方法
 * @return {object}
 */
util.merage = (obj1,obj2,handleDiffMerage) => {
    const result = util.deepClone(obj1);
    const _obj2 = util.deepClone(obj2);
    for ( let i in _obj2 ) {
        if (typeof result[i] == 'undefined') {
            result[i] = _obj2[i];
        } else {
            result[i] = handleDiffMerage(
                result[i],
                _obj2[i]
            )
        }
    }
    return result;
}


/**
 * 数据里面的数据排序
 * @param {array} arr 
 * @param {string} key 
 * @param {boolean} asc 
 * @return {array}
 */
util.sort = (arr,key = false, asc = true) => {
    const _arr = arr.slice(0);
    _arr.sort((a,b) => {
        let _a = a;
        let _b = b;
        if (key != false) {
            _a = a[key];
            _b = b[key]
        }
        return asc ? _a - _b : _b - _a;
    })
    return _arr;
}

/**
 * 根据key将list归类
 * @param {array} list
 * @param {string} groupKey 分类的key
 */
util.groupToObj = (list,groupKey) => {
    const obj = {}
    list.forEach((item) => {
        if (!obj[item[groupKey]]) {
            obj[item[groupKey]] = []
        }
        obj[item[groupKey]].push(item);
    })
    return obj;
}

/**
 * 获取数组里面对象中属性的值生成一个数组
 * @param {array} list
 * @param {string} attr
 * @return {array}
 */
util.getAttrValues = (list,attr) => {
    return list.map((item) => {
        return item && item[attr] ? item[attr] : null
    })
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


export default util