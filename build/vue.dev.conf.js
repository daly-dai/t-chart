'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const _isNil = require('lodash/isNil');
const processConfig = require('../config/index.js');
const baseVueConfig = require('./vue.base.conf.js');

const buildDate = JSON.stringify(new Date().toLocaleString());
// 在 scripts 指令指定
// cross-env NODE_ENV=development PORT=9099 webpack-dev-server --progress --config ./build/webpack.dev.js
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
// 路径重写
const setHistoryRewritesPages = function(pages = {}) {
  return Object.keys(pages)
    .sort((a, b) => b.length - a.length)
    .map(name => ({
      from: new RegExp(`^/${name}`),
      to: path.posix.join(
        processConfig.dev.assetsPublicPath,
        pages[name].filename || `${name}.html`
      )
    }));
};
const rewritesPages = setHistoryRewritesPages(baseVueConfig.pages);

const devConfig = merge(baseVueConfig, {
  configureWebpack: {
    devtool: processConfig.dev.devtool,
    /* resolve: {
      alias: {
        '@pages': resolve('src/pages')
      }
    } */
    plugins: [
      // 导入自定义环境变量
      new webpack.DefinePlugin({
        'process.env': {
          ...require('../config/dev.env.js'),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          APP_VERSION: `"${require('../package.json').version}"`,
          BUILD_DATE: buildDate,
          USER_CONFIG_ENV: _isNil(process.env.CONFIG_ENV)
            ? '{}'
            : JSON.stringify(
                require(`../config/user-config-env/${process.env.CONFIG_ENV}.env.js`)
              ) // 自定义打包环境变量
        }
      })
    ]
  },
  devServer: {
    index: processConfig.dev.devServerIndex,
    host: HOST || processConfig.dev.host,
    port: PORT || processConfig.dev.port,
    clientLogLevel: processConfig.dev.clientLogLevel,
    hot: processConfig.dev.hot,
    hotOnly: processConfig.dev.hotOnly,
    compress: processConfig.dev.compress,
    open: processConfig.dev.open,
    overlay: processConfig.dev.overlay
      ? { warnings: false, errors: true }
      : false,
    headers: processConfig.dev.headers,
    proxy: processConfig.dev.proxyTable,
    publicPath: processConfig.dev.assetsPublicPath,
    watchOptions: processConfig.dev.watchOptions,
    progress: processConfig.dev.progress,
    // 配置如果找不到页面就默认显示的页面
    historyApiFallback: {
      rewrites: rewritesPages
    },
    writeToDisk: processConfig.dev.writeToDisk
  }
});

module.exports = devConfig;
