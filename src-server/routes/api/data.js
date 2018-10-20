import router from '../../lib/rest/router'
import dataCtrl from '../../controller/data'

export default router([{
    desc: `查询某个项目的所有数据`,
    method: `GET`,
    path: `/api/project/:projectKey/data`,
    action: dataCtrl.invokeAction(`all`),
},{
    desc: `更新某个项目的所有配置`,
    method: `PUT`,
    path: `/api/project/:projectKey/data`,
    action: dataCtrl.invokeAction(`update`)
}])