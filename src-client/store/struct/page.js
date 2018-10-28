import util from '../../libs/util'

/**
 * @description 页面数据对象
 * @param {string} name 页面名称
 * @param {string} router_name 路由名称
 * @param {string} router_path 路由访问path
 * @param {object} router_props 路由的初始化参数
 * @param {number} page_width 页面的宽度
 * @param {number} page_height 页面的高度
 * @param {array} nodetree 页面的节点树
 * @param {string} parentId 页面的父级id
 * @param {string} id 页面的id，如果没有会自动创建
 */
export default (
    name,
    router_name,
    router_path,
    router_props,
    page_width = 0,
    page_height = 0,
    nodetree = [],
    parentId = null,
    id = null,
    node_props_data = {}
) => {
    return Object.assign({
        name: name,
        id: id || `page_${util.randomStr(16)}`,
        router_name: router_name,
        router_path: router_path,
        router_props: router_props,
        page_width: page_width,
        page_height: page_height,
        JSON_nodetree: nodetree,
        JSON_node_props_data: node_props_data
    })
}