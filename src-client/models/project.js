import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default class Project extends Http {

    constructor() {
        super();
        this.baseURL = httpConfig.baseURL
    }

    /**
     * @description 查询所有的项目
     */
    async all() {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/projects`)
        )
    }

    /**
     * @description 查询某个项目的具体信息
     * @param {string} key 项目的key
     */
    async one(key) {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/project/${key}`)
        )
    }

    /**
     * @description 创建项目
     * @param {object} form 
     * @param {string} form.name 项目名称
     * @param {number} form.type 项目类型
     */
    async insert(form) {
        return await this.request(
            `POST`,
            this.merge(this.baseURL,`/project`),
            {data:form}
        )
    }

    /**
     * 构建项目
     * @param {string} projectKey 
     */
    async build(projectKey) {
        return await this.request(
            `PUT`,
            this.merge(this.baseURL,`/project/${projectKey}/build`)
        )
    }
}