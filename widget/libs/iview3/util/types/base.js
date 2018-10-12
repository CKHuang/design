export default {
    /**
     * 可选大小输出
     * @param {string} output 
     */
    size(
        output = 'option'
    ) {
        const size = [
            {value:`large`,label:`large`},
            {value:`default`,label:`default`},
            {value:`small`,label:`small`}
        ];
        if (output == 'option') {
            return size;
        }
    },


    placement(
        output = 'option'
    ) {
        const placement = [
            {value:`top`,label:`top`},
            {value:`top-start`,label:`top-start`},
            {value:`top-end`,label:`top-end`},
            {value:`bottom-start`,label:`bottom-start`},
            {value:`bottom-end`,label:`bottom-end`},
            {value:`left`,label:`left`},
            {value:`left-start`,label:`left-start`},
            {value:`left-end`,label:`left-end`},
            {value:`right`,label:`right`},
            {value:`right-start`,label:`right-start`},
            {value:`right-end`,label:`right-end`}
        ]
        if (output == 'option') {
            return placement
        }
    },


    position(
        output = 'option'
    ) {
        const position = [
            {value:`left`,label:`left`},
            {value:`right`,label:`right`},
            {value:`top`,label:`top`}
        ]
        if (output == 'option') {
            return position
        }
    }
}