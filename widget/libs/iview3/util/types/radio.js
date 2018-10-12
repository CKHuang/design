export default {

    radioGroupType(
        output = 'option'
    ) {
        const type = [
            {value:``,label:`默认`},
            {value:`button`,label:`button`}
        ]
        if (output = 'option') {
            return type
        }
    }
}