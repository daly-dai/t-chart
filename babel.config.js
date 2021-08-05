const frameConfig = require('./frame.config.js');
// 所有生产环境
const prodPlugin = [];

if (process.env.NODE_ENV === 'production') {
  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: frameConfig.prodConsoleType
    }
  ]);
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  compact: frameConfig.compact, // https://babeljs.io/docs/en/options#compact
  plugins: [...prodPlugin]
  /* plugins: [
    // elementUI 按需加载
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ] */
};
