export default {
    type(
        output = 'option'
    ) {
        const type = [
            {value:`date`,label:`date`},
            {value:`daterange`,label:`daterange`},
            {value:`datetime`,label:`datetime`},
            {value:`datetimerange`,label:`datetimerange`},
            {value:`year`,label:`year`},
            {value:`month`,label:`month`}
        ]
        if (output == 'option') {
            return type;
        }
    }
}