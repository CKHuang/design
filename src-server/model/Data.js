import Mysql from '../lib/rest/model/Mysql'
import config from '../../config/database'

export default class Data extends Mysql {
    
    constructor(...args) {
        super(
            config.db_design,
            `t_data`,
            `id`
        )
    }

    insertSQL(projectKey, inserted = {'JSON_content':[]}) {
        inserted =  typeof inserted == 'function' ? inserted() : inserted;
        inserted.project_key = projectKey
        return this.sql()
                .insert(this.table)
                .set(this._formatSet(inserted))
                .toString()
    }
}