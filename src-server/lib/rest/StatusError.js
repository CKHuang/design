export default class StatusError extends Error {

    static HTTP_OK = '200';
    static HTTP_NO_CONTENT = '204';
    static HTTP_BAD_REQUEST = '400';
    static HTTP_UNAUTHORIZED = '403';
    static HTTP_FORBIDDEN = '403';
    static HTTP_NOT_FOUND = '404';
    static HTTP_INTERNAL_SERVER_ERROR = '500';
    static HTTP_NOT_IMPLEMENTED = '501';


    /**
     * 带有状态信息的错误
     * @param {string} message Error对象的信息
     * @param {string} status 状态
     * @param {string} webMessage 状态码的提示信息，针对前端限制
     */
    constructor(message,status,webMessage = null) {
        
        super(message);
        this.status = status;
        this.type = 'StatusError';
        this.webMessage = webMessage 
                            ? webMessage 
                            : Object.keys(StatusError).find(key => StatusError[key] == this.status); 
        Object.setPrototypeOf(this, StatusError.prototype);
        this.name = this.constructor.name;
    }


    /**
     * 转化成StatusError
     * @param {Error} error 各种错误的对象
     * @param {string} stauts 
     */
    static toStatusError(
        error,
        status = StatusError.HTTP_INTERNAL_SERVER_ERROR,
        webMessage = null
    ) {
        const strObj = {}
        console.log('-->errpr',error);
        if (typeof error == 'object') {
            const fields = Object.getOwnPropertyNames(error);
            fields.forEach((field) => {
                strObj[field] = error[field]
            })
        } else {
            strObj['message'] = error
        }
        return new StatusError(
            JSON.stringify(strObj),
            status,
            webMessage
        )
    }


    /**
     * 判断是否是StatusError
     * @param {Error} error 
     */
    static isStatusError(error) {
        return error instanceof StatusError
    }
}