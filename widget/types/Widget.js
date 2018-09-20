import Control from './Control'

/**
 * 特殊标签不能被占用
 */
export default {
    /**
     * 字符串标签
     */
    Text(
        label = `文案`, 
        defValue = `文案`
    ){
        return {
            tag: `Text`,
            lib: `HTML`,
            properties: {
                word: {
                    editControl: {
                        label: label,
                        control: Control.Input
                    }
                },
                default: defValue
            },
            render(h) {

            }
        }
    }
}