/**
 * @desc 字段数据验证插件
 * 将不同的验证方法写在插件中对外提供统一的验证策略
 * true 表示验证通过 false 验证失败
 */
import _has from 'lodash/has';
import {
  isEmail,
  isMobilePhone,
  isPhone,
  checkSQLXss,
  checkInvalidChar
} from '@utils/index.js';

const Validator = {
  types: {
    // 验证只能为数字
    checkNumber: {
      validate: function(value) {
        return !isNaN(value);
      },
      instructions: '传入的值只能是合法的数字！'
    },
    isEmail: {
      validate: isEmail,
      instructions: '邮箱格式不正确！'
    },
    isMobilePhone: {
      validate: isMobilePhone,
      instructions: '手机号码格式不正确！'
    },
    isPhone: {
      validate: isPhone,
      instructions: '电话号码格式不正确！'
    },
    checkSQLXss: {
      validate: checkSQLXss,
      instructions: '存在SQL特殊字符！'
    },
    checkInvalidChar: {
      validate: checkInvalidChar,
      instructions: '存在特殊字符！'
    }
  },
  /**
   * type types 中的验证函数 'checkNumber'
   * val 外部传入的待验证值
   */
  validate: function(type, val = '') {
    if (!_has(this.types, type)) {
      return { result: false, msg: '验证函数不存在' };
    }
    const b = this.types[type].validate(val);
    if (!b) {
      return { result: b, msg: b ? '' : this.types[type].instructions };
    }
    return { result: b };
  }
};
export default Validator;
