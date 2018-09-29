import Mysql from '../lib/rest/model/Mysql'
import config from '../../config/database'

export default class Project extends Mysql {
    
    constructor(...args) {
        super(
            config.db_design,
            `t_project`,
            `id`
        )
    }
}