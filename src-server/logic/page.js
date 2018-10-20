import Logic from '../lib/rest/Logic'
import crypto from 'crypto'
import PageModel from '../model/Page'

export default new class extends Logic {

    constructor() {
        super();
        this.pageModel = new PageModel();
    }

    /**
     * @description 查询相关相关的页面
     */
    async projects(projectKey) {
        return await this.pageModel.all({
            method: `where`,
            args: [{'project_key':projectKey}]
        })
    }

    async insert(inserted) {
        return await this.pageModel.insert(inserted)
    }

    async update(id,updated) {
        return await this.pageModel.update(id,updated)
    }
}