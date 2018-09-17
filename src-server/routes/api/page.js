import router from '../../lib/rest/router'
import pageCtrl from '../../controller/page'

export default router([{
    desc: `查询某个项目所有的页面`,
    method: `GET`,
    path: `/api/project/:key/page`,
    action: pageCtrl.invokeAction(`queryProjectPages`),
}])