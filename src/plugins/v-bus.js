/**
 * @desc 自定义事件总线(bus 巴士事件) 插件
 * 使用一个空的 Vue 实例作为事件总线
 * 注册的事件需要手动移除,防止发生内存泄露和重复注册 once的事件不需要调用off()
 * ps: 大部分业务需求通过vuex维护状态就能解决,注册全局需要操控视图层的事件可以使用 vBus
 * 或者views和components交互可以使用 vBus ，非父子组件之间的通信可以使用 vBus
 * window.GvBus.$vBus.on('user.rowClick',this.myHandle) 绑定
 * window.GvBus.$vBus.emit('user.rowClick',{}); 触发
 */
import _hasIn from 'lodash/hasIn';
import _isNil from 'lodash/isNil';

class MakeVBus {
  constructor(options) {
    this.events = {};
  }

  // 注册 在当前页面 hook 处于 'beforeDestroy' 时,需要明确调用 off 方法移除事件
  on(name, handler) {
    if (!_isNil(this.events[name])) {
      throw new Error(`please remove ${name} event`);
    }
    window.GvBus.vBus.$on(name, handler); // 事件添加在 vue 实例对象上
    this.events[name] = handler;
  }

  // 注册一次 不需要调用 off 销毁
  once(name, handler) {
    window.GvBus.vBus.$once(name, handler);
  }

  /**
   * 移除 注册事件必须显示调用 off() 进行移除
   * 推荐在页面/组件 beforeDestroy() 方法执行
   */
  off(name) {
    window.GvBus.vBus.$off(name, this.events[name]);
    if (_hasIn(this.events, name)) {
      delete this.events[name];
    }
  }

  /**
   * 触发事件
   * 跨页面/组件触发事件
   */
  emit(name, params) {
    window.GvBus.vBus.$emit(name, params);
  }
}

export default new MakeVBus();
