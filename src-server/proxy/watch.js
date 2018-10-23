import fs from 'fs'
import path from 'path'

const requireUnCache = require('require-uncached')

const watchRoot = path.resolve(__dirname,'../../projects');

let updateCallback = (effective) => {}

const main = () => {
    if (!fs.existsSync(watchRoot)) {
        return ;
    }
    const dirs = fs.readdirSync(watchRoot),
          effective = [];
    dirs.forEach((dir) => {
        const appFilePath = path.resolve(watchRoot,`./${dir}/app.js`);
        if (fs.existsSync(appFilePath)) {
            try {
                const app = requireUnCache(appFilePath);
                effective.push({
                    key: dir,
                    app: app.callback(),
                    time: Date.now()
                })
            } catch (error) {
                throw error
            } 
        }
    })
    updateCallback(effective)
}

export default (onUpdateCallback) => {
    updateCallback = onUpdateCallback;
    setInterval(main,5000)
}