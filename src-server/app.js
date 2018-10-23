import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import auth from './middleware/auth'
import parameter from './middleware/parameter'
import routes from './routes'
import config from '../config/app'
import proxy from './proxy'

const app = new Koa();

app.use(async (ctx,next) => {
    await next();
    console.log('-->App.js',ctx.body)
})

app.use(proxy());

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