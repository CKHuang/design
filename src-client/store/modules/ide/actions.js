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
            commit(types.mutations["select.data.project"],project);
            commit(types.mutations["update.data.project.page.list"],pageList);
            if (pageList && pageList.length > 0) {
                let selectPage = pageList[0];
                if ( pageKey ) {
                    pageList.forEach((page) => {
                        if (pageKey == page.key) {
                            selectPage = page;
                        }
                    });
                }
                commit(types.mutations["select.data.editing.page"],selectPage)
            }
            commit(types.mutations["update.ide.loading"],false);
            
        } catch (error) {
            console.log('init.data error',error);
        }
    },
    /**
     * @description 发送后台请求，添加新的页面
     * @param {}
     */
    async [types.actions["new.page"]]({ dispatch, commit }) {
        
    }
}