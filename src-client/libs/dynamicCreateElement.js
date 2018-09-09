/**
 * 动态渲染添加组件
 */
import Vue from 'vue'

/**
 * 动态创建标签对象
 * @param {string} tag 标签名称
 * @param {object} data props、on等所有的属性配置
 * @return {VueComponent}
 */
export default (
    tag,
    data,
) => {
    const _data = data || {}
    const Instance = new Vue({
        methods: {
            append(parent) {
                parent.appendChild(this.$el);
            },
            destroy() {
                this.$destroy();
            }
        },
        render(h) {
            return h(tag,_data)
        }
    });
    const component = Instance.$mount();
    console.log('-->component',component)
    
    return component;
}