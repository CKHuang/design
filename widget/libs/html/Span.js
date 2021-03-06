import Widget from '../../base/Widget'

export default class Span extends Widget {
    constructor(opts = {
        text: `文本`
    }) {
        super(
            'span',
            'html',
            'span'
        )
        this.domProps = {
            innerHTML: opts.text
        }
    }
}