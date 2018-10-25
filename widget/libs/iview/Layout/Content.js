import Widget from '../../../base/Widget'

export default class Content extends Widget {
    constructor() {
        super(
            `Content`,
            `iview`,
            `Content`
        )
        this.style = {
            "minHeight": '10px',
            "marginBottom": '20px',
            "marginTop": '20px'
        }
    }
}