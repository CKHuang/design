import types from './types'
import Project from '../../../models/Project'
import Page from '../../../models/Page'
import Data from '../../../models/Data'
import tpyesConfig from '../../../../config/types'

const projectModel = new Project();
const pageModel = new Page();
const dataModel = new Data();

export default {
    /**
     * @description 查询项目的信息
     * @param {string} projectKey 项目的key
     * @param {string} pageKey 页面的key，可能会没有
     */
    async [types.actions["init.data"]]({ dispatch, commit },{projectKey,pageKey}) {
        try {
            const project  = await projectModel.one(projectKey);
            const projectData = await dataModel.all(projectKey);
            const pageList = await pageModel.queryProjectPages(projectKey);
            commit(types.mutations["select.data.project"],project);
            commit(types.mutations["update.data.project.page.list"],pageList);
            commit(types.mutations["set.project.data"],{data:projectData})
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
    async [types.actions["new.page"]]({ dispatch, commit, state }, {page}) {
        try {
            const project = state[types.state.data.project];
            if (!project || !project.key) {
                console.error(`no project info`,project)
                return ;
            }
            const pageSize = tpyesConfig.PAGE_SIZE[project.type];
                  page.page_height = pageSize.height;
                  page.page_width = pageSize.width;
                  page.router_path = `/${project.name}${page.router_path}`
            await pageModel.insert(project.key,page);
            commit(types.mutations["insert.data.project.page.list"],{page})
        } catch (error) {
            console.error(`new.page error`,error);
            throw error;
           
        }
    },
    /**
     * @description 保存项目
     */
    async [types.actions["save.project"]]({ state, getters, dispatch, commit }) {
        try {
            const datas = state[types.state.data["project.data"]],
                  pages = state[types.state.data["project.page.list"]],
                  project = state[types.state.data.project];
            const submitPages = async () => {
                const fns = [];
                pages.forEach((page) => {
                    fns.push(pageModel.update(page.id,{JSON_nodetree:page.JSON_nodetree}))
                });
                const res = await Promise.all(fns);
                console.log('-->submitPages res',res);
            }
            const submitData = async () => {
                return await dataModel.update(project.key,{
                    JSON_content: datas
                })
            }
            await submitPages();
            await submitData();
            await projectModel.build(project.key);
            console.log('--->datas',datas,'--->pages',pages,'-->project',project);
        } catch (error) {
            console.log(`save.project error`,error)
        }
    }
}