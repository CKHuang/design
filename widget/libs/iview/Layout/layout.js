import Widget from '../../../base/Widget'

export default class Layout extends Widget {
    constructor(opts = {description: 'Layout'}) {
        super(
            `Layout`,
            `iview`,
            opts.description
        )
    }
}