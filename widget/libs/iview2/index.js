import template from './Template'

export default {
    name: `iview`,
    version: `2.0.0`,
    description: `iview`,
    widgetGroups: [{
        label: `布局模版`,
        widgets: [].concat(
            template.TopFixed()
        )
    }]
}