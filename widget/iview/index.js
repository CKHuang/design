import grid from './grid'
import layout from './layout'
import card from './card'
import input from './input'
import radio from './radio'

export default {
    name: `iview`,
    version: `3.0.0`,
    description: `iview的组件`,
    widgetGroups: [{
        label: `布局`,
        widgets: [].concat(
            grid,
            layout,
            card
        )
    },{
        label: `表单`,
        widgets: [].concat(
            input,
            radio
        )
    }]
}