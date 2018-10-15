import Widget from '../../base/Widget'

export default class Span extends Widget {
    constructor(innerHTML = `文本行`) {
        super(
            'p',
            'html',
            'p'
        )
        this.domProps = {
            innerHTML: innerHTML
        }
    }
}