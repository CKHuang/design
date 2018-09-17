import router from '../../lib/rest/router'
import projectCtrl from '../../controller/project'

export default router([{
    desc: `查询某个项目的信息`,
    method: `GET`,
    path: `/api/project/:key`,
    action: projectCtrl.invokeAction(`queryOne`),
}])