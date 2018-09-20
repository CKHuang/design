import Button from './Button'
import Card from './Card'
import Menu from './Menu'
import Layout from './Layout'
import LayoutTemplate from './LayoutTemplate'
import './reset.css'
import Tabs from './Tabs';
import Form from './Form'

export default {
    name: `iview`,
    version: `3.0.0`,
    description: `iview的组件`,
    widgetGroups: [{
        label: `基础`,
        widgets: [].concat(
            Button
        )
    }
    // {
    //     label: `布局`,
    //     widgets: [].concat(
    //         Layout
    //     )
    // }
    ,{
        label: `布局模版`,
        widgets: [].concat(
            LayoutTemplate
        )
    },{
        label: `容器`,
        widgets: [].concat(
            Card,
            Tabs
        )
    },{
        label: `导航`,
        widgets: [].concat(
            Menu
        )
    },{
        label: `表单`,
        widgets: [].concat(
            Form
        )
    }]
}