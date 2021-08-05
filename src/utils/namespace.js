/**
 * @desc 命名空间
 * @example
 * ysCredit.ns('js.base')
 * js.base.fn = function(){ this.initComponent() }
 * js.base.fn.prototype = {
 *   name: '命名空间',
 *   initComponent: function(){ console.info(this.name) }
 * }
 */
(function() {
  window.namespace = function() {
    var a = arguments;
    var o = null;
    var i;
    var j;
    var d;
    for (i = 0; i < a.length; i = i + 1) {
      d = a[i].split('.');
      o = window;
      for (j = 0; j < d.length; j = j + 1) {
        o[d[j]] = o[d[j]] || {};
        o = o[d[j]];
      }
    }
    return o;
  };
  // 设置命名空间
  window.frame = {};
  window.frame.ns = window.namespace;
})();
