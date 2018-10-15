import template from '../../../../base/template'
import form from '../../Form'

const Form = form.Form,
      FormItem = form.FormItem,
      Input = form.Input,
      DatePicker = form.DatePicker,
      TimePicker = form.TimePicker,
      RadioGroup = form.RadioGroup,
      Radio = form.Radio,
      Checkbox = form.Checkbox,
      CheckboxGroup = form.CheckboxGroup;

export default () => {

    const nodetree = {
        tag: Form,
        description: `个人信息`,
        properties: {
            'props': {
                "label-position": 'right',
                'label-width': 90
            }
        },
        children: [{
            tag: FormItem,
            properties: {
                'props': {
                    "label": `姓名`,
                    "required": true
                }
            },
            children: [{
                tag: Input,
                properties: {
                    'props': {
                        "placeholder": '请输入姓名'
                    }
                }
            }]
        },{
            tag: FormItem,
            properties: {
                'props': {
                    "label": `电子邮件`,
                    "required": true
                }
            },
            children: [{
                tag: Input,
                properties: {
                    'props': {
                        "placeholder": '请输入电子邮件'
                    }
                }
            }]
        },{
            tag: FormItem,
            properties: {
                'props': {
                    "label": `出生日期`,
                    "required": true
                }
            },
            children: [{
                tag: DatePicker
            },{
                tag: TimePicker
            }]
        },{
            tag: FormItem,
            properties: {
                'props': {
                    'label': '性别',
                    "required": true
                }
            },
            children: [{
                tag: RadioGroup,
                opts: {radio: []},
                children: [{
                    tag: Radio
                },{
                    tag: Radio
                }]
            }]
        },{
            tag: FormItem,
            properties: {
                'props': {
                    'label': '爱好',
                    "required": true
                }
            },
            children: [{
                tag: CheckboxGroup,
                opts: {checkbox: []},
                children: [{
                    tag: Checkbox
                },{
                    tag: Checkbox
                }]
            }]
        }]
    }

    return template(nodetree)
}