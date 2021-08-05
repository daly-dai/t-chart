import qs from 'querystring';
import _isString from 'lodash/isString';

// 返回结果-结构
const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: 0
};

// 构建返回结果
const builder = (
  data,
  message = '',
  status = 200,
  code = '000000',
  headers = {}
) => {
  responseBody.data = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
  }
  if (status !== undefined) {
    responseBody._status = status;
  }
  if (
    headers !== null &&
    typeof headers === 'object' &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

/**
 * @desc get参数获取
 * @param {String} options - url 参数
 */
const getQueryParameters = options => {
  const url = options.url;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

/**
 * @desc post 参数获取
 * @param {Object} options - 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
 */
const getBody = options => {
  if (_isString(options.body)) {
    // post 设置 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 需要使用 qs.parse 将 'userName=admin&password=1b3231655cebb7a1f783eddf27d254ca' 转换到 json 对象
    return options.body && qs.parse(options.body);
  }
  return options.body && JSON.parse(options.body);
};
export { builder, getQueryParameters, getBody };
