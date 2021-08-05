/**
 * @desc 这个网站的 store
 */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNil from 'lodash/isNil';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import router from '@router/index.js';
import { sStorageKey, isClearCache } from '@store/index.js';

const state = {
  // 登录信息
  loginCacheUserInfo: {
    username: '',
    password: '',
    remember: ''
  },
  data: {}, // 用户信息
  userDetailData: {
    headerImg: '',
    username: '',
    departmentText: ''
  }, // 用户详细信息
  // 是否已登陆
  isLogin: false,
  /**
   * 应用是否已经初始化完成 主要用于检测 'roleMenus'、'roleRoutes'是否已生成
   */
  initedApp: false,
  // 角色对应的菜单
  roleMenus: {},
  // 系统用户访问令牌
  token: '',
  // 刷新 token
  refreshToken: '',
  layout: 1 // 布局风格 1布局风格1 2 布局风格2 3 布局风格3
};
const getters = {
  getData: state => {
    return state.data;
  },
  getLoginStatus: state => {
    return state.isLogin;
  },
  getAppStatus: state => {
    return state.initedApp;
  },
  getToken: state => {
    return state.token;
  },
  // 获取全部菜单
  getMenus: state => {
    return state.roleMenus;
  },
  // 获取用户详情信息
  getUserMsg: state => {
    return state.userDetailData;
  },
  // 登录用户和密码
  getLoginCacheUserInfo: state => {
    return state.loginCacheUserInfo;
  },
  getRefreshToken: state => {
    return state.refreshToken;
  },
  getLayout: state => {
    return state.layout;
  }
};
const actions = {
  // 登录
  handleLogin(
    { dispatch, commit, state },
    { userName, password, remember = false }
  ) {
    console.info(userName, password);
    return new Promise((resolve, reject) => {
      // 根据具体请求结果返回 解决（或拒绝）
      // Vue.prototype.$api['login/doLogin']({code: code,password: password},{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      Vue.prototype.$api['login/doLogin'](
        {
          data: { userName, password },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        },
        {
          // 自定义错误拦截，此处只是示例真实项目可以注释掉
          request_error_callback: function({ status, statusText, data }) {
            // 某个请求的特定异常提示
            if (!_isNil(data)) {
              Vue.prototype.$errorMsg(data.data);
            } else {
              Vue.prototype.$errorMsg(`${status}：${statusText}`);
            }
            return false;
          }
        }
      )
        .then(resData => {
          if (
            resData.code === Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
          ) {
            this.dispatch('setUserData', { data: resData.data }); // 调用外部的根 store 赋值 data
            commit('UPDATE_DATA', resData.data);
            // 设置通用请求头参数
            this.dispatch('platform/setApiHeaderParams', {
              token: _get(resData, 'data.token')
            });
            // 保存登录名和密码
            this.dispatch('platform/setLoginInfo', {
              username: userName,
              password,
              remember
            });
            resolve(resData);
          } else {
            reject(_get(resData, 'msg', '登录失败'));
          }
        })
        .catch(error => {
          reject(error);
          console.info(error);
        });
    });
  },
  // 更新用户信息
  updateData({ commit, state }, resData) {
    commit('UPDATE_DATA', resData.data);
  },
  // 设置通用请求头参数
  setApiHeaderParams({ commit, state }, { token }) {
    Vue.prototype.$loaderApiLibrary.setHeaderOptions({ token });
  },
  // 登出
  handleExit({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送登出请求
      Vue.prototype.$api['login/logout']({
        headers: { token: state.token }
      })
        .then(resData => {
          if (
            resData.code === Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
          ) {
            this.dispatch('platform/handlerDestroy');
          }
          resolve();
        })
        .catch(error => {
          reject(error);
          console.info(error);
        });
    });
  },
  // 销毁缓存和变量
  handlerDestroy({ commit, state }) {
    this.dispatch('platform/setApiHeaderParams', { token: null });
    commit('HANDLE_EXIT');
  },
  // 请求菜单
  fetchMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$api['common/getMenus']()
        .then(resData => {
          if (
            resData.code !== Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
          ) {
            resolve();
            return;
          }
          // resData = resData.data;
          const handlerMate = function(item) {
            item.menuCode = _get(item, 'href', item.menuCode);
            item.menuName = _get(item, 'name', item.menuName);
            item.menuUrl = _get(item, 'href', item.menuUrl);
            // item.iconUrl = `iconfont ${_get(item, 'icon', item.iconUrl)}`;
            item.iconUrl = `${_get(item, 'icon', item.iconUrl)}`;
            item.childMenus = _get(item, 'children', []).length;
            item.target = _get(item, 'hrefType', 'in');
          };
          const handlerWhile = function(data) {
            for (let i = 0, len = data.length; i < len; i++) {
              handlerMate(data[i]);
              if (_has(data[i], 'children') && !_isEmpty(data[i].children)) {
                handlerWhile(data[i].children);
              }
            }
          };
          handlerWhile(resData.data);
          resData.models = resData.data;
          this.dispatch('setInitedApp');
          this.dispatch('setStoreMenus', {
            menus: resData
          }); // 调用外部的根 store 赋值 menus
          commit('GENERATE_ROLE_MENUS', resData);
          // this.dispatch('platform/setRouter');
          resolve();
          /* resData = resData.data;
        this.dispatch('setInitedApp');
        this.dispatch('setStoreMenus', { menus: resData }); // 调用外部的根 store 赋值 menus
        commit('GENERATE_ROLE_MENUS', resData);
        // this.dispatch('platform/setRouter');
        resolve(); */
        })
        .catch(error => {
          throw new Error(error);
        });
    });
  },
  // 菜单和路由进行参数组装
  setRouter({ commit, state }) {
    if (!state.roleMenus) {
      return;
    }
    const routes = router.options.routes;
    const checkChildren = function(oRouter, aMenusList) {
      for (const value of Object.values(oRouter)) {
        const oMenu = _find(aMenusList, menu => menu.menuCode === value.name);
        if (_has(value, 'children') && !_isEmpty(value.children)) {
          // console.info(value, aMenusList, oMenu);
          setRouterMeta(value, oMenu);
          if (_isNil(oMenu)) {
          } else {
            // checkChildren(value.children, oMenu.children);
          }
        } else {
          setRouterMeta(value, oMenu);
        }
      }
    };
    const setRouterMeta = function(router, oMenu) {
      !_isNil(oMenu) && !_has(oMenu, 'meta') && (oMenu.meta = {});
      if (_has(router, 'meta.isOpen')) {
        // 重置 isOpen
        delete router.meta.isOpen;
      }
      if (_isNil(oMenu) && !_has(router, 'meta.approve')) {
        _set(router.meta, 'isOpen', false); // 路由权限，false 不能打开对应的页面
        // 如果父节点是 false，那么对应的所有子节点都应该是 false
        const doWhileFn = function(item) {
          for (let i = 0, len = item.length; i < len; i++) {
            _set(item[i], 'meta.isOpen', false);
            if (_has(item[i], 'children') && item[i].children.length > 0) {
              doWhileFn(item[i].children);
            }
          }
        };
        if (_has(router, 'children') && !_isEmpty(router.children)) {
          doWhileFn(_get(router, 'children', []));
        }
      }
      if (!_isNil(oMenu) && _has(oMenu, 'buttons')) {
        _set(router.meta, 'buttons', oMenu.buttons);
      }
    };
    // console.info(state.roleMenus.models);
    for (const value of Object.values(routes)) {
      if (_has(value, 'children') && !_isEmpty(value.children)) {
        const menu2Children = [];
        /* const menu2Children = _get(
          _find(state.roleMenus.models, model => model.menuCode === value.name),
          'children',
          []
        ); */
        let menuModels = state.roleMenus.models;
        const router2Menus = _find(
          state.roleMenus.models,
          model => model.menuCode === value.name
        );
        if (!_isNil(router2Menus)) {
          menuModels = _get(router2Menus, 'children', []);
        }
        for (const elem of value.children.values()) {
          const itemMenu = _find(
            menuModels,
            model => model.menuCode === elem.name
          );
          itemMenu && menu2Children.push(itemMenu);
        }
        checkChildren(value.children, menu2Children);
      }
    }
    // console.info('routes', routes, state.roleMenus.models);
    // console.info('rootRouterRedirect', rootRouterRedirect);
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入本包中的字典
    // const p1 = Vue.prototype.$dict.import(import('../../data-dict/index.js'));
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(
      Vue.prototype.$api['dict/getDictDataByTypeList']()
    );
    return Promise.all([p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  },
  // 设置登录用户名和密码
  setLoginInfo({ commit, state }, { username, password, remember }) {
    commit('UPDATE_LOGIN_INFO', { username, password, remember });
  },
  setLayout({ commit, state }, { layout }) {
    commit('UPDATE_LAYOUT', { layout });
  }
};
const GENERATE_ROUTES = 'GENERATE_ROUTES';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const UPDATE_DATA = 'UPDATE_DATA';
const GET_USER_DATA = 'GET_USER_DATA';
const HANDLE_EXIT = 'HANDLE_EXIT';
const UPDATE_LOGIN_INFO = 'UPDATE_LOGIN_INFO';
const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
const mutations = {
  [GENERATE_ROUTES](state, roleRouter) {
    state.roleRoutes.push(roleRouter);
  },
  [GENERATE_ROLE_MENUS](state, aRoleMenuList) {
    state.roleMenus = aRoleMenuList;
    state.initedApp = true;
  },
  [UPDATE_DATA](state, data) {
    state.data = data;
    if ('token' in data) {
      state.token = data.token;
    }
    if ('refresh_token' in data) {
      state.refreshToken = data.refresh_token;
    }
    state.isLogin = true;
  },
  [GET_USER_DATA](state, data) {
    state.userDetailData = data;
  },
  [UPDATE_LAYOUT](state, data) {
    state.layout = _get(data, 'layout', 1);
  },
  [HANDLE_EXIT](state) {
    state.data = {};
    state.roleMenus = {};
    state.token = '';
    state.isLogin = false;
    state.initedApp = false;
    state.userDetailData = {};
    state.refreshToken = ''; // 这里必需要重置数据，不然我们在退出到登录页（并且不刷新页面）后虽然 localStarge 中的数据已经被清除了但是内存中 vuex 的数据还是存在的
    state.layout = 1;
    setTimeout(() => {
      // 移除全部缓存
      if (!_isNil(localStorage.getItem(sStorageKey)) && isClearCache) {
        localStorage.removeItem(sStorageKey);
      }
      if (!_isNil(sessionStorage.getItem(sStorageKey)) && isClearCache) {
        sessionStorage.removeItem(sStorageKey);
      }
      // 移除部分缓存请操作对应的 store 中的 Actions，注意 store 中所有的操作必须通过 Actions 来完成
    }, 0);
  },
  [UPDATE_LOGIN_INFO](state, { username, password, remember }) {
    state.loginCacheUserInfo.remember = remember;
    state.loginCacheUserInfo.username = username;
    if (remember) {
      state.loginCacheUserInfo.password = password;
    } else {
      state.loginCacheUserInfo.password = '';
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
