// @ts-nocheck
/**
 * 数据字典 Vue 全局过滤器（在模板中使用）
 * <div>{{0 | SEX_TYPE}}</div>
 * 例如在 methods 中请使用Vue根实例过滤转换器 plugins/root-filters.js
 */
import Vue from 'vue';
import dictionary from '@service/data-dict/index.js';
import _omit from 'lodash/omit';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _keys from 'lodash/keys';
import _find from 'lodash/find';

class DataDictFilter {
  constructor({ label = 'name', code = 'id' } = {}) {
    this.label = label;
    this.code = code; // 具体的取值字段
    this.filterKeys = [];
    this.dictData = [];
    this.init();
  }

  /**
   * @desc 初始化 公用数据字段配置
   */
  init() {
    Object.keys(dictionary).forEach(key => {
      // 全局过滤器
      if (!this.filterKeys.includes(key.toUpperCase())) {
        this.filterKeys.push(key.toUpperCase());
        this.dictData.push({ [key]: dictionary[key] });
        Vue.filter(key.toUpperCase(), function(value) {
          if (value.length) return;
          const tar =
            dictionary[key].find(item => item.paramValue === value) || {};
          return tar.paramDesc;
        });
      }
    });
  }

  /**
   * @desc 添加自定义规则
   * @example
   * import DataDictFilter from './filters/data-dict-filter/index.js'
   * const myDict = {"DIRECTION_TYPE": [{'paramValue': 0, 'paramDesc': '北'},{'paramValue': 1, 'paramDesc': '东'}]}
   * DataDictFilter.add(myDict)
   */
  add(dict = {}) {
    const omitDict = _omit(dict, Object.keys(dictionary));
    _forEach(omitDict, (configOpt, key) => {
      if (!this.filterKeys.includes(key.toUpperCase())) {
        this.filterKeys.push(key.toUpperCase());
        this.dictData.push({ [key]: configOpt[key] });
        Vue.filter(key.toUpperCase(), function(value) {
          if (value.length) return;
          const tar = configOpt.find(item => item.paramValue === value) || {};
          return _get(tar, 'paramDesc');
        });
      }
    });
  }

  /**
   * @desc 加载外部文件
   * @param  {...Promise} promised - 需要动态加载的具有 promise 返回对象的函数
   */
  import(...promised) {
    return new Promise((resolve, reject) => {
      let [matching, matched, p] = [promised.length, 0, null];
      while ((p = promised.shift())) {
        p.then(defines => {
          if (Object.prototype.hasOwnProperty.call(defines, 'default')) {
            this._append(defines.default);
          } else if (
            Object.prototype.hasOwnProperty.call(defines, 'data') &&
            Object.prototype.hasOwnProperty.call(defines, 'code')
          ) {
            if (_isArray(defines.data)) {
              for (let i = 0, length = defines.data.length; i < length; i++) {
                const dictKeys = _keys(defines.data[i]);
                const dictName = !_isArray(dictKeys[0])
                  ? dictKeys[0]
                  : dictKeys[1];
                const dictList = _isArray(dictKeys[0])
                  ? dictKeys[0]
                  : dictKeys[1];
                const itemDict = _map(defines.data[i][dictList], item => {
                  return {
                    paramValue: _get(item, this.code),
                    paramDesc: _get(item, this.label)
                  };
                });
                // 由数字、26个英文字母或者下划线组成的字符串
                if (/^\w+$/.test(defines.data[i][dictName])) {
                  this._append({ [defines.data[i][dictName]]: itemDict });
                } else {
                  const itemDict = _map(defines.data[i].data, item => {
                    return { paramValue: item.id, paramDesc: item.name };
                  });
                  this._append({ ['DICT_' + i]: itemDict });
                }
              }
            }
          } else {
            this._append(defines);
          }
          ++matched;
          if (matched === matching) {
            resolve();
          }
        }).catch(e => {
          reject(e);
        });
      }
    });
  }

  /**
   * @desc 动态添加全局过滤函数
   * @param  {object} defines={} -
   */
  _append(defines = {}) {
    for (const [key, elem] of Object.entries(defines)) {
      if (
        Object.prototype.hasOwnProperty.call(defines, key) &&
        !this.filterKeys.includes(elem.name)
      ) {
        this.filterKeys.push(key.toUpperCase());
        this.dictData.push({ [key]: elem });
        Vue.filter(key.toUpperCase(), function(value) {
          if (value.length) return;
          const tar = elem.find(item => item.paramValue === value) || {};
          return _get(tar, 'paramDesc');
        });
      }
    }
  }

  /**
   * @desc 获取某个字典数据
   */
  get(key) {
    const dict = _find(this.dictData, item => {
      return _keys(item)[0] === key;
    });
    return dict ? Object.values(dict)[0] : dict;
  }
}
export default DataDictFilter;
