'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const _get = require('lodash/get');
const _set = require('lodash/set');
const _has = require('lodash/has');
const _assign = require('lodash/assign');
const _concat = require('lodash/concat');
const _keys = require('lodash/keys');
const _isEmpty = require('lodash/isEmpty');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const frameConfig = require('../frame.config.js');
const processConfig = require('../config/index.js');
const createCssLoaderConfig = require('./css-loader.conf.js');
const utils = require('./utils.js');

const isDev = process.env.NODE_ENV === 'development'; // 开发环境
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
let webpackEntry = {};
// 设置 alias 别名
const alias = {};
const setAlias = function() {
  for (const name in frameConfig.useAlias) {
    alias[name] = resolve(frameConfig.useAlias[name]);
  }
};
setAlias();
// 外部链接，需要使用 babel 编译和 webpack 构建
const babelCdnPages = _get(frameConfig, 'babelCdnMap', []);
for (var n = 0, babelLen = babelCdnPages.length; n < babelLen; n++) {
  const name = babelCdnPages[n].name;
  const chunk = babelCdnPages[n].js;
  if (!_has(webpackEntry, name)) {
    _set(webpackEntry, name, chunk);
  }
}
webpackEntry = _assign({}, utils.getIEDynamicImportModule(), webpackEntry);
const isPx2Rem = !_isEmpty(frameConfig.px2RemModule); // 是否需要使用 px2rem，true的话会在html页面上载入 flexible.js
// 单页应用
const pages = {
  index: {
    entry: './src/main.js',
    template: './public/index.html',
    filename: 'index.html',
    title: frameConfig.sys_app_title,
    favicon: path.join(__dirname, '../public/favicon.ico'),
    outsideJs: frameConfig.cdnMap.outsideJs,
    outsideCss: frameConfig.cdnMap.outsideCss,
    isPx2Rem: isPx2Rem,
    chunks: isDev
      ? _concat(['chunk-vendors', 'chunk-common', 'index'], _keys(webpackEntry))
      : _concat(
          [
            'vueBase',
            'elementUi',
            'chunk-default',
            'otherDependencies',
            'styles',
            'chunk-components',
            'index'
          ],
          _keys(webpackEntry)
        )
  }
};

