export default {
    /**
     * @description input.props.type
     * @param {string} output 输入类型,option表示select用的参数
     */
    types(
        output = 'option'
    ) {
        const types = [
            {value:`text`,label:`text`},
            {value:`password`,label:`password`},
            {value:`textarea`,label:`textarea`},
            {value:`url`,label:`url`},
            {value:`email`,label:`email`},
            {value:`date`,label:`date`}
        ];
        if (output == 'option') {
            return types;
        }
    }
}