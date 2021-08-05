import moment from 'moment';
import _toString from 'lodash/toString';
import { sensitiveField } from '@utils/index.js';

/**
 * @desc 将整数部分逢三一断
 * @example
 * 1001->1,001
 */
Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0';
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  return intPartFormat;
});

// 转换百分比，0.36=>36
Vue.filter('percentageFormat', function(value) {
  return Math.round(value * 10000) / 100.0;
});

// 四舍五入，12.3456=>12.35
Vue.filter('roundingNumFormat', function(value, fixedNum = 2) {
  return parseFloat(value).toFixed(fixedNum);
});

// 只保留固定小数位，12.3456=>12.34
Vue.filter('fixedDecimalFormat', function(value, fixedNum = 2) {
  return parseFloat(value.toFixed(fixedNum));
});

// 将number保留bitNum位小数，不够补0，12.3=>12.30
Vue.filter('fixedDecimalRetain0Format', function(number, bitNum = 2) {
  var fx = parseFloat(number);
  if (isNaN(fx)) {
    return 0;
  }
  var sx = number.toString();
  var posDecimal = sx.indexOf('.');
  // 没有小数点的加上小数点
  if (posDecimal < 0) {
    posDecimal = sx.length;
    if (bitNum !== 0) {
      sx += '.';
    } else {
      // 没有小数点还要保留0位小数
      return sx;
    }
  }
  if (sx.length <= posDecimal + bitNum) {
    // eg:122 保留2位小数
    // return 122.00
    while (sx.length <= posDecimal + bitNum) {
      sx += '0';
    }
  } else {
    // eg:1.222222  保留2位小数
    // return 1.22
    sx = sx.substring(0, posDecimal + bitNum + 1);
  }
  return sx;
});

/**
 * @desc 时间处理
 */
Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
});

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
});

// JSON 对象转 json 字符串，并格式化
Vue.filter('stringify2', function(content) {
  if (_isNil(content) || content.length === 0) {
    return '';
  }
  return JSON.stringify(JSON.parse(content), null, 2);
});

/**
 * @desc 转换 888888888 -> ∞，-888888888 -> -∞
 */
Vue.filter('infiniteNum2Char', function(val) {
  if (_toString(val) === '888888888') {
    return '∞';
  } else if (_toString(val) === '-888888888') {
    return '-∞';
  } else {
    return val;
  }
});

// 字段脱敏处理
Vue.filter('sensitiveField', function(field, before = 3, after = 4) {
  return sensitiveField(field, before, after);
});
