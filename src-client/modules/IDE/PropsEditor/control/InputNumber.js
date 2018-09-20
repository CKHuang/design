
/**
 * @description 开关
 * @param {object} ctrlProps 通过../control.js透传过来的
 */
export default (
    h,
    {value,fieldName,propsGroup,editorControl,nodeEditing},
    ctx
) => {
    const argus = editorControl.argus;
    const props = {
        value: value,
        size: `small`
    }
    for ( let i in argus ) {
        props[i] = argus[i];
    }
    return h(`InputNumber`,{
        props: props,
        on: {
            "on-change": (newValue) => {
                ctx.parent.handleChange(
                    propsGroup,
                    fieldName,
                    newValue
                )
            }
        }
    })
}