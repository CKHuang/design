import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default class Project extends Http {

    constructor() {
        super();
        this.baseURL = httpConfig.baseURL
    }

    /**
     * 更新项目数据
     * @param {array} datas 项目数据 
     */
    async update(projectKey,updated) {
        return await this.request(
            `PUT`,
            this.merge(this.baseURL,`/project/${projectKey}/data`),
            {data:updated}
        )
    }

    /**
     * 查询项目的data
     * @param {string} projectKey 
     */
    async all(projectKey) {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/project/${projectKey}/data`)
        )
    }
}