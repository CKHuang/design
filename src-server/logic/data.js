import Logic from '../lib/rest/Logic'
import DataModel from '../model/Data'

export default new class DataLogic extends Logic {

    constructor() {
        super();
        this.dataModel = new DataModel();
    }

    async all(projectKey) {
        const res = await this.dataModel.one({
            'project_key':projectKey
        })
        return res.JSON_content;
    }

    async update(projectKey,updated) {
        return this.dataModel.update({
            project_key:projectKey
        },updated)
    }
}