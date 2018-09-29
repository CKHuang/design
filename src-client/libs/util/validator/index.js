import util from '../../util'

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
    }
}