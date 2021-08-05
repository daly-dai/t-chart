/**
 * @desc 下载
 * @param {*} response - 请求返回数据 {data: Blob, headers: {}}
 * @param {string} fileName - 文件名称 '机构账号导出3.xlsx'
 * @example
 * const response = {data: Blob, headers: {content-disposition: ''}}
 * const fileName = '用户列表.xlsx'
 * down(response, fileName)
 */
const down = function(response, fileName = '') {
  const blob = response.data;
  const aEle = document.createElement('a');
  aEle.href = window.URL.createObjectURL(blob);
  if (!fileName) {
    // 没传文件名，就用后台的filename， 后台也没有传就。。。。
    const resHeader = response.headers['content-disposition'];
    if (resHeader === undefined) {
      console.error('数据为 undefined，无法导出！');
      return;
    }
    if (resHeader.indexOf('filename=') !== -1) {
      fileName = resHeader.split('filename=')[1];
    } else {
      fileName = resHeader.split('fileName=')[1];
    }
    fileName = decodeURIComponent(fileName || '');
  }
  aEle.download = fileName;
  aEle.click();
  window.URL.revokeObjectURL(aEle.href);
};

// 根据url地址下载
const download = url => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (isChrome || isSafari) {
    var link = document.createElement('a');
    link.href = url;
    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  window.open(url, '_self');
  return true;
};

export { download, down };
