
const Options = (h,options) => {
    const render = [];
    options.forEach((option,index) => {
        render.push(h(`Option`,{
            props: {
                key: index,
                value: option.value
            }
        },[option.label]))
    });
    return render;
}

/**
 * @description 选择器控件的渲染函数
 * @param {object} ctrlProps 通过../control.js透传过来的
 */
export default (
    h,
    {value,fieldName,propsGroup,editorControl,nodeEditing},
    ctx
) => {
    return h(`Select`,{
        props: {
            value: value,
            size: `small`
        },
        on: {
            "on-change": (newValue) => {
                ctx.parent.handleChange(
                    propsGroup,
                    fieldName,
                    newValue
                )
            }
        }
    },Options(h,editorControl.arguments));
}