import Logic from '../lib/rest/Logic'
import crypto from 'crypto'
import ProjectModel from '../model/Project'
import buildLogic from './build'

export default new class ProjectLogic extends Logic {

    constructor() {
        super();
        this.projectModel = new ProjectModel();
    }

    /**
     * @description 创建project的key
     * @param {string} name
     * @param {number} type
     * @param {number} create_time
     * @param {string} creater
     */
    genKey(
        name,type,create_time,creater
    ) {
        return crypto.createHash('md5').update([
            name,
            String(type),
            String(create_time),
            creater
        ].join('_')).digest('hex');
    }

    async one(projectKey) {
        return await this.projectModel.one({
            [`key`]: projectKey
        })
    }

    async insert(inserted) {
        const key = this.genKey(
            inserted.name,
            inserted.type,
            inserted.create_time,
            inserted.creater
        );
            inserted.key = key;
        return await this.projectModel.insert(inserted)
    }

    async all() {
        return await this.projectModel.all()
    }

    async build(projectKey) {
        const res = await buildLogic.main(projectKey);
        return res;
    }
}