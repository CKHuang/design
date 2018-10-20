import router from '../../lib/rest/router'
import projectCtrl from '../../controller/project'

export default router([{
    desc: `查询某个项目的信息`,
    method: `GET`,
    path: `/api/project/:projectKey`,
    action: projectCtrl.invokeAction(`one`),
},{
    desc: `创建项目`,
    method: `POST`,
    path: `/api/project`,
    action: projectCtrl.invokeAction(`insert`)
},{
    desc: `查询所有项目`,
    method: `GET`,
    path: `/api/projects`,
    action: projectCtrl.invokeAction(`all`)
},{
    desc: `构建项目源码`,
    method: `PUT`,
    path: `/api/project/:projectKey/build`,
    action: projectCtrl.invokeAction(`build`)
}])