/**
 * @desc axios-api-query ajax请求拦截器
 */
import NProgress from 'nprogress';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';
import router from '@router/index.js';
import store from '@store/index.js';
import { LOGIN_PAGE_NAME, USER_API_CONFIG } from '@config/index.js';
import filterExpand from '@plugins/axios/filter.js';

// const unTokenExpireWatch = null; // 动态监听器 watch

// 请求开始发送
const apiRequestStartHandler = function() {
  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.start();
  }
};

// 请求结束
const apiRequestEndHandler = function(response = {}) {
  const code = _get(response, 'data.code', '-100');
  // token 过期或无效
  if (code === USER_API_CONFIG.api_server_code.TOKEN_EXPIRE_CODE) {
    // 清空缓存并且替换刷新当前页面到登录页
    store
      .dispatch('handlerDestroy')
      .then(() => {
        Vue.prototype.$message({
          showClose: false,
          message: '错误：抱歉，您的登录状态已失效，请重新登录！',
          type: 'error',
          duration: 1500,
          onClose: () => {
            // 关闭时的回调函数
            // window.location.replace(`/${LOGIN_PAGE_NAME}`);
            router.push({ name: LOGIN_PAGE_NAME });
          }
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  // 其它异常 code
  if (_includes(USER_API_CONFIG.api_server_code.WRONG_CODE, code)) {
    const result = _get(
      response,
      'config.request_error_callback',
      function() {}
    )(
      {
        status: _get(response, 'data.data'),
        statusText: _get(response, 'data.mesg'),
        data: response.data
      },
      {},
      false
    );
    if (result || _isNil(result)) {
      let msg = '未定义的错误msg';
      if (_has(response, 'data.msg')) {
        msg = _get(response, 'data.msg');
      }
      if (_has(response, 'data.message')) {
        msg = _get(response, 'data.message');
      }
      if (_has(response, 'data.mesg')) {
        msg = _get(response, 'data.mesg');
      }
      Vue.prototype.$message({
        showClose: true,
        message: '错误：' + msg,
        type: 'error'
      });
    }
  }
  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};

// 请求出现拦截器无法捕获的异常 例如：timeout 请求超时
const apiRequestInterceptErrorHandler = function(message) {
  if ('$message' in Vue.prototype) {
    if (message.length > 0) {
      Vue.prototype.$message({
        showClose: true,
        message: '错误：' + message,
        type: 'error'
      });
    }
  }
  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};

let isRefreshing = false; // 标记是否正在刷新 token
let requests = []; // 存储待重发请求的数组

// 请求出现后置拦截器错误，例如：Request failed with status code 502
const requestErrorCallback = function(
  error = {
    status: 1001,
    statusText: '未知错误',
    config: {},
    instance: undefined
  },
  data = {},
  state = true
) {
  if (!_isEmpty(error.config)) {
    console.info(
      error.config.url,
      USER_API_CONFIG.api_server_code.AUTH_REFRESH_API,
      _includes(
        error.config.url,
        USER_API_CONFIG.api_server_code.AUTH_REFRESH_API
      )
    );
    console.info(
      error.config,
      error.config.baseURL,
      data,
      !_isEmpty(data),
      _has(data, 'code'),
      // data.code === USER_API_CONFIG.api_server_code.TOKEN_EXPIRE_CODE &&
      _get(data, 'mesg', '') === '无效token',
      _get(data, 'data', '') === '无效token',
      _get(data, 'data', '') === 'token过期',
      _get(data, 'mesg', '') === 'token过期',
      _get(data, 'message', '') === 'token过期',
      _get(data, 'message', '') === '无效token',
      _get(data, 'code', '') ===
        USER_API_CONFIG.api_server_code.TOKEN_EXPIRE_CODE,
      !_includes(
        error.config.url,
        USER_API_CONFIG.api_server_code.AUTH_REFRESH_API
      )
    );
  }
  if (
    !_isEmpty(data) &&
    (_get(data, 'mesg', '') === '无效token' ||
      _get(data, 'data', '') === '无效token' ||
      _get(data, 'data', '') === 'token过期' ||
      _get(data, 'mesg', '') === 'token过期' ||
      _get(data, 'message', '') === 'token过期' ||
      _get(data, 'message', '') === '无效token' ||
      _get(data, 'code', '') ===
        USER_API_CONFIG.api_server_code.TOKEN_EXPIRE_CODE) &&
    !_includes(
      error.config.url,
      USER_API_CONFIG.api_server_code.AUTH_REFRESH_API
    )
  ) {
    // 返回的是 token 过期
    if (!isRefreshing) {
      isRefreshing = true;
      return filterExpand
        .refreshToken(
          error.instance,
          USER_API_CONFIG.api_server_code.AUTH_REFRESH_API
        )
        .then(res => {
          filterExpand.setToken(res);
          const accessToken = res.data.access_token;
          // token 刷新后将数组的方法重新执行
          requests.forEach(cb => {
            cb(accessToken);
          });
          requests = []; // 重新请求完清空
          // error.config.params.state = 'yes';
          error.config.baseURL = '';
          error.config.headers.Authorization = accessToken;
          // eslint-disable-next-line promise/no-nesting
          return error
            .instance(error.config)
            .then(resData => {
              if (!_isNil(error.config.apiInstance().thenHandle)) {
                error.config.apiInstance().thenHandle(resData);
              }
            })
            .catch(error => {
              if (!_isNil(error.config.apiInstance().catchHandle)) {
                error.config.apiInstance().catchHandle(error);
              }
            })
            .finally(() => {
              if (!_isNil(error.config.apiInstance().finallyHandle)) {
                error.config.apiInstance().finallyHandle();
              }
            });
        })
        .catch(err => {
          // 清空缓存并且替换刷新当前页面到登录页
          // eslint-disable-next-line promise/no-nesting
          store
            .dispatch('handlerDestroy')
            .then(() => {
              Vue.prototype.$message({
                showClose: false,
                message: '错误：抱歉，您的登录状态已失效，请重新登录~！',
                type: 'error',
                duration: 1500,
                onClose: () => {
                  // 关闭时的回调函数
                  // window.location.replace(`/${LOGIN_PAGE_NAME}`);
                  router.push({ name: LOGIN_PAGE_NAME });
                }
              });
            })
            .catch(error => {
              throw new Error(error);
            });
          // eslint-disable-next-line promise/no-return-wrap
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    } else {
      // 返回未执行 resolve 的 Promise
      return new Promise(resolve => {
        // 用函数形式将 resolve 存入，等待刷新后再执行
        requests.push(token => {
          error.config.baseURL = '';
          error.config.headers.Authorization = token;
          // error.config.params.state = 'yes';
          // error.config.params.current = '1';
          // error.config.params.size = '10';
          // console.info('token', error.config);
          resolve(
            error
              .instance(error.config)
              .then(resData => {
                if (!_isNil(error.config.apiInstance().thenHandle)) {
                  error.config.apiInstance().thenHandle(resData);
                }
              })
              .catch(error => {
                if (!_isNil(error.config.apiInstance().catchHandle)) {
                  error.config.apiInstance().catchHandle(error);
                }
              })
              .finally(() => {
                if (!_isNil(error.config.apiInstance().finallyHandle)) {
                  error.config.apiInstance().finallyHandle();
                }
              })
          );
        });
      });
    }
  }
  if (!state) {
    return;
  }
  let code = error.status;
  let msg = error.statusText;
  if (
    !_isEmpty(data) &&
    _has(data, 'code') &&
    (_has(data, 'message') || _has(data, 'msg'))
  ) {
    code = data.code;
    msg = _has(data, 'msg') ? data.msg : data.message;
  }
  if ('$message' in Vue.prototype) {
    Vue.prototype.$message({
      showClose: true,
      message: `错误：${code} ${msg}`,
      type: 'error'
    });
  }
  if (USER_API_CONFIG.isShowNProgress) {
    NProgress.done();
  }
};
export {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler,
  requestErrorCallback
};
