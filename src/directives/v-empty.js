/**
 * @desc 空状态指令 v-empty
 * 使用该指令可以显示缺省的空状态。可以传入默认图片（可选，默认无图片）、默认文字内容（可选，默认为暂无数据）、以及标示是否显示空状态（必选）。
 */
export default {
  install(Vue, { name = 'empty', image } = {}) {
    Vue.directive(name, {
      update(el, binding, vnode) {
        if (binding.value.visible && !_isNil(el.lastChild)) {
          // 防止指令所在的组件多次触发渲染导致多次绘制同一种状态的节点元素
          return;
        }
        if (!binding.value.visible && _isNil(el.lastChild)) {
          return;
        }
        el.style.position = el.style.position || 'relative';
        const { offsetHeight, offsetWidth } = el;
        const { visible, content, img, top } = binding.value;
        const defaultStyle =
          'position:absolute;top:0;left:0;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;';
        if (!_isNil(top)) {
          el.style.top = top;
        }
        let imgVNode = null;
        const Empty = Vue.extend({
          render(h) {
            if (!_isNil(image) && _isNil(img)) {
              imgVNode = h(
                'img',
                { attrs: { src: image, height: '100%', width: '100%' } },
                []
              );
            }
            if (!_isNil(img)) {
              imgVNode = h(
                'img',
                { attrs: { src: img, height: '100%', width: '100%' } },
                []
              );
            }
            return h(
              'div',
              {
                style: `height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}`
              },
              [
                h('div', { style: 'text-align:center' }, [
                  h('div', {}, [imgVNode]),
                  h('div', { style: 'margin-top: 5px;letter-spacing:2px' }, [
                    content || '暂无数据'
                  ])
                ])
              ]
            );
          }
        });
        const component = new Empty().$mount().$el;
        if (visible) {
          el.appendChild(component);
        } else {
          el.removeChild(el.lastChild);
        }
      }
    });
  }
};
