import util from '../../libs/util'

/**
 * 节点对象
 * @for 节点树
 */


/**
 * @param {string} lib 属于哪个组件库
 * @param {string} tag 节点标签
 * @param {object} properties 节点的属性以及配置控件之类
 * @param {boolean} editOutline 是否有编辑外框
 */
export default (
    lib,
    tag,
    properties,
    editOutline,
    id
) => {
    return Object.assign({
        lib: lib,
        tag: tag,
        properties: properties,
        editOutline: editOutline,
        id: id || `node_${util.randomStr(12)}`,
        children: []
    })
}