import types from './types'
import projectModel from '../../../models/project'
import pageModel from '../../../models/page'

export default {
    /**
     * @description 查询项目的信息
     * @param {string} projectKey 项目的key
     * @param {string} pageKey 页面的key，可能会没有
     */
    async [types.actions["init.data"]]({ dispatch, commit },{projectKey,pageKey}) {
        try {
            const project  = await projectModel.queryProject(projectKey);
            const pageList = await pageModel.queryProjectPages(projectKey);
            commit(types.mutations["update.data.project"],project);
            commit(types.mutations["update.data.project.page.list"],pageList)
            commit(types.mutations["update.ide.loading"],false);
            
        } catch (error) {
            console.log('init.data error',error);
        }
    }
}