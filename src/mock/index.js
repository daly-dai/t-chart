import { isIE } from '@utils/index.js';

const Mock = require('mockjs2');

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (
  process.env.NODE_ENV !== 'production' ||
  process.env.VUE_APP_PREVIEW === 'true'
) {
  if (isIE()) {
    console.error('错误：“mockjs”不支持“IE”，请不要在“production”ENV中使用。');
  }
  // 使用同步加载依赖，注册所有的mock服务
  console.log('.......mock mounting.......');
  // 使用 webpack 的 require.context() 遍历所有 mock 文件
  const requireModule = require.context('./services', true, /\.js$/);
  requireModule.keys().forEach(fileName => {
    const moduleName = fileName.replace(/(\.\/|\.js)/g, '');
    require(`./services/${moduleName}.js`);
  });
  // require('./services/user.js');

  // 设置拦截 ajax 请求的相应延时时间（ 800 毫秒 ）
  Mock.setup({
    timeout: 800 // setter delay time
  });
  console.log('.......mock mounted.......');
}
