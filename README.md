- Project
    - Component
        - name ( render 使用 )
        - props
        - class
        - style
        - events
    - Module
        - name ( render 使用，唯一 )
        - props
        - class
        - style
        - events
        - childrens
    - Config 配置
    - Util 工具
    - Page
        - route
        - name

- 界面
    - 工具栏(toolbar)
        - 全屏编辑
        - 预览
        - 保存
    - 画布(canvas)
    - 页面列表(pages)
        - 组件树(component tree)

    - 属性栏目(props)
    - 事件栏目(events)
    - 控件栏




```typescript
interface IStyle {
    paddingLeft: number,
    paddingRight: number,
    paddingTop: number,
    paddingBottom: number,
    marginLeft: number,
    marginRight: number,
    marginBottom: number,
    marginTop: number
}


/**
 * 类型
 */
enum Type {

}

/**
 * 大小的配置
 */
enum Size {
    large,
    small,
    default
}

/**
 * 可选的icon类型
 */
enum Icon {
    ios-add,
    md-add,
    ios-add-circle,
    ...
}

/**
 * 属性编辑器的控件类型
 */
enum Control {
    Select,
    Input,
    Switch,
    ColorPicker
}

/**
 * 属性项的编辑
 */
interface IPropItem {
    control: Control,

}

class PropItem extends IPropItem {

}


/**
 * Component配置项
 */
interface IComponent {

}

/**
 * 组件渲染配置
 */
const iviewComponent = {
    Button: {
        props: {
            type,
            ghost,
            size,
            shape,
            long,
            html-type,
            disabled,
            loading,
            icon,
            custom-icon
            to,
            replace,
            target
        },
        events: {
            click
        }
    },
    ButtonGroup: {
        ...
    }
}


/**
 * 部件
 */
interface IComponent<R,T> {
    tag: string,  // 渲染的标签名称
    name: string,  // 名称，同时用做渲染，例如iview.Button
    props: T,
    style: IStyle, // 样式
    classes: string[],
    on: {[key:string]:Function}
}
```
