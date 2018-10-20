import router from '../../lib/rest/router'
import pageCtrl from '../../controller/page'

export default router([{
    desc: `添加新的页面`,
    method: `POST`,
    path: `/api/project/:projectKey/page`,
    action: pageCtrl.invokeAction(`insert`)
},{
    desc: `获取项目所有的页面`,
    method: `GET`,
    path: `/api/project/:projectKey/page`,
    action: pageCtrl.invokeAction(`projects`)
},{
    desc: `更新页面`,
    method: `PUT`,
    path: `/api/page/:pid`,
    action: pageCtrl.invokeAction('update')
}])