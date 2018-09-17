import util from '../../libs/util'

/**
 * @description 页面路由的数据对象
 * @param {string} name 页面的路由名称
 * @param {string} path 页面的路由访问路径
 * @param {object} props 页面的参数属性
 * @param {string} id 可选id
 */
export default (
    name,
    path,
    props,
    id
) => {
    return Object.assign({
        id: id || `router_${util.randomStr(16)}`,
        name: name,
        path: path,
        props: props || {}
    })
}