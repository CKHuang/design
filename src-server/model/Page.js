import Mysql from '../lib/rest/model/Mysql'
import config from '../../config/database'

export default class Page extends Mysql {
    
    constructor(...args) {
        super(
            config.db_design,
            `t_page`,
            `id`
        )
    }
}