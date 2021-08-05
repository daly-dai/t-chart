import storage from 'good-storage';
import { isStartWithNum, hasLetter } from './check.js';

/**
 * 调用localStorage 存储方法
 * @param key
 * @param value
 * @param fn 成功回调
 * @param error
 */
const setLocalStorage = (key, value, fn = () => {}, error = () => {}) => {
  if (!key) return error(new Error('LocalStorage must has a param key'));
  if (isStartWithNum(key))
    return error(new Error('LocalStorage param key must contains letter'));
  if (typeof value === 'object')
    return error(
      new Error('LocalStorage param value type must not be an object')
    );
  if (window.localStorage) {
    try {
      window.localStorage.setItem(key, value);
      typeof fn === 'function' && fn();
    } catch (e) {
      return error(e);
    }
  } else {
    return error(new Error('Your browser does not support localStorage'));
  }
};

/**
 * 移除本地存储中的某个字段
 * @param key
 * @param error
 * @returns {*}
 */
const removeLocalStorage = (
  key,
  error = () => {
    return '';
  }
) => {
  if (!key) return error(new Error('LocalStorage must has a param key'));
  if (!hasLetter(key))
    return error(new Error('LocalStorage param key must contains letter'));
  if (window.localStorage) {
    return window.localStorage.removeItem(key);
  } else {
    return error(new Error('Your browser does not support localStorage'));
  }
};

/**
 * 获取本地存储
 * @param key
 * @param error
 * @returns {*}
 */
const getLocalStorage = (
  key,
  error = () => {
    return '';
  }
) => {
  if (!key) return error(new Error('LocalStorage must has a param key'));
  if (!hasLetter(key))
    return error(new Error('LocalStorage param key must contains letter'));
  if (window.localStorage) {
    return window.localStorage.getItem(key);
  } else {
    return error(new Error('Your browser does not support localStorage'));
  }
};

const setSession = (key, value, fn = () => {}, error = () => {}) => {
  if (!key) return error(new Error('LocalStorage must has a param key'));
  if (isStartWithNum(key))
    return error(new Error('SessionStorage param key must contains letter'));
  if (typeof value === 'object')
    return error(
      new Error('SessionStorage param value type must not be an object')
    );
  if (window.sessionStorage) {
    try {
      window.sessionStorage.setItem(key, value);
      typeof fn === 'function' && fn();
    } catch (e) {
      return error(e);
    }
  } else {
    return error(new Error('Your browser does not support SessionStorage'));
  }
};

const removeSession = (
  key,
  error = () => {
    return '';
  }
) => {
  if (!key) return error(new Error('sessionStorage must has a param key'));
  if (!hasLetter(key))
    return error(new Error('sessionStorage param key must contains letter'));
  if (window.sessionStorage) {
    return window.sessionStorage.removeItem(key);
  } else {
    return error(new Error('Your browser does not support sessionStorage'));
  }
};

const getSession = (
  key,
  error = () => {
    return '';
  }
) => {
  if (!key) return error(new Error('sessionStorage must has a param key'));
  if (!hasLetter(key))
    return error(new Error('sessionStorage param key must contains letter'));
  if (window.sessionStorage) {
    return window.sessionStorage.getItem(key);
  } else {
    return error(new Error('Your browser does not support sessionStorage'));
  }
};

// 使用插件 good-storage -主要是操作和 Storage 相关的逻辑
const saveStorageData = function(key, val) {
  // 存储到storage
  storage.set(key, val);
  // 返回
  return val;
};
// 读取本地存储
const loadStorageData = function(key) {
  return storage.get(key);
};
// 清空Key记录
const clearStorageData = function(key) {
  // 指定key
  if (key) {
    storage.remove(key);
  } else {
    localStorage.clear();
  }
  return [];
};

export {
  clearStorageData,
  loadStorageData,
  saveStorageData,
  getLocalStorage,
  getSession,
  removeSession,
  setSession,
  removeLocalStorage,
  setLocalStorage
};
