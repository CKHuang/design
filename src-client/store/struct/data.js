/**
 * @param {string} key 数据的键
 * @param {string} type 类型，可选的 number、string、array、object
 * @param {any} value 具体的值
 */
export default (
    key,
    type,
    value
) => {
    return Object.assign({
        key,
        type,
        value
    })
}