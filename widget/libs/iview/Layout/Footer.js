import Widget from '../../../base/Widget'

export default class Footer extends Widget {
    constructor() {
        super(
            `Footer`,
            `iview`,
            `Footer`
        )
        this.style = {
            "minHeight": '10px'
        }
    }
}