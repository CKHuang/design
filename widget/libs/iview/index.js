import template from './Template'
import layout from './Layout'
import nav from './nav'

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
            new layout.Layout().config,
            new layout.Header().config,
            new layout.Content().config,
            new layout.Sider().config
        )
    },{
        label: `导航`,
        widgets: [].concat(
            
            new nav.Menu().config,
            new nav.MenuItem().config
        )
    }]
}