import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';
import { DEFAULT_LINE_COLOR } from './constant/index';

/**
 * @description 自定义http请求 请求本地的json数据
 * @param {*} url 请求的地址
 * @returns 就送相关数据
 */
const httpGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(null);

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.onerror = () => {
      reject(JSON.parse(xhr.responseText));
    };
  });
};

// 获取渐变色区间
const getColorMap = {
  // 获取渐变色
  colorsMap: function(startColor, endColor, step) {
    const startRGB = this.colorRgb(startColor); // 转换为rgb数组模式
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = this.colorRgb(endColor);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step; // 总差值
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      // 计算每一步的hex值
      const hex = this.colorHex(
        'rgb(' +
          parseInt(sR * i + startR) +
          ',' +
          parseInt(sG * i + startG) +
          ',' +
          parseInt(sB * i + startB) +
          ')'
      );
      colorArr.push(hex);
    }
    return colorArr;
  },

  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  colorRgb: function(color) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  },

  // 将rgb表示方式转换为hex表示方式
  colorHex: function(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
        if (hex === '0') {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      const aNum = _this.replace(/#/, '').split('');
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = '#';
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
};

/**
 * @description 设置颜色渐变
 * @param { Object } seriesItem 当前的series配置
 * @param { String } path series路径
 * @param { String | Array } data 设置的数据
 * @param { Number } index 当前series的下标
 */
const setGradientColor = ({ seriesItem, path, data, index }) => {
  if (!data) return false;

  if (_isString(data)) {
    _set(seriesItem, path, data);
    return false;
  }

  if (!_isArray(data)) return false;

  if (!data[index]) return false;

  if (_isString(data[index])) {
    _set(seriesItem, path, data[index]);

    return false;
  }

  if (_isArray(data[index])) {
    const color = data[index];
    const lineColor = getGradientColor(color);

    _set(seriesItem, path, lineColor);
  }
};

/**
 * @description 获取渐变色的基础配置
 * @param {Array} colorData 颜色相关数组
 * @returns 渐变相关配置项
 */
const getGradientColor = colorData => {
  if (colorData.length < 2) return false;

  const lineColor = _cloneDeep(DEFAULT_LINE_COLOR);
  const colorSplit = 1 / (colorData.length - 1);
  const split = [];

  colorData.map((item, index) => {
    const splitItem = { offset: '', color: '' };

    splitItem.offset = index * colorSplit;
    splitItem.color = item;
    split.push(splitItem);
  });

  _set(lineColor, 'colorStops', split);
  return lineColor;
};

/**
 * @description 对相关属性进行配置
 * @param { String } path 属性的路径
 * @param {String | Array} optionsData 配置的数据
 * @param { Object } 当前series对象
 * @param { Number } 当前series的下标
 * @param { Object } 依赖的配置项
 */
const setSeriesConfig = ({ path, optionsData, seriesItem, index }) => {
  if (_isNil(seriesItem.type)) return false;

  // 如果相关的数据没有的话 返回
  if (_isNil(optionsData)) return false;

  const xIndex = _get(seriesItem, 'xAxisIndex', '');

  // 只设置第一条x轴相关的数据
  if (xIndex && xIndex !== 0) return false;

  if (!_isArray(optionsData)) {
    _set(seriesItem, path, optionsData);

    return false;
  }

  if (!optionsData[0]) return false;

  const data = optionsData[index] || optionsData[0];

  _set(seriesItem, path, data);
};

export {
  httpGet,
  getColorMap,
  setGradientColor,
  getGradientColor,
  setSeriesConfig
};
