import axios from 'axios'

export default class Http {

    /**
     * Rest以资源为单位拼接url发送请求
     * @param {string} name 数据模型的名称
     */
    constructor() {
        this.name = name;
    }
    

    /**
     * 将baseUrl和path合并在一起
     * @param {string} baseURL 
     * @param {string} path 
     */
    merge(baseURL,path) {
        return `${baseURL}${path}`
    }

    /**
     * 跳转到登录页面
     */
    toLogin() {
        location.href = `http://passport.oa.com/modules/passport/signin.ashx?url=${location.href}`
    }

    /**
     * 发起ajax请求
     * @param {stirng} method 请求的方法
     * @param {string} url 请求的url
     * @param {object} opts 请求的自定义数据
     * @param {object} opts.headers 请求的头部自定义
     * @param {object} opts.params 请求的url参数，会自动解析拼接到url
     * @param {object} opts.data 请求的data数据，对于post请求
     * @param {number} opts.timeout 请求超时时间，默认是5000
     * @param {string} opts.responseType 返回类型，默认是json
     */
    async request (
        method,
        url,
        opts = {
            headers:{},
            params:{},
            data:{},
            timeout: 5000,
            responseType: 'json'
        }
    ) {
        return new Promise((resolve,reject) => {
            if (!opts.headers) {
                opts.headers = {}
            }
            opts.headers['X-Requested-With'] = `XMLHttpRequest`
            axios({
                method: method,
                url: url,
                headers: opts.headers,
                params: opts.params,
                data: opts.data,
                timeout: opts.timeout,
                responseType: opts.responseType
            }).then((response) => {
                const httpStatus = response.status;
                const httpBody = response.data;
                if (httpStatus == 200) {
                    resolve(httpBody.data);
                } else {
                    this.errorHandler(
                        response,
                        reject
                    )
                }
            }).catch((error) => {
                this.errorHandler(
                    error.response,
                    reject
                )
            })
        });
    }

    errorHandler(response,reject) {
        const httpStatus = response.status;
        const httpBody = response.data;
        if (httpStatus == 401) {
            this.toLogin()
        } else {
            reject(httpBody)
        }
    }


    /**
     * 获取列表数据
     * @param {string} url 请求的url
     * @param {object} opts 可选参数
     * @param {object} opts.filter 过滤的参数
     * @param {number} opts.page 请求的页码
     */
    list(url,opts = {
        filter: {},
        page: 1
    }) {
        const params = {};
        for ( let i in opts.filter ) {
            if (opts.filter !== null) {
                params[i] = opts.filter[i]
            }
        }
        params.page = opts.page
        return this.request(
            `GET`,
            url,
            {params}
        )
    }
}