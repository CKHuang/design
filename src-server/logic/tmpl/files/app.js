const Koa = require('koa');
const KoaRouter = require('koa-router');
const staticCache = require('koa-static-cache');
const fs = require('fs');
const path = require('path');

const app = new Koa();

const router = new KoaRouter();

const indexFilePath = path.resolve(__dirname,`./index_prod.html`);

let indexFileContent,
    file404Content = fs.readFileSync(
        path.resolve(__dirname,'./404.html')
    ).toString();

function getIndexFileContent(filePath) {
    if (indexFileContent) {
        return indexFileContent;
    } else {
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath)
        } else {
            return `Empty Page`
        }
    }
}

function responseIndex(ctx,next) {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = getIndexFileContent(indexFilePath);
    next();
}

app.use(staticCache(path.resolve(__dirname,'./dist'),{
    prefix: `/${projectKey}/dist`
}))

${routeContent}

app.use((ctx,next) => {
    next();
    if (ctx.status == 404) {
        ctx.type = 'text/html; charset=utf-8';
        ctx.body = file404Content;
    }
})

app.use(router.routes())
   .use(router.allowedMethods())

module.exports = app;




