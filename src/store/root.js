/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state, rootState }, address){
 *      //rootState.title
 *  }
 * }
 */
const state = {
  menus: null, // 菜单
  userData: {}, // 用户信息
  initedApp: false // 应用是否已经初始化完成
};
const getters = {
  getMenus: state => {
    const roleMenus = _get(state, 'menus.models', []);
    return roleMenus;
  },
  // 获取一级菜单
  getLevel1Menus: state => {
    const roleMenus = _get(state, 'menus.models', []);
    const firstMenus = [];
    for (let i = 0, len = roleMenus.length; i < len; i++) {
      firstMenus.push(_omit(roleMenus[i], ['children', 'buttons']));
    }
    return firstMenus;
  },
  getUserData: state => {
    return state.userData;
  },
  getInitedApp: state => {
    return state.initedApp;
  }
};
const actions = {
  setInitedApp({ commit, state }) {
    commit('UPDATE_INITED_APP');
  },
  setUserData({ commit, state }, { data }) {
    commit('UPDATE_DATA', data);
  },
  setStoreMenus({ commit, state }, { menus }) {
    commit('GENERATE_ROLE_MENUS', menus);
  },
  // 获取子级菜单
  getChildrenMenus({ commit, state }, { id, menuCode, menuName, menus }) {
    return new Promise((resolve, reject) => {
      const menu = _find(menus, function(value, index) {
        return value.id === id;
      });
      if (_has(menu, 'children') && menu.children.length > 0) {
        resolve(menu.children);
        return;
      }
      resolve([menu]);
    });
  },
  // 销毁缓存和重置变量
  handlerDestroy({ commit }) {
    const p = new Promise((resolve, reject) => {
      this.dispatch('platform/handleExit')
        .then(() => {
          commit('HANDLER_DESTROY');
          resolve();
        })
        .catch(error => {
          throw new Error(error);
        });
    });
    return p;
    // this.dispatch('platform/handlerDestroy').then();
    // commit('HANDLER_DESTROY');
  }
};
const UPDATE_INITED_APP = 'UPDATE_INITED_APP';
const UPDATE_DATA = 'UPDATE_DATA';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const HANDLER_DESTROY = 'HANDLER_DESTROY';
const mutations = {
  [UPDATE_INITED_APP](state) {
    state.initedApp = true;
  },
  [UPDATE_DATA](state, data) {
    state.userData = data;
  },
  [GENERATE_ROLE_MENUS](state, menus) {
    state.menus = menus;
  },
  [HANDLER_DESTROY](state) {
    state.menus = null;
    state.userData = {};
    state.initedApp = false;
  }
};
export { state, getters, actions, mutations };
