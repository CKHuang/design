const helper = {
    pageName(pageConfig) {
        return `Page${pageConfig.id.replace('page_','')}`
    }
}

export default {
    helper: helper,
    README(project){
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
    "dependencies": {
        "cross-env": "^5.2.0",
        "iview": "^3.0.0",
        "vue": "^2.5.2",
        "vue-router": "^3.0.1",
        "vuex": "^2.2.1"
    },
    "devDependencies":{
        "autoprefixer-loader": "^3.2.0",
        "babel": "^6.23.0",
        "babel-core": "^6.23.1",
        "babel-loader": "^7.1.2",
        "babel-plugin-transform-class-properties": "^6.24.1",
        "babel-plugin-transform-runtime": "^6.12.0",
        "babel-polyfill": "^6.26.0",
        "babel-preset-es2015": "^6.9.0",
        "babel-preset-latest-node": "^1.0.0",
        "babel-preset-stage-3": "^6.24.1",
        "babel-runtime": "^6.11.6",
        "css-loader": "^0.28.7",
        "eslint": "^3.12.2",
        "eslint-plugin-html": "^1.7.0",
        "extract-text-webpack-plugin": "^3.0.2",
        "file-loader": "^1.1.5",
        "hotnode": "0.0.8",
        "html-loader": "^0.5.1",
        "html-webpack-plugin": "^2.28.0",
        "iview-loader": "^1.0.0",
        "less": "^2.7.1",
        "less-loader": "^2.2.3",
        "style-loader": "^0.19.1",
        "url-loader": "^0.6.2",
        "vue-hot-reload-api": "^2.2.4",
        "vue-html-loader": "^1.2.3",
        "vue-loader": "^13.5.0",
        "vue-style-loader": "^3.0.3",
        "vue-template-compiler": "^2.5.16",
        "webpack": "^3.8.1",
        "webpack-dev-server": "^2.9.2",
        "webpack-merge": "^4.1.1"
    }
}`  
    },
    [`project.data.js`](projectDatasJson){
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
    routes(projectPages,project){
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
                component = helper.pageName(value);
            itemTmpl += `            path:"${path}",\r\n`;
            itemTmpl += `            name:"${name}",\r\n`;
            itemTmpl += `            component:${component}\r\n`
            items.push(itemTmpl)
            impr.push(`import ${component} from './Page/${component}'`)
        }
        exp += items.join(`        },{\r\n`);
        exp += `        }]\r\n`;
        exp += `    }]\r\n`;
        exp += '}'
        exp = impr.join(`\r\n`) + `\r\n\r\n` + exp;
        return exp;
    },
    [`main.js`]() {
        const exp = [
            `import Vue from 'vue'`,
            `import iView from 'iview'`,
            `import VueRouter from 'vue-router'`,
            `import routes from './routes'`,
            `import datas from './project.data.js'`,
            `import App from './App.vue'`,
            `import 'iview/dist/styles/iview.css'`,
            `\r`,
            `Vue.use(VueRouter);`,
            `Vue.use(iView);`,
            `Vue.use({`,
            `   install(Vue){`,
            `       Vue.prototype.datas = datas`,
            `   }`,
            `});`,
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
    [`App.vue`](){
        const exp = [
            `<template>`,
            `   <router-view></router-view>`,
            `</template>`,
            `<script>`,
            `   export default {`,
            `       name: "App"`,
            `   };`,
            `</script>`
        ];
        return exp.join(`\r\n`)
    },
    page(pageConfig){
        const template = this['page.template'](pageConfig.JSON_nodetree),
              script = this['page.script'](pageConfig);
        return [
            `${template}`,
            `\n`,
            `${script}`
        ].join(`\r\n`)
    },
    [`page.template`](nodetree) {
        const   topNodeTree = {
                    tag: `div`,
                    properties: {},
                    id: `nodetree_root`,
                    children: nodetree
                },
                _stack = [];
        const renderNode = (level,nodeConfig,children) => {
            const tag = nodeConfig.tag,
                  properties = nodeConfig.properties,
                  tabSpae = (lvl) => {
                      let  tabs = [],
                           tab = `    `;
                      while(lvl > 0) {
                          tabs.push(tab);
                          lvl--
                      }
                      return tabs.join(``);
                  };
            let childrenTmpl = ``;
            if (Array.isArray(children) && children.length > 0) {
                childrenTmpl = `${children.join(`\r\n`)}`
            }
            let exp = [
                `${tabSpae(level)}<${tag} data-lvl=${nodeConfig.level}>`,
                `${tabSpae(level)}</${tag}>`
            ]
            if (childrenTmpl != ``) {
                exp.splice(1,0,childrenTmpl)
            }
            return exp.join(`\r\n`);   
        }
        let level = 0;
        const pushStack = (node) => {
            if (node) {
                _stack.push(node);
                if (node.children && node.children.length > 0) {
                    node.children.forEach((childNode) => {
                        pushStack(childNode)
                    })
                }
            }
        }
        pushStack(topNodeTree);
        let _cache = [];
        while (_stack.length > 0) {
            const item = _stack.pop();
            if (item.children.length == 0) {
                _cache.push(
                    renderNode(item.level,item)
                )
                level++;
            } else if (item.children.length > 0) {
                const _children = _cache.splice(-item.children.length);
                const tnode = renderNode(item.level,item,_children.reverse());
                _cache.push(tnode)
            }
        }
        return [
            `<template>`,
            `   ${_cache[0]}`,
            `</template>`
        ].join(`\r\n`)
    },
    [`page.script`](pageConfig) {
        const pageName = helper.pageName(pageConfig)
        let exp = [
            '<script>',
            `    /**`,
            `     * @deprecated ${pageConfig.name}`,
            `     */`,
            `    export default {`,
            `        name:"${pageName}"`,
            `    }`,
            `</script>`
        ]
        return exp.join(`\r\n`)
    }
}