import Logic from '../lib/rest/Logic'
import projectLogic from './project'
import dataLogic from './data'
import pageLogic from './page'
import path from 'path'
import util from '../lib/util'
import tmpl from './tmpl/build'
import translater from '../../config/translater'
import child_process from 'child_process'

export default new class BuildLogic extends Logic {

    constructor() {
        super();
        this.projectRootPath = path.resolve(__dirname,`../../projects`);
    }

    async main(projectKey) {
        const project = await projectLogic.one(projectKey),
              projectRootPath = this._resolveProjectPath(
                  tmpl.helper.projectKey(project)
              ),
              projectDatas = await dataLogic.all(projectKey),
              projectDatasJson = translater["project.data.json"](projectDatas),
              projectPages = await pageLogic.projects(projectKey);
        await this._mkdirProjectFolder(project);
        await this._buildDir([
            `${projectRootPath}/config`,
            `${projectRootPath}/src`,
            `${projectRootPath}/src/Page`,
            `${projectRootPath}/src/template`
        ])
        await this._buildFiles(project,[{
            fileName: `404.html`,
            content: () => {
                return tmpl["404.html"](project,projectPages);
            }
        },{
            fileName: `app.js`,
            content: () => {
                return tmpl["app.js"](project,projectPages)
            }
        },{
            fileName: `server.js`,
            content: () => {
                return tmpl["server.js"](project)
            }
        },{
            fileName: `env.js`,
            dirPath: `${projectRootPath}/config`,
            content: () => {
                return ``
            }
        },{
            fileName: `webpack.base.config.js`,
            content: () => {
                return tmpl["webpack.base.config.js"](project)
            }
        },{
            fileName: `webpack.dev.config.js`,
            content: () => {
                return tmpl["webpack.dev.config.js"]()
            }
        },{
            fileName: `webpack.prod.config.js`,
            content: () => {
                return tmpl["webpack.prod.config.js"]()
            }
        },{
            fileName: `index.ejs`,
            dirPath: `${projectRootPath}/src/template`,
            content: () => {
                return tmpl["index.ejs"](project)
            }
        },{
            fileName: `.babelrc`,
            content: () => {
                return tmpl.babelrc()
            }
        },{
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
        },{
            fileName: `Root.vue`,
            dirPath: `${projectRootPath}/src`,
            content: () => {
                return tmpl["Root.vue"]()
            }
        }])
        await this._buildPages(projectPages,project,projectDatas);
        const res = await this._buildDist(project);
        return res;
    }

    /**
     * @description 初始化项目文件
     */
    async _mkdirProjectFolder(project) {
        const key = tmpl.helper.projectKey(project),
              projectPath = this._resolveProjectPath(key);
        if (util.fs.isExist(projectPath)) {
            util.fs.removeDir(projectPath)
        }
        util.fs.mkdir(projectPath);
    }
    
    async _buildFiles(project,fileConfigs) {
        const projectPath = this._resolveProjectPath(
            tmpl.helper.projectKey(project)
        );
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
        projectPages.forEach(async (paegConfig) => {
            await this._buildEachPage(paegConfig,project,projectDatas)
        });
    }

    async _buildEachPage(pageConfig,project,projectDatas) {
        const pageName = tmpl.helper.pageName(pageConfig),
              nodetreeTmpl = tmpl.page(pageConfig),
              projectRootPath = this._resolveProjectPath(
                  tmpl.helper.projectKey(project)
              );
        await this._buildFiles(project,[{
            fileName: `${pageName}.vue`,
            dirPath: `${projectRootPath}/src/Page`,
            content: () => nodetreeTmpl
        }])  
    }

    async _buildDist(project) {
        const projectRootPath = this._resolveProjectPath(
                tmpl.helper.projectKey(project)
            ),
              execSync = child_process.execFileSync;
        try {
            const res = execSync(
                path.resolve(__dirname,'./shell/dist.sh'),[
                    projectRootPath
                ]
            )
            if (res.toString().replace(/\s+/g, "") == 'OK') {
                return {ret:0,message:'success'};
            }
            return {ret:-1,message:`build project error, message:${res}`};
        } catch (error) {
            console.error('->error',error)
            return {ret:-2,message:`build dist error, message:${error}`}
        }
    }

    _resolveProjectPath(projectKey) {
        return path.resolve(this.projectRootPath,`./${projectKey}`)
    }
}