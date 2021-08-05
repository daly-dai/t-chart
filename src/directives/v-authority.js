/**
 * @desc 权限指令
 * @example
 * v-action 是指令名称
 * add 是按钮的 code 编号
 * <el-button v-action:add type="primary">添加-指令</el-button>
 * remove 移除元素 hide 隐藏元素 disabled 禁用 （默认禁用）
 * <el-button v-action:add.remove type="primary">添加-指令</el-button>
 */
import _findLastIndex from 'lodash/findLastIndex';
import _findIndex from 'lodash/findIndex';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';

export default {
  install: function(Vue, options = {}) {
    Vue.directive('action', {
      // 被绑定元素插入父节点时调用
      inserted: function(el, binding, vNode) {
        const actionName = binding.arg;
        const oCurRoute = vNode.context.$route;
        const index = _findLastIndex(oCurRoute.matched, item => {
          return _has(item, 'meta.buttons');
        });
        const buttons = _get(oCurRoute.matched[index], 'meta.buttons', []);
        const buttonIndex = _findIndex(
          buttons,
          btn => _get(btn, 'code', btn.href) === actionName
        );
        if (buttonIndex === -1) {
          return;
        }
        let disabled = 0;
        if (_has(buttons[buttonIndex], 'status')) {
          disabled = !_get(buttons[buttonIndex], 'status', 0); // 1 启用 0 禁用
        }
        if (_has(buttons[buttonIndex], 'flag')) {
          disabled = !_get(buttons[buttonIndex], 'flag', 0); // 1 启用 0 禁用
        }
        if (!_isNil(el.parentNode) && disabled) {
          if (_has(binding.modifiers, 'remove')) {
            el.parentNode.removeChild(el); // 移除 remove
            return;
          }
          if (_has(binding.modifiers, 'hide')) {
            el.style.display = 'none'; // 隐藏
            return;
          }
          if (
            _has(binding.modifiers, 'disabled') ||
            _isEmpty(binding.modifiers)
          ) {
            // el-button 禁用
            el.disabled = disabled;
            el.classList.add('is-disabled');
          }
        }
      }
    });
  }
};
