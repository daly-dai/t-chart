/**
 * 路由配置
 * 对应 module 目录下的文件
 * 入口文件
 */
import { CONST_DEFAULT_CONFIG } from '@config/index.js';
import _camelCase from 'lodash/camelCase';
import _has from 'lodash/has';
import _split from 'lodash/split';
import _dropRight from 'lodash/dropRight';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import _slice from 'lodash/slice';
import _join from 'lodash/join';

const requireModule = require.context('./module', true, /\.js$/);
const modules = {};
requireModule.keys().forEach(filePath => {
  if (filePath === './index.js') return;
  let moduleName = filePath.replace(/(\.\/|\.js)/g, '');
  if (filePath.split('/').length === 2) {
    moduleName = _camelCase(filePath.replace(/(\.\/|\.js)/g, ''));
    modules[moduleName] = { ...requireModule(filePath) }.default;
  }
});
const loadedFileList = [];
requireModule.keys().forEach(filePath => {
  if (filePath === './index.js') return;
  let moduleName = '';
  if (filePath.split('/').length > 2) {
    moduleName = filePath.replace(/(\.\/|\.js)/g, '');
    const aModuleNameList = _split(moduleName, CONST_DEFAULT_CONFIG.sep);
    const aDropRightArray = _dropRight(aModuleNameList);
    var commonRoutes = _get(modules, 'common', []);
    const setRouterChildren = function(moduleRouter, path) {
      if (!_has(moduleRouter, 'children')) {
        moduleRouter.children = [];
      }
      const requireModuleList = requireModule(path).default;
      for (let i = 0, len = requireModuleList.length; i < len; i++) {
        const oRouterConfig = requireModule(path).default[i];
        moduleRouter.children.push(oRouterConfig);
      }
    };
    for (let i = 0, len = aDropRightArray.length; i < len; i++) {
      const value = aDropRightArray[i];
      const path = _join(
        _slice(
          aDropRightArray,
          0,
          _findIndex(aDropRightArray, o => o === value) + 1
        ),
        '/'
      );
      const lastName = aModuleNameList[aModuleNameList.length - 1];
      const filePath = './' + path + '/' + lastName + '.js';
      let moduleRouter = null;
      if (_findIndex(requireModule.keys(), o => o === filePath) === -1) {
        moduleRouter = _find(commonRoutes, item => {
          const name = _has(item, 'name') ? item.name : item.module;
          return name === value;
        });
        commonRoutes && (commonRoutes = _get(moduleRouter, 'children', []));
        continue;
      }
      moduleRouter = _find(commonRoutes, item => {
        const name = _has(item, 'name') ? item.name : item.module;
        return name === value;
      });
      if (i === len - 1) {
        if (_findIndex(loadedFileList, o => o === filePath) === -1) {
          moduleRouter && setRouterChildren(moduleRouter, filePath);
          loadedFileList.push(filePath);
        }
      } else {
        if (_findIndex(loadedFileList, o => o === filePath) === -1) {
          moduleRouter && setRouterChildren(moduleRouter, filePath);
          loadedFileList.push(filePath);
          commonRoutes && (commonRoutes = _get(moduleRouter, 'children', []));
        } else {
          commonRoutes && (commonRoutes = _get(moduleRouter, 'children', []));
        }
      }
    }
  }
});
export default function() {
  return modules.common;
}
