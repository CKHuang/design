import types from '../types'
import span from './span'

export default {
    name: `html`,
    version: `5.0.0`,
    description: `原生HTML`,
    widgetGroups: [{
        label: `基础`,
        widgets: [].concat(
            span
        )
    }]
}