'use strict';
const isDev = process.env.NODE_ENV === 'development'; // 开发环境
let myVueConfig = {};
if (isDev) {
  myVueConfig = require('./build/vue.dev.conf.js');
} else {
  myVueConfig = require('./build/vue.prod.conf.js');
}

module.exports = myVueConfig;
