import layoutTmpl from './Template/layout'
import formTmpl from './Template/form'
import layout from './Layout'
import base from './Base'
import nav from './Nav'
import form from './Form'

export default {
    name: `iview`,
    version: `2.0.0`,
    description: `iview`,
    widgetGroups: [{
        label: `布局模版`,
        widgets: [].concat(
            layoutTmpl.TopFixed()
        )
    },{
        label: `表单模版`,
        widgets: [].concat(
            formTmpl.Personal()
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
    },{
        label: `基础`,
        widgets: [].concat(
            new base.Button().getConfig()
        )
    },{
        label: `表单`,
        widgets: [].concat(
            new form.Input().getConfig(),
            new form.Radio().getConfig(),
            new form.RadioGroup().getConfig(),
            new form.Checkbox().getConfig(),
            new form.CheckboxGroup().getConfig(),
            new form.Switch().getConfig(),
            new form.Select().getConfig(),
            new form.Option().getConfig(),
            new form.Slider().getConfig(),
            new form.DatePicker().getConfig(),
            new form.TimePicker().getConfig(),
            new form.InputNumber().getConfig(),
            new form.Rate().getConfig(),
            new form.Form().getConfig(),
            new form.FormItem().getConfig()
        )
    }]
}