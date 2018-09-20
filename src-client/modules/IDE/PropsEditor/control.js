import Input from './control/Input'
import Select from './control/Select'
import Switch from './control/Switch'
import InputNumber from './control/InputNumber'

const Controls = {
    Input,
    Select,
    Switch,
    InputNumber
}


/**
 * @description 属性编辑控件
 * @prop {any} value
 * @prop {string} propsGroup 属性组的名称
 * @prop {string} fieldName 字段名
 * @prop {WidgetConfig} editorControl 控件编辑配置
 * @prop {Node} nodeEditing 正在编辑的节点
 */
export default {
    name: `IDEPropsEditorControl`,
    functional: true,
    props: {
        value: {
            type: String | Number | Array,
            default: ``
        },
        propsGroup: {
            type: String,
            default: ``
        },
        fieldName: {
            type: String,
            default: ``
        },
        editorControl: {
            type: String | Number | Array | Object,
            default: null
        },
        nodeEditing: {
            type: String | Number | Array | Object,
            default: null
        }
    },
    render(h,ctx) {
        const control = ctx.props.editorControl.control;
        const render = Controls[control];
        console.log('-->control change',control,ctx.props);
        if ( typeof render == 'function' ) {
            return h(`div`,{
                "class": `ide-propseditor-control`
            },[
                h(`FormItem`,{
                    props: {
                        label: ctx.props.editorControl.label+`：`,
                        "label-width": 75
                    }
                },
                [
                    render(
                        h,
                        ctx.props,
                        ctx
                    )
                ]
                )
            ])
        } else {
            throw new Error(`PropsEditor render control error`);
        }  
    }
}