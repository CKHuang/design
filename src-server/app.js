import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import parameter from './middleware/parameter'
import routes from './routes'
import config from '../config/app'

const app = new Koa();

app.use(cors());

app.use(parameter());

app.use(bodyParser());

routes(app);

app.on(`error`,() => {
    console.log(`server error`)
})

app.listen(config.server.port,config.server.host, async () => {
    console.log(`[server run] sertver run at, http://${config.server.host}:${config.server.port}`)
})

// 简单抛出几个假的数据


console.log(`server restart`)