const baseConfig = {
  outputDir: processConfig.build.assetsRoot, // 构建文件的输出目录名称
  publicPath: isDev
    ? processConfig.dev.assetsPublicPath
    : processConfig.build.assetsPublicPath, // 加载 chunk 配置的服务器地址（远程）
  lintOnSave: true, // eslint 输出为编译警告，不会使得编译失败
  runtimeCompiler: false, // 不使用 Vue 运行时版本，template 模板和 render 函数 不属于运行时编译
  assetsDir: isDev
    ? processConfig.dev.assetsSubDirectory
    : processConfig.build.assetsSubDirectory, // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  pages,
  configureWebpack: {
    /* entry: {
      b: './static/plugins/bbb/a.js'
    }, */
    entry: webpackEntry,
    resolve: {
      extensions: frameConfig.extensions,
      alias: {
        '@': resolve('./src'),
        ...alias,
        vue$: isDev
          ? resolve('./node_modules/vue/dist/vue.runtime.js')
          : resolve('./node_modules/vue/dist/vue.runtime.min.js') // runtimeCompiler 设置为 false 脚手架会使用 runtime 版本，注意：如果通过 webpack.ProvidePlugin 提供了全局的 Vue 对象则必须显示设置这个否则会报 Vue.use is not a function
      },
      modules: [resolve('src'), 'node_modules'],
      mainFields: ['main', 'module']
    },
    module: {
      rules: [
        // typescript loader
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      // 忽略解析三方包里插件（非中文语言包排除掉）
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      // 提供全局的变量，自动加载模块，而不必到处 import 或 require（如果有 eslint 需要在 .eslintrc.js 中配置 globals 否则代码中 eslint 校验会报错）
      new webpack.ProvidePlugin(frameConfig.providePlugin),
      new StyleLintPlugin({
        // config: {
        //   // 你的lint扩展自刚刚安装的 stylelint-config-standard
        //   extends: 'stylelint-config-standard'
        // },
        config: require('../stylelint.config.js'),
        files: 'src/**/*.l?(e|c)ss', // 正则匹配想要lint监测的文件，忽略的文件请在 .stylelintignore 中配置
        // failOnError: false,
        cache: true, // cache 选项可以指定使用缓存，默认生成的 .stylelintcache 文件放置于执行目录中
        fix: true // 如果为true，stylelint则将修复尽可能多的错误
      }),
      new ProgressBarPlugin({
        format:
          '  build [:bar] ' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        clear: false
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('copy').init(
      CopyWebpackPlugin =>
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: isDev
              ? processConfig.dev.assetsSubDirectory
              : processConfig.build.assetsSubDirectory,
            ignore: isDev ? [] : ['**/prod-ignored-directory/**'] // 忽略哪些文件或目录不拷贝到最终的构建包中，如：[ '**/file.*' ， '**/prod-ignored-directory/**' ]
          },
          {
            from: path.resolve(__dirname, '../static/dist'), // dist 目录内的文件都会被拷贝到打包输出 dist 的根路径这一层
            to: ''
          }
        ])
    );
    // svg 图 loader 加载修改
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      });
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        // merge 方法是保证我们不会覆盖掉原有的其他配置
        return merge(options, {
          fallback: {
            options: {
              name: utils.assetsPath('img/[folder]/[name]-[hash:8].[ext]'),
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? processConfig.build.urlLoaderPublicPath
                  : processConfig.dev.urlLoaderPublicPath
            }
          }
        });
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        // merge方法是保证我们不会覆盖掉原有的其他配置
        return merge(options, {
          fallback: {
            options: {
              name: utils.assetsPath('img/[folder]/[name]-[hash:8].[ext]'),
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? processConfig.build.urlLoaderPublicPath
                  : processConfig.dev.urlLoaderPublicPath
            }
          }
        });
      });
    // 自定义处理 css-loader
    config.module
      .rule('css')
      .oneOf('vue-modules')
      // .use('extract-css-loader')
      // .loader(MiniCssExtractPlugin.loader)
      // .end()
      .use('css-loader')
      .tap(options => {
        return merge(options, createCssLoaderConfig(isDev));
      });
    config.module
      .rule('scss')
      .oneOf('vue-modules')
      .use('css-loader')
      .tap(options => {
        return merge(options, createCssLoaderConfig(isDev));
      });
    config.module
      .rule('less')
      .oneOf('vue-modules')
      .use('css-loader')
      .tap(options => {
        return merge(options, createCssLoaderConfig(isDev));
      });
    // babel-loader （src、test、static/plugins/babel-modules 会使用 babel-loader 处理，其它目录需要使用 exclude 添加过虑规则不使用 babel-loader ）
    /* config.module
      .rule('js')
      .include.add([
        resolve('src'),
        resolve('test'),
        resolve('static/plugins/babel-modules')
      ]); */
    config.module
      .rule('js')
      .exclude.add(file =>
        /[\\/]static[\\/]plugins[\\/](lib-flexible|exclude)[\\/]/.test(file)
      );
  },
  css: {
    sourceMap: isDev,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: { blue: '#4989F4' } // 可以在这里定义全局变量，文件中可以直接使用
          // javascriptEnabled: true // 6.0.0 之前的 less-loader 版本中需要开启 javascriptEnabled
        },
        prependData: '@import "@assets/less/index.less";'
      },
      sass: {
        // 配置 sass 全局变量
        prependData: `
          @import "@assets/scss/index.scss";
        `
      }
    }
  }
};

module.exports = baseConfig;
