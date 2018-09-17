import StatusError from './StatusError'

export default class Logic {

    constructor() {}


    /**
     * 执行某个逻辑
     * @param {string} opUser  逻辑操作的用户
     * @param {string} method  要执行的逻辑方法名
     * @param {any}    args    传递给逻辑方法的参数
     */
    async invoke(opUser,method,...args) {
        try {
            if (typeof this[method] == 'function') {
               return await this[method].call(this,opUser,...args)
            } else {
                throw new StatusError(
                    `no ${method} logic`,
                    StatusError.HTTP_INTERNAL_SERVER_ERROR,
                    `服务逻辑接口调用不存在的出错`
                )
            }
        } catch (error) {
            throw StatusError.isStatusError(error) 
                    ? error
                    : StatusError.toStatusError(error);
        }
    }
}