import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default class PageModel extends Http {

    constructor() {
        super();
        this.baseURL = httpConfig.baseURL
    }

    /**
     * @description 查询项目的key
     * @param {string} projectKey 项目的key 
     */
    async queryProjectPages(projectKey) {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/project/${projectKey}/page`)
        )
    }

    async insert(projectKey,inserted) {
        return await this.request(
            `POST`,
            this.merge(this.baseURL,`/project/${projectKey}/page`),
            {data:inserted}
        )
    }

    async update(pid,updated) {
        return await this.request(
            `PUT`,
            this.merge(this.baseURL,`/page/${pid}`),
            {data:updated}
        )
    }
}