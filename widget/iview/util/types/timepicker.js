export default {
    type(
        output = 'option'
    ) {
        const type = [
            {value:`timerange`,label:`timerange`},
            {value:`time`,label:`time`}
        ]
        if (output == 'option') {
            return type;
        }
    }
}