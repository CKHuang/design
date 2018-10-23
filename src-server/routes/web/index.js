import router from '../../lib/rest/router'
import path from 'path'
import util from 'util'
import fs from 'fs'

const readFile = util.promisify(fs.readFile)

const webRoute = router({
    prefix: `/web`
},[{
    desc: `框架主页`,
    method: `GET`,
    path: `*`,
    action: async (ctx) => {
        ctx.body = await readFile(
            path.resolve(__dirname,`../../../dist/index_prod.html`),
            'utf8'
        )
    }
}])

export default [
    webRoute
]