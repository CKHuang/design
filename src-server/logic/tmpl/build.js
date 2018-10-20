export default {
    README: (project) => {
        return `# ${project.name}\r\n
### 项目信息\r\n
- 项目KEY：${project.key}
- 创建人：${project.creater}
- 创建时间：${project.create_time}`;
    },
    [`package.json`]: (project) => {
        return `{
    "name":"design-project-${project.key}",
    "version":"${Date.now()}",
    "description":"${project.name}",
    "author":{
        "name":"${project.creater}@tencent.com"
    },
    "homepage":"",
    "dependencies":{}
}`  
    },
    [`project.data.js`]: (projectDatasJson) => {
        let exp = `export default {\r\n`,
            items = [];
        for ( let i in projectDatasJson ) {
            let value = projectDatasJson[i];
            if (typeof value == 'object') {
                value = JSON.stringify(value)
            } else if (typeof value == 'string') {
                value = `\"${value}\"`
            }
            items.push(`    "${i}":${value}`)
        }
        exp += items.join(`,\r\n`)
        exp += '\r\n}'
        
        return exp;
    },
    routes: (projectPages,project) => {
        let impr = [];
        let exp = `export default {\r\n`,
            key = project.key;
            exp += `    routes: [{\r\n`;
            exp += `        path: "/",\r\n`;
            exp += `        name: "root",\r\n`;
            exp += `        component: Root,\r\n`;
            exp += `        children: [{\r\n`;
        let items = [];
        for ( let i in projectPages ) {
            let itemTmpl = ``,
                value = projectPages[i],
                path = `/${key}${value.router_path}`,
                name = `${value.router_name}`,
                component = `Page${value.id.replace('page_','')}`;
            itemTmpl += `            path:"${path}",\r\n`;
            itemTmpl += `            name:"${name}",\r\n`;
            itemTmpl += `            component:${component}\r\n`
            items.push(itemTmpl)
            impr.push(`import ${component} from './src/Page/${component}'`)
        }
        exp += items.join(`        },{\r\n`);
        exp += `        }]\r\n`;
        exp += `    }]\r\n`;
        exp += '}'
        exp = impr.join(`\r\n`) + `\r\n\r\n` + exp;
        return exp;
    },
    [`main.js`]: () => {
        const exp = [
            `import Vue from 'vue'`,
            `import iView from 'iview'`,
            `import VueRouter from 'vue-router'`,
            `import routes from './routes'`,
            `import App from './App.vue'`,
            `import 'iview/dist/styles/iview.css'`,
            `\r`,
            `Vue.use(VueRouter);`,
            `Vue.use(iView);`,
            `\r`,
            `const RouterConfig = {`,
            `   mode: 'history',`,
            `   routes: routes`,
            `};`,
            `\r`,
            `const router = new VueRouter(RouterConfig);`,
            `\r`,
            `new Vue({`,
            `   el: '#app',`,
            `   router: router,`,
            `   render: h => h(App)`,
            `});`
        ];
        return exp.join(`\r\n`)
    },
    [`App.vue`]: () => {

    }
}