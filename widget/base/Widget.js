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

    get domPropsControl() {
        return {
            "innerHTML": controls.Input(`innerHTML`)
        }
    }
    
    get styleControl() {
        return {
            "marginTop": controls.InputNumber(`外边距(顶)`,{suffix:`px`}),
            "marginRight": controls.InputNumber(`外边距(右)`,{suffix:`px`}),
            "marginBottom": controls.InputNumber(`外边距(底)`,{suffix:`px`}),
            "marginLeft": controls.InputNumber(`外边距(左)`,{suffix:`px`}),
            "paddingTop": controls.InputNumber(`内边距(顶)`,{suffix:`px`}),
            "paddingRight": controls.InputNumber(`内边距(右)`,{suffix:`px`}),
            "paddingBottom": controls.InputNumber(`内边距(底)`,{suffix:`px`}),
            "paddingLeft": controls.InputNumber(`内边距(左)`,{suffix:`px`}),
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
            "width": controls.InputNumber(`宽度`,{suffix:'px'}),
            "height": controls.InputNumber(`高度`,{suffix:'px'}),
            "background": controls.ColorPicker(`背景`),
            "border": controls.Input(`边框`),
            "fontSize": controls.InputNumber(`大小(字)`),
            "color": controls.ColorPicker(`颜色(字)`),
            "textAlign": controls.Select(`对齐(字)`,{
                options: [
                    {value:`left`,label:`左`},
                    {value:`center`,label:`中`},
                    {value:`right`,label:`右`}
                ]
            })
        }
    }

    get properties() {
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
    
    get config() {
        return {
            tag: this.tag,
            lib: this.lib,
            description: this.description,
            properties: this.properties,
            children: this.children
        }
    }
}