import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default new class PageModel extends Http {

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
}