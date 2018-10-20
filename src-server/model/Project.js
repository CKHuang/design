import Mysql from '../lib/rest/model/Mysql'
import config from '../../config/database'
import DataModel from './Data'

export default class Project extends Mysql {
    
    constructor(...args) {
        super(
            config.db_design,
            `t_project`,
            `id`
        )
        this.dataModel = new DataModel();
    }

    insertSQL(inserted) {
        return this.sql()
            .insert(this.table)
            .set(this._formatSet(inserted))
            .toString()
    }

    async insert(
        inserted
    ) {
        const dataSQL = this.dataModel.insertSQL(inserted.key),
              projSQL = this.insertSQL(inserted);
        return await this.transaction([projSQL,dataSQL]);
    }
}