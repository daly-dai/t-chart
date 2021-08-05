try {
  const config = {
    bid: 'szzhyy-web',
    signkey: '1234567890abcdef',
    gateway: 'https://wpk-gate.zjzwfw.gov.cn'
  };
  const wpk = new wpkReporter(config);
  wpk.installAll();
  window._wpk = wpk;
} catch (err) {
  console.error('WpkReporter init fail', err);
}
