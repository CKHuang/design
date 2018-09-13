import util from '../../libs/util'

/**
 * 节点对象
 * @for 节点树
 */


/**
 * @param {string} tag 节点标签
 * @param {object} properties 节点的属性以及配置控件之类
 */
export default (
    tag,
    properties,
    id
) => {
    return Object.assign({
        tag: tag,
        properties: properties,
        id: id || `node_${util.randomStr(12)}`,
        children: []
    })
}