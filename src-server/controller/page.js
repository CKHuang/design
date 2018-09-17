import Controller from '../lib/rest/Controller'

export default new class PageController extends Controller {

    constructor() {
        super(`page`)
    }

    async _beforeAction(ctx,res) {}
    async _afterAction(ctx,res) {}

    /**
     * @description 查询某个项目的所有页面列表
     */
    async queryProjectPagesAction(ctx,res) {
        res.data([{
            id: 12,
            key: `pageui827uwhxjsi73gs`,
            pkey: `projxu8061uhyolhfjxy`,
            name: `主页`,
            create_time: `2018-09-20 10:20:30`,
            owner: `CK.Huang`,
            JSON_router: {},
            JSON_size: {
                width: 1024,
                height: 960
            }
        },{
            id: 13,
            key: `pageui827uwhxjs273gs`,
            pkey: `projxu8061uhyolhfjxy`,
            name: `详情页`,
            create_time: `2018-09-20 10:20:32`,
            owner: `CK.Huang`,
            JSON_router: {},
            JSON_size: {
                width: 1024,
                height: 960
            }
        }])
    }
}