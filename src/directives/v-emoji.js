/* eslint-disable no-unused-vars */
/**
 * @desc 开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。
 * 使用：将需要校验的输入框加上 v-emoji 即可
 * <input type="text" v-model="note" v-emoji />
 */
const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type
    ? parent
    : parent.querySelector(type);
};

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

const emoji = {
  bind: function(el, binding, vnode) {
    // 正则规则可根据需求自定义
    var regRule = /[^\u4E00-\u9FA5|\d|\\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
    const $inp = findEle(el, 'input');
    el.$inp = $inp;
    let language = 'en'; // 输入法 en、zh
    $inp.handle = {};
    $inp.handle.compositionstart = node => {
      // 中文输入-开始
      language = 'zh';
    };
    $inp.handle.compositionend = node => {
      // 中文输入-结束
      $inp.value = $inp.value.replace(regRule, '');
      setTimeout(() => {
        language = 'en';
      }, 0);
    };
    $inp.handle.input = node => {
      // console.log('input', $inp.value);
      if (language === 'en') {
        // 英文
        $inp.value = $inp.value.replace(regRule, '');
      }
    };
    // 非直接输入法如中文输入
    $inp.addEventListener('compositionstart', $inp.handle.compositionstart);
    $inp.addEventListener('compositionend', $inp.handle.compositionend);
    // 直接输入法
    $inp.addEventListener('input', $inp.handle.input);
    /* el.$inp = $inp;
    $inp.handle = function () {
      const val = $inp.value;
      $inp.value = val.replace(regRule, '');

      trigger($inp, 'input');
    };
    $inp.addEventListener('keyup', $inp.handle); */
  },
  unbind: function(el) {
    // el.$inp.removeEventListener('keyup', el.$inp.handle);
    // 元素解绑时移除事件
    el.$inp.removeEventListener(
      'compositionstart',
      el.$inp.handle.compositionstart
    );
    el.$inp.removeEventListener(
      'compositionend',
      el.$inp.handle.compositionend
    );
    el.$inp.removeEventListener('input', el.$inp.handle.input);
  }
};

export default {
  install(Vue, { name = 'emoji' } = {}) {
    Vue.directive(name, emoji);
  }
};
