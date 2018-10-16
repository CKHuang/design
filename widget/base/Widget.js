import controls from './controls'

export default class Widget {
    constructor(
        tag = ``,
        lib = `html`,
        description = `描述`,
        propsControl = {},
        children = []
    ) {
        this.tag = tag;
        this.lib = lib;
        this.description = description;
        this.propsControl = propsControl;
        this.children = children;
        this.domProps = {};
        this.props = {}
        this.style = {}
        this.initCommonControl();
    }

    initCommonControl() {
        this.styleControl = {
            "marginTop": controls.Input(`外边距(顶)`),
            "marginRight": controls.Input(`外边距(右)`),
            "marginBottom": controls.Input(`外边距(底)`),
            "marginLeft": controls.Input(`外边距(左)`),
            "paddingTop": controls.Input(`内边距(顶)`),
            "paddingRight": controls.Input(`内边距(右)`),
            "paddingBottom": controls.Input(`内边距(底)`),
            "paddingLeft": controls.Input(`内边距(左)`),
            "float": controls.Select(`浮动`,{
                options: [
                    {value:`left`,label:`左`},
                    {value:`right`,label:`右`}
                ]
            }),
            "position": controls.Select(`位置`,{
                options: [
                    {value:`relative`,label:`relative`},
                    {value:`fixed`,label:`fixed`},
                    {value:`absolute`,label:`absolute`}
                ]
            }),
            "display": controls.Select(`显示`,{
                options: [
                    {value:`none`,label:`none`},
                    {value:`block`,label:`block`},
                    {value:`flex`,label:`flex`},
                    {value:`inline-block`,label:`inline-block`}
                ]
            }),
            "flex": controls.Select(`flex`,{
                options: [
                    {value:`none`,label:`none`},
                    {value:`auto`,label:`auto`}
                ]
            }),
            "top": controls.Input(`偏移(顶)`),
            "left": controls.Input(`偏移(左)`),
            "right": controls.Input(`偏移(右)`),
            "bottom": controls.Input(`偏移(底)`),
            "width": controls.Input(`宽度`,{suffix:'px'}),
            "minWidth": controls.Input(`宽度(最小)`),
            "maxWidth": controls.Input(`宽度(最大)`),
            "height": controls.Input(`高度`,{suffix:'px'}),
            "minHeight": controls.Input(`高度(最小)`),
            "maxHeight": controls.Input(`高度(最大)`),
            "background": controls.ColorPicker(`背景`),
            "border": controls.Input(`边框`),
            "fontSize": controls.InputNumber(`大小(字)`,{
                suffix: 'px'
            }),
            "fontWeight": controls.Input(`粗细(字)`),
            "color": controls.ColorPicker(`颜色(字)`),
            "lineHeight": controls.Input(`行高(字)`),
            "textAlign": controls.Select(`对齐(字)`,{
                options: [
                    {value:`left`,label:`左`},
                    {value:`center`,label:`中`},
                    {value:`right`,label:`右`}
                ]
            }),
            "boxShadow": controls.Input(`阴影`)
        }
        this.domPropsControl = {
            "innerHTML": controls.Input(`innerHTML`)
        }
    }

    buildConfig(controls,defaultValues) {
        const config = {};
        for ( let i in controls) {
            config[i] = {}
            config[i].editControl = controls[i]
            if ( typeof defaultValues[i] !== 'undefined') {
                config[i].default = defaultValues[i]
            }
        }
       return config;
    }
    
  
    properties() {
        return {
            props: this.buildConfig(
                this.propsControl,
                this.props
            ),
            style: this.buildConfig(
                this.styleControl,
                this.style
            ),
            domProps: this.buildConfig(
                this.domPropsControl,
                this.domProps
            )
        }
    }

    getConfig() {
        return {
            tag: this.tag,
            lib: this.lib,
            description: this.description,
            properties: this.properties(),
            children: this.children
        } 
    }
}