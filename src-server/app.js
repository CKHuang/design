import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import staticCache from 'koa-static-cache'
import cors from 'koa-cors'
import auth from './middleware/auth'
import parameter from './middleware/parameter'
import routes from './routes'
import config from '../config/app'
import proxy from './proxy'
import path from 'path'

const app = new Koa();

app.use(proxy());

app.use(staticCache({
    dir: path.join(__dirname,'../dist'),
    prefix: `/web/dist`
}))

app.use(cors());

app.use(parameter());

app.use(auth());

app.use(bodyParser());

routes(app);

app.on(`error`,() => {
    console.log(`server error`)
})

app.listen(config.server.port,config.server.host, async () => {
    console.log(`[server run] sertver run at, http://${config.server.host}:${config.server.port}`)
})