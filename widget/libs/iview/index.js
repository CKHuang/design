import template from './Template'
import layout from './Layout'
import nav from './Nav'

export default {
    name: `iview`,
    version: `2.0.0`,
    description: `iview`,
    widgetGroups: [{
        label: `布局模版`,
        widgets: [].concat(
            template.TopFixed()
        )
    },{
        label: `布局`,
        widgets: [].concat(
            new layout.Layout().getConfig(),
            new layout.Header().getConfig(),
            new layout.Content().getConfig(),
            new layout.Sider().getConfig()
        )
    },{
        label: `导航`,
        widgets: [].concat(
            new nav.IMenu().getConfig(),
            new nav.IMenuItem().getConfig()
        )
    }]
}