import Controller from '../lib/rest/Controller'
import logic from '../logic/project'

export default new class ProjectController extends Controller {

    constructor() {
        super(`project`)
    }

    async _beforeAction(ctx,res) {}
    async _afterAction(ctx,res) {}

    /**
     * @description 查询某个项目的详情
     */
    async oneAction(ctx,res) {
        res.data(
            await logic.invoke(
                `one`,
                ctx.params.projectKey
            )
        )
    }

    async allAction(ctx,res) {
        res.data(
            await logic.invoke(`all`)
        )
    }

    async insertAction(ctx,res) {
        const inserted = ctx.parameter.inserted();
              inserted.owner = ctx.user;
              inserted.creater = ctx.user;
              inserted.create_time = Date.now()
        res.data(
            await logic.invoke(`insert`,inserted)
        )
    }
}