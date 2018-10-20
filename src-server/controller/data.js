import Controller from '../lib/rest/Controller'
import logic from '../logic/data'

export default new class DataController extends Controller {

    constructor() {
        super(`data`)
    }

    async _beforeAction(ctx,res) {}
    async _afterAction(ctx,res) {}


    async allAction(ctx,res) {
        res.data(
            await logic.invoke(
                'all',
                ctx.params.projectKey
            )
        )
    }

    async updateAction(ctx,res) {
        res.data(
            await logic.invoke(
                `update`,
                ctx.params.projectKey,
                ctx.parameter.updated()
            )
        )
    }
}