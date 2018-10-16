import template from '../../../../base/template'
import form from '../../Form'
import Span from '../../../html/Span'
import base from '../../Base'

const Form = form.Form,
      FormItem = form.FormItem,
      Input = form.Input,
      DatePicker = form.DatePicker,
      TimePicker = form.TimePicker,
      RadioGroup = form.RadioGroup,
      Radio = form.Radio,
      Checkbox = form.Checkbox,
      CheckboxGroup = form.CheckboxGroup,
      Button = base.Button;

export default () => {

    const nodetree = {
        tag: Form,
        opts: {description:`个人信息`},
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
                tag: Span,
                opts: {
                    'text': `-`
                },
                properties: {
                    'style': {
                        'paddingLeft': '10px',
                        'paddingRight': '10px'
                    }
                }
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
                opts: {radios: []},
                children: [{
                    tag: Radio,
                    properties: {
                        'props': {
                            'label': 'boy'
                        }
                        
                    },
                    opts: {'text':`男`}
                },{
                    tag: Radio,
                    properties: {
                        'props': {
                            'label': 'girl'
                        }
                        
                    },
                    opts: {'text':`女`}
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
                opts: {checkboxs: []},
                children: [{
                    tag: Checkbox,
                    opts: {text:`美食`},
                    properties: {
                        'props': {
                            'label': `food`
                        }
                    }
                },{
                    tag: Checkbox,
                    opts: {text:`跑步`},
                    properties: {
                        'props': {
                            'label': 'run'
                        }
                    }
                },{
                    tag: Checkbox,
                    opts: {text:`电影`},
                    properties: {
                        'props': {
                            'label': 'movie'
                        }
                    }
                },{
                    tag: Checkbox,
                    opts: {text:`摄影`},
                    properties: {
                        'props': {
                            'label': 'photo'
                        }
                    }
                }]
            }]
        },{
            tag: FormItem,
            children: [{
                tag: Button,
                opts: {text:`提交`},
                properties: {
                    'props': {
                        'type': 'primary'
                    }
                }
            },{
                tag: Button,
                opts: {'text':`重置`},
                properties: {
                    'props': {
                        'type': 'default'
                    },
                    'style': {
                        'marginLeft': '8px'
                    }
                }
            }]
        }]
    }

    return template(nodetree)
}