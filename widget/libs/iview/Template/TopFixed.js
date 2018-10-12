import Widget from '../../../base/Widget'
import Span from '../../html/Span'
import layout from '../Layout'
import nav from '../Nav'

export default () => {
    const span = new Span(),
          _layout = new layout.Layout(),
          _header = new layout.Header(),
          _content = new layout.Content(),
          _footer = new layout.Footer(),
          _menu = new nav.Menu(),
          _menuItem = new nav.MenuItem(),
          _menuItemSpan = new Span();
          _menuItem.children = [_menuItemSpan.config]
          _menu.children = [
              _menuItem.config
          ]
          _header.children = [
              _menu.config
          ]
          _content.style = {
              "marginTop": `20px`,
              "marginRight": `88px`,
              "marginLeft": `88px`,
              "marginBottom": `20px`,
              "background": `#fff`,
              "height": `500px` 
          }
          _content.children = [span.config]

    
    _layout.children = [
        _header.config,
        _content.config,
        _footer.config
    ]

    return _layout
}
