import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default new class ProjectModel extends Http {

    constructor() {
        super();
        this.baseURL = httpConfig.baseURL
    }

    /**
     * @description 查询某个项目的具体信息
     * @param {string} key 项目的key
     */
    async queryProject(key) {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/project/${key}`)
        )
    }
}