'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const _includes = require('lodash/includes');
const _replace = require('lodash/replace');
const _isNil = require('lodash/isNil');
const frameConfig = require('../frame.config.js');
const processConfig = require('../config/index.js');
const packageConfig = require('../package.json');
const utils = require('./utils.js');

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const buildDate = JSON.stringify(new Date().toLocaleString());
const baseVueConfig = require('./vue.base.conf.js');
// 需要 splitChunks 分割出的第三方依赖包
const otherDependencies = utils.arrayRemoveItems(
  Object.keys(packageConfig.dependencies),
  frameConfig.removeOtherDependenciesCacheGroupsLibs || []
);
for (let n = 0, len = otherDependencies.length; n < len; n++) {
  const sDependency = otherDependencies[n];
  // 在正则表达式中需要对 / 就行转义
  if (_includes(sDependency, '/')) {
    otherDependencies[n] = _replace(sDependency, '/', '\\/');
  }
  if (_includes(sDependency, '.')) {
    otherDependencies[n] = _replace(sDependency, '.', '\\.');
  }
}
const getNodeVersion = function() {
  // 截取 node 的版本号
  var str = process.version; // 'v12.18.3';
  var reg = /(?<=v).+(.)/;
  var matchResult = str.match(reg);
  if (!matchResult) {
    return 0;
  }
  if (matchResult.length > 0) {
    return matchResult[0].split('.')[0]; // 12
  }
};
const nodeVersion = getNodeVersion(); // node的版本
// console.info('MiniCssExtractPlugin ', MiniCssExtractPlugin)
const webpackConfig = merge(baseVueConfig, {
  productionSourceMap: processConfig.build.createMap,
  configureWebpack: {
    devtool: processConfig.build.devtool,
    externals: frameConfig.externals,
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 8,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: false,
          vueBase: {
            name: 'vueBase',
            minSize: 15000,
            // test: /[\\/]node_modules[\\/](_vue@2.6.12@vue)[\\/]|[\\/]node_modules[\\/](_vuex@3.5.1@vuex)[\\/]|[\\/]node_modules[\\/](_vue-router@3.4.6@vue-router)[\\/]/gi,
            test: /[\\/]node_modules[\\/](_vue@.*@vue)[\\/]|[\\/]node_modules[\\/](_vuex@.*@vuex)[\\/]|[\\/]node_modules[\\/](_vue-router@.*@vue-router)[\\/]/gi,
            enforce: true
          },
          elementUi: {
            name: 'elementUi',
            test: /element-ui/gi,
            priority: 10,
            enforce: true
          },
          otherDependencies: {
            name: 'otherDependencies',
            // eslint-disable-next-line no-eval
            test: eval('/' + otherDependencies.join('|') + '/g'),
            enforce: true
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          },
          componentsCommons: {
            name: 'chunk-components',
            test: /[\\/]src[\\/]pages|[\\/]src[\\/]components|[\\/]src[\\/]layouts|[\\/]src[\\/]api|[\\/]src[\\/]assets/,
            // test: /[\\/]src[\\/]pages[\\/]portal[\\/]components|[\\/]src[\\/]components|[\\/]src[\\/]api/,
            // test: resolve('src/pages/portal/components'), // can customize your rules
            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          default: {
            name: 'chunk-default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    module: {
      rules: []
    },
    plugins: [
      // 将配置的 cdn 文件注入到 html 文件内，默认是放到 body 底部
      new HtmlWebpackTagsPlugin({
        tags: [...frameConfig.cdnMap.js, ...frameConfig.cdnMap.css],
        usePublicPath: false, // 是否将（webpack）publicPath注入标签路径
        append: false // 将 tags 配置的外部链接放到 chunk 之前载入
      }),
      // GZ压缩
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        minRatio: 0.8 // 压缩比例，值为0 ~ 1
      }),
      // 导入自定义环境变量
      new webpack.DefinePlugin({
        'process.env': {
          ...require('../config/prod.env.js'),
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
  chainWebpack: config => {
    config.output.filename(utils.assetsPath('js/[name].[chunkhash].js')).end(); // 入口 entry 文件打包生成 js 文件走 filename 配置项
    config.output
      .chunkFilename(utils.assetsPath('js/vendor/[name].[chunkhash].js'))
      .end(); // splitChunks 分割出模块，动态 import 引入的模块
    config.output.hashDigestLength(8); // 生成 bundle 文件 hash 取8位（对 url-loader 和 file-loader 的 hash 无效）
  },
  /* css: {
    extract: false
  } */
  css: {
    extract: {
      ignoreOrder: true // 启用以删除有关冲突顺序的警告 Conflicting order. Following module has been added
    }
  }
});
// 图片按需压缩加载
if (nodeVersion >= 12) {
  const imagesWebpackLoader = {
    // node 版本是8的时候 image-webpack-loader 打包构建会报错
    test: /\.(png|jpe?g|gif|svg|blob)(\?.*)?$/,
    // 压缩图片
    loader: 'image-webpack-loader',
    include: [path.join(__dirname, '..', 'src/assets/images-webpack')], // 某个文件下的图片进行压缩处理
    // 通过enforce: 'pre'我们提高了 img-webpack-loader 的优先级，保证在url-loader、file-loader和svg-url-loader之前就完成了图片的优化。
    enforce: 'pre',
    options: { bypassOnDebug: true }
  };
  webpackConfig.configureWebpack.module.rules.push(imagesWebpackLoader);
}
// 查看 webpack 打包情况
if (frameConfig.isBundleAnalyzer) {
  webpackConfig.configureWebpack.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
