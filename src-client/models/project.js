import Http from '../libs/Http'
import httpConfig from '../../config/http'

export default class Project extends Http {

    constructor() {
        super();
        this.baseURL = httpConfig.baseURL
    }

    /**
     * @description 查询所有的项目
     */
    async all() {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/projects`)
        )
    }

    /**
     * @description 查询某个项目的具体信息
     * @param {string} key 项目的key
     */
    async one(key) {
        return await this.request(
            `GET`,
            this.merge(this.baseURL,`/project/${key}`)
        )
    }

    /**
     * @description 创建项目
     * @param {object} form 
     * @param {string} form.name 项目名称
     * @param {number} form.type 项目类型
     */
    async insert(form) {
        return await this.request(
            `POST`,
            this.merge(this.baseURL,`/project`),
            {data:form}
        )
    }

    /**
     * @description 获取项目数据
     * @param {string} key
     */
    async projectData(key) {
        return new Promise((resolve,reject) => {
            resolve([{
                key: `comple`,
                desc: `复杂的数据`,
                type: `object`,
                value: [{
                    key: `name`,
                    type: `string`,
                    value: `复杂数据`
                },{
                    key: `type`,
                    type: `number`,
                    value: 2
                },{
                    key: `hobby`,
                    type: `array`,
                    value: [{
                        type: 'object',
                        value: [{
                            key: `label`,
                            type: `string`,
                            value: `电影`
                        },{
                            key: `value`,
                            type: `number`,
                            value: 1023
                        },{
                            key: `topic`,
                            type: `array`,
                            value: [{
                                type: `string`,
                                value: `复仇者联盟`
                            },{
                                type: `string`,
                                value: `雷神3`
                            }]
                        }]
                    },{
                        type: 'object',
                        value: [{
                            key: `label`,
                            type: `string`,
                            value: `跑步`
                        },{
                            key: `value`,
                            type: `number`,
                            value: 1025
                        },{
                            key: `topic`,
                            type: `array`,
                            value: [{
                                type: `string`,
                                value: `爱跑圈`
                            },{
                                type: `string`,
                                value: `晨跑圈`
                            }]
                        }]
                    }]
                }]
            },{
                key: `name`,
                desc: `名称`,
                type: `string`,
                value: `design`
            },{
                key: `age`,
                desc: `年纪`,
                type: `number`,
                value: 100
            },{
                key: `city`,
                desc: `城市`,
                type: `array`,
                value: [{
                    type: `object`,
                    value: [{
                        key: `name`,
                        type: `string`,
                        value: `北京`
                    },{
                        key: `code`,
                        type: `number`,
                        value: 1000
                    }]
                },{
                    type: `object`,
                    value: [{
                        key: `name`,
                        type: `string`,
                        value: `深圳`
                    },{
                        key: `code`,
                        type: `number`,
                        value: 10001
                    }]
                }]
            },{
                key: `email`,
                desc: `邮件`,
                type: `array`,
                value: [{
                    type: `string`,
                    value: `QQ邮箱`
                },{
                    type: `string`,
                    value: `新浪邮箱`
                }]
            }])
        })
    }
}