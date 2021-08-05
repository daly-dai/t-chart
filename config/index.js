/**
 * @desc webpack 构建参数配置
 */
'use strict';
const path = require('path');
const proxyTableConfig = require('./proxy-table.js');

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    /**
     * publicPath 也即是 output.publicPath 属性: 外网发布打包 chunk 配置的 cdn 或者远程服务器地址，本地一般情况无需修改
     * devServer.publicPath 设置内存中的打包文件的虚拟路径映射，区别于 output.publicPath
     * 对于 devServer 中的 publicPath 如果设置 assetsPublicPath: '/b' 那么访问的时候需要这样: <img src="/b/static/2.png"/>
     */
    assetsPublicPath: '/',
    urlLoaderPublicPath: '/', // （图片等资源文件）url-loader中单独配置cdn，做到js访问线上路径，静态资源使用cdn，两者互不影响
    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
    // 服务器代理设置
    devServerIndex: 'index.html', // 主页面，设置 index 文件的文件名（这里是为什么我直接用 http://localhost:8010/ 访问的时候使用的html页面是 index.html）
    proxyTable: proxyTableConfig.proxyTable,
    host: '0.0.0.0', // 服务器（默认值），可以通过 dev.env.js 设置 HOST 参数来改写
    port: 8010, // 端口号（默认值），可以通过 dev.env.js 设置 PORT 参数来改写
    hot: true, // 通知 webpack-dev-server 开启 Hot Module Replacement 这样的一个功能 （需要配置 webpack.HotModuleReplacementPlugin 一起使用）
    hotOnly: true, // 即便是 Hot Module Replacement（HMR） 的功能没有生效或者编译失败，也不让浏览器自动的重新刷新（需要配置 webpack.HotModuleReplacementPlugin 一起使用）
    open: false, // 自动打开浏览器
    compress: false, // 一切服务都启用 gzip 压缩
    overlay: true, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
    clientLogLevel: 'warning', // 控制台(console)显示消息的级别（none、error、warning、info）
    watchOptions: {
      // 监听到变化发生后会等500ms再去执行编译，防止文件更新太快导致重新编译频率太高
      aggregateTimeout: 500,
      // 不监听的文件或文件夹
      ignored: /node_modules/,
      // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
      // 不轮询（如果在使用NFS[网络文件系统]或Vagrant[虚拟化]环境下，监视文件可能不起作用，可以修改为 true 轮询）
      poll: false
    },
    progress: true, // 将运行进度输出到控制台
    writeToDisk: false // 告诉 devServer 将产生的文件写入硬盘，位置为 output.path 配置的目录
    // headers: {} // 在所有响应中添加首部内容
    // headers: { 'Access-Control-Allow-Origin': '*' } // 在所有响应中添加首部内容，比如：跨域，比如本地的时候 127.0.0.1 和 localhost 不设置 * 也会认为是不同域导致热更新的 hot-update.json 加载失败
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static', // 静态文件目录，CopyWebpackPlugin
    // 外网发布打包chunk配置的cdn或者远程服务器地址
    // 我们最终打包出的 chunk 可能会放到一台 cdn 服务器上，所以我们在 index.html（index.html和chunks文件不放在一起） 访问这些 chunk 时需要带上统一的远程地址（比如：http://cdn.com.cn/）
    // assetsPublicPath: 'http://cdn.com.cn/'
    assetsPublicPath: '/',
    urlLoaderPublicPath: '/', // （图片等资源文件）url-loader中单独配置cdn，做到js访问线上路径，静态资源使用cdn，两者互不影响
    /**
     * Source Maps
     */
    devtool: 'cheap-module-source-map',
    createMap: true // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  }
};
