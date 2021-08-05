/**
 * @desc 埋点混入
 */
import _last from 'lodash/last';

const aplusMixin = {
  watch: {
    // 监听路由改变
    $route: {
      handler(to, from) {
        if (!_isEmpty(to.matched)) {
          const currentRouter = _last(to.matched); // 匹配到当前页面对应的路由地址
          console.log('currentRouter', currentRouter);
          window.MyAplus.sendPv({
            page_id: currentRouter.name,
            page_name: _get(currentRouter.meta, 'title', ''),
            page_url: currentRouter.path
          }); // 发送一个 PV 的埋点日志
        }
      },
      immediate: true
    }
  },
  created: function() {},
  methods: {}
};
export default aplusMixin;
