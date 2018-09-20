/**
 * @description 输入框
 * @param {object} ctrlProps 通过../control.js透传过来的
 */
export default (
    h,
    {value,fieldName,propsGroup,editorControl,nodeEditing},
    ctx
) => {
    console.log('->render input',value)
    return h(`Input`,{
        props: {
            value: value,
            size: `small`
        },
        on: {
            "input": (newValue) => {
                ctx.parent.handleChange(
                    propsGroup,
                    fieldName,
                    newValue
                )
            }
        }
    })
}