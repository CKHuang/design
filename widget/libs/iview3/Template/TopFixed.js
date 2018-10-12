import layout from '../Layout/layout'
import content from '../Layout/content'
import header from '../Layout/header'
import footer from '../Layout/footer'

const TopFixed = () => {
    return layout.Layout({
        description: `顶部固定布局`,
        children: [
            header.Header({
                props: {
                    style: {
                        position: 'fixed',
                        width: '100%'
                    }
                },
                children: []
            }),
            content.Content({
                props: {
                    style: {
                        margin: '88px 20px 0',
                        background: `#fff`,
                        minHeight: '500px'
                    }
                }
            }),
            footer.Footer()
        ]
    })
}

export default TopFixed