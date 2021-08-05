const ua = navigator.userAgent.toLowerCase();

// 是否是移动端
const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
};

// 是否是QQ浏览器
const isQQBrowser = () => {
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
};

// 是否是爬虫
const isSpider = () => {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(
    ua
  );
};

// 是否是微信浏览器
const isWeiXin = () => {
  return ua.match(/microMessenger/i) === 'micromessenger';
};
// 是否ios
const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // 安卓手机
    return false;
  } else if (u.indexOf('iPhone') > -1) {
    // 苹果手机
    return true;
  } else if (u.indexOf('iPad') > -1) {
    // iPad
    return false;
  } else if (u.indexOf('Windows Phone') > -1) {
    // winphone手机
    return false;
  } else {
    return false;
  }
};

// 是否为PC端
const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

// 加入收藏夹
const addFavorite = (sURL, sTitle) => {
  try {
    window.external.addFavorite(sURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, '');
    } catch (e) {
      alert('加入收藏失败，请使用Ctrl+D进行添加');
    }
  }
};

// 判断是否安卓移动设备访问
const isAndroidMobileDevice = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
};

// 判断是否苹果移动设备访问
const isAppleMobileDevice = () => {
  return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
};
// 判断 isIE 浏览器
const isIE = function() {
  const bw = window.navigator.userAgent;
  const compare = s => bw.indexOf(s) >= 0;
  const ie11 = (() => 'ActiveXObject' in window)();
  return compare('MSIE') || ie11;
};

export {
  isIE,
  isAppleMobileDevice,
  isAndroidMobileDevice,
  addFavorite,
  isPC,
  isIos,
  isWeiXin,
  isSpider,
  isQQBrowser,
  isDeviceMobile
};
