const params = {
    len(len) {
        return len
    }
}

export default {
    /**
     * @description 英文和数字的组合
     */
    enNumComb: (opt = {len: [1,40]}) => {
       const len = params.len(opt.len);
       return new RegExp(`^[a-zA-Z][a-zA-Z0-9_]{${len[0]},${len[1]}}$`) 
    },
    /**
     * @description 合法内容文章
     */
    article: (opt = {len: [1,40]}) => {
        const len = params.len(opt.len);
       return new RegExp(`^[a-zA-Z0-9_\u4e00-\u9fa5]{${len[0]},${len[1]}}$`) 
    }

    
}