import Project from './Project'
import Http from '../libs/Http'
import Data from './Data.js'

const http = new Http();

export default {
    /**
     * @description 处理错误提示
     */
    showErrorMessage: (error,vnode) => {
        return http.showErrorMessage(error,(message) => {
            vnode.$Message.error(`${message.message}[${message.subMessage}]`);
        })
    },
    project: new Project(),
    data: new Data()
}