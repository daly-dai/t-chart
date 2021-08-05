/**
 * vuex 状态管理插件
 */
import Vuex from 'vuex';
// 动态载入 module 模块
import modules from '../service/store/index.js';
import createPersistedState, {
  sStorageKey,
  isClearCache
} from './persisted-state.js';
import { state, getters, actions, mutations } from './root.js';

Vue.use(Vuex);

export { sStorageKey, isClearCache };
export default new Vuex.Store({
  state,
  modules,
  getters,
  actions,
  mutations,
  plugins: [
    function(store) {
      // 自定义 vuex 插件，Vue 还未初始化完成
    },
    createPersistedState
  ],
  strict: process.env.NODE_ENV !== 'production'
});
