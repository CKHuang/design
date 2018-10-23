import util from '../../util'
import schema from './schema'

export default {
    /**
     * @param {object} opts
     * @param {string} opts.message
     * @param {string} opts.trigger
     */
    required(opts) {
        return util.extend({
            required: true,
            message: `该字段不能为空`,
            trigger: `blur`
        },opts)
    },

    project: {

        name(opts = {}) {
            return util.extend({
                required: true,
                type: 'string',
                pattern: schema.enNumComb({len:[1,40]}),
                message: `项目名称必须是英文开头，英文以及数字的组合`,
                trigger: `blur`
            },opts)
        },

        desc(opts = {}) {
            return util.extend({
                required: true,
                type: `string`,
                pattern: schema.article({len:[1,100]}),
                message: `项目说明只能填写中文、英文、下划线`,
                trigger: `blur`
            })
        }
    }
}