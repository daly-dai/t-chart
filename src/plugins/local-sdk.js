/**
 * @desc 前端缓存插件
 */
window.mLocalSdk = {
  resourceVersion: '1.0.0',
  resourceJavascriptList: [{}],
  needUpdate: (function() {})(),
  // 判断文件是否为IE的方法
  isIE: (function() {
    const v = 3;
    const div = document.createElement('div');
    const all = div.getElementsByTagName('i');
    console.info(all);
    // eslint-disable-next-line no-cond-assign
    // while (div.innerHTML = '<!-- [if gt IE >' + (++v) + ']><li></li><![endif]-->' && !all[0]) {}
    return v > 5 ? v : false;
  })(),
  // 检查本地缓存是否溢出
  checkHedge: function() {
    const localStorageLength = localStorage.length;
    let localStorageSize = 0;
    for (let i = 0; i < localStorageLength; i++) {
      const key = localStorage.key(i);
      localStorageSize += localStorage.getItem(key).length;
    }
    return localStorageSize;
  },
  // 启动方法，也是读取本地缓存
  startUp: function() {}
};
