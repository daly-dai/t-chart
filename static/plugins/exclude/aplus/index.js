(function(w, d, s, q, i) {
  w[q] = w[q] || [];
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  j.async = true;
  j.id = 'beacon-aplus';
  j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js';
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue');

aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
});
aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
});

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
});
