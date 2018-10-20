import Controller from '../lib/rest/Controller'
import logic from '../logic/page'

export default new class PageController extends Controller {

    constructor() {
        super(`page`)
    }

    async _beforeAction(ctx,res) {}
    async _afterAction(ctx,res) {}


    async insertAction(ctx,res) {
        let inserted = ctx.parameter.inserted();
              inserted.create_time = Date.now();
              inserted.creater = ctx.user;
              inserted.project_key = ctx.params.projectKey;
              delete inserted.parentId;
        res.data(
            await logic.invoke(`insert`,inserted)
        )
    }

    async projectsAction(ctx,res) {
        res.data(
            await logic.invoke(`projects`,ctx.params.projectKey)
        )
    }

    async updateAction(ctx,res) {
        const updated = ctx.parameter.updated();
              delete updated.pid;
        res.data(
            await logic.invoke(
                `update`,
                ctx.params.pid,
                updated
            )
        )
    }
    
}