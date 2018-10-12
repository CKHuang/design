
/**
 * @description 开关
 * @param {object} ctrlProps 通过../control.js透传过来的
 */
export default (
    h,
    {value,fieldName,propsGroup,editorControl,nodeEditing},
    ctx
) => {
    const arg = editorControl.arguments;
    
    const suffix = arg && arg.suffix ? arg.suffix : null,
          prefix = arg && arg.prefix ? arg.prefix : null;
    let _value = value;
    if (typeof _value == 'string') {
        suffix && (_value = _value.replace(suffix,''));
        prefix && (_value = _value.replace(prefix,''))
        _value = Number(_value)
    }
   
    const props = {
        value: _value || 0,
        size: `small`
    }
    return h(`InputNumber`,{
        props: props,
        on: {
            "on-change": (newValue) => {
                let _newValue = `${prefix?prefix:''}${newValue}${suffix?suffix:''}`;
                ctx.parent.handleChange(
                    propsGroup,
                    fieldName,
                    _newValue
                )
            }
        }
    })
}