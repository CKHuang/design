import Controller from '../lib/rest/Controller'

export default new class ProjectController extends Controller {

    constructor() {
        super(`project`)
    }

    async _beforeAction(ctx,res) {}
    async _afterAction(ctx,res) {}

    /**
     * @description 查询某个项目的详情
     */
    async queryOneAction(ctx,res) {
        res.data({
            id: 12,
            key: `projxu8061uhyolhfjxy`,
            name: `测试项目`,
            create_time: `2018-09-20 10:20:30`,
            creater: `CK.Huang`,
            page_width: 1024,
            page_height: 960,
            type: 1,
            owner: `CK.Huang`
        })
    }
}