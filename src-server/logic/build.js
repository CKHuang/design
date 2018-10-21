import Logic from '../lib/rest/Logic'
import projectLogic from './project'
import dataLogic from './data'
import pageLogic from './page'
import path from 'path'
import util from '../lib/util'
import tmpl from './tmpl/build'
import translater from '../../config/translater'

export default new class BuildLogic extends Logic {

    constructor() {
        super();
        this.projectRootPath = path.resolve(__dirname,`../../projects`);
    }

    async main(projectKey) {
        const project = await projectLogic.one(projectKey),
              projectRootPath = this._resolveProjectPath(project.key),
              projectDatas = await dataLogic.all(projectKey),
              projectDatasJson = translater["project.data.json"](projectDatas),
              projectPages = await pageLogic.projects(projectKey);
        await this._mkdirProjectFolder(project);
        await this._buildDir([
            `${projectRootPath}/src`,
            `${projectRootPath}/src/Page`
        ])
        await this._buildFiles(project,[{
            fileName: `README.md`,
            content: () => {
                return tmpl.README(project)
            }
        },{
            fileName: `package.json`,
            content: () => {
                return tmpl["package.json"](project)
            }
        },{
            fileName: `project.data.js`,
            dirPath: `${projectRootPath}/src`,
            content: () => {
                return tmpl["project.data.js"](projectDatasJson)
            }
        },{
            fileName: `routes.js`,
            dirPath: `${projectRootPath}/src`,
            content: () => {
                return tmpl.routes(projectPages,project)
            }
        },{
            fileName: `main.js`,
            dirPath: `${projectRootPath}/src`,
            content: () => {
                return tmpl["main.js"]()
            }
        },{
            fileName: `App.vue`,
            dirPath: `${projectRootPath}/src`,
            content: () => {
                return tmpl["App.vue"]()
            }
        }])
        await this._buildPages(projectPages,project,projectDatas);
    }

    /**
     * @description 初始化项目文件
     */
    async _mkdirProjectFolder(project) {
        const key = project.key,
              projectPath = this._resolveProjectPath(key);
        if (util.fs.isExist(projectPath)) {
            util.fs.removeDir(projectPath)
        }
        util.fs.mkdir(projectPath);
    }
    
    async _buildFiles(project,fileConfigs) {
        const projectPath = this._resolveProjectPath(project.key);
        fileConfigs.forEach((fileConfig) => {
            const fileName = fileConfig.fileName,
                  content = fileConfig.content(),
                  dirPath = fileConfig.dirPath || projectPath;
            util.fs.writeFile(dirPath,fileName,content)
        })
    }

    async _buildDir(dirPaths) {
        dirPaths.forEach((dir) => {
            util.fs.mkdir(dir)
        })
    }


    async _buildPages(projectPages,project,projectDatas) {
        console.log('------->projectPages',projectPages)
        projectPages.forEach(async (paegConfig) => {
            await this._buildEachPage(paegConfig,project,projectDatas)
        });
    }

    async _buildEachPage(pageConfig,project,projectDatas) {
        const pageName = tmpl.helper.pageName(pageConfig),
              nodetreeTmpl = tmpl.page(pageConfig),
              projectRootPath = this._resolveProjectPath(project.key);
        await this._buildFiles(project,[{
            fileName: `${pageName}.vue`,
            dirPath: `${projectRootPath}/src/Page`,
            content: () => nodetreeTmpl
        }])  
    }

    _resolveProjectPath(projectKey) {
        return path.resolve(this.projectRootPath,`./${projectKey}`)
    }
}