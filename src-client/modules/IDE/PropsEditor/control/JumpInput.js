const Options = (h,options) => {
    const render = [];
    options.forEach((option,index) => {
        render.push(h(`Option`,{
            props: {
                key: index,
                value: option.router_path
            }
        },[option.name]))
    })
    return render;
}

export default (
    h,
    {value,fieldName,propsGroup,editorControl,nodeEditing},
    ctx
) => {
    const arg = editorControl.arguments,
          pageList = ctx.parent.pageList,
          pageRoutes = [];
    pageList.forEach((item) => {
        pageRoutes.push(item.router_path)
    })
    return h(`AutoComplete`,{
        props: {
            value: value,
            size: `small`,
            transfer: true,
            "filter-method": (value,option) => {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
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
    },Options(h,pageList))
}