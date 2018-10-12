import Widget from '../../../base/Widget'
import Span from '../../html/Span'
import layout from '../Layout'

export default () => {
    const span = new Span(),
          _layout = new layout.Layout().config,
          _header = new layout.Header().config,
          _content = new layout.Content().config,
          _footer = new layout.Footer().config;
          _content.style = {
              "marginTop": `88px`,
              "marginRight": `20px`,
              "marginLeft": `20px`,
              "background": `#fff`,
              "height": `500px` 
          }
          _content.children = [span]
    
    _layout.children = [
        _header,
        _content,
        _footer
    ]

    return _layout
}
