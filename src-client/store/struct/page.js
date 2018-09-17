import util from '../../lib/util'

/**
 * @description 页面数据对象
 * @param {string} name 页面名称
 * @param {Router} router 页面的路由配置
 * @param {string} parentId 页面的父级id
 * @param {string} id 页面的id，如果没有会自动创建
 */
export default (
    name,
    router,
    parentId,
    id
) => {
    return Object.assign({
        name: name,
        id: id || `page_${util.randomStr(16)}`,
        router: router,
        parentId: parentId
    })
}