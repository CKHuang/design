import Div from './Div'
import Span from './Span'

export default {
    name: `html`,
    version: `5.0.0`,
    description: `原生HTML`,
    widgetGroups: [{
        label: `基础`,
        widgets: [].concat(
            new Div().config,
            new Span().config
        )
    }]
}