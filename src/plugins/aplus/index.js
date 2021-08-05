// eslint-disable-next-line no-unused-vars
import store from '@store/index.js';
/**
 * @desc 设置 MetaInfo 信息
 */
const MyAplus = class MyAplus {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // 默认的一些设置
  }

  /**
   * @desc 设置用户MetaInfo信息
   * @param {String|Number} id - 当前用户ID
   */
  setUserMetaInfo({ id }) {
    // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['_hold', 'BLOCK']
    });
    // 设置用户ID，用户设备ID可不做上报，若上报可使用开放平台JSAPI获取UUID
    // 用户id需要埋政钉用户真实信息，用户ID必须用accountId，可通过开放平台“获取用户详情”接口获取。
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['_user_id', id]
    });

    // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
    // 此时被block住的日志会携带上用户信息逐条发出
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['_hold', 'START']
    });
  }

  /**
   * @desc 发送一条页面PV日志
   */
  sendPv(outParams = {}) {
    const commonMetaInfo = {
      dev_type: '01', // 设备类型 （01：PC端，02：app端）
      site_type: '02', // 站点类型 （站点类型编码，如02：数字政府）
      is_digital_reform: '01', // 标识是否为数字化改革门户 （标识是否为数字化改革门户，取固定值1）
      city_code: '330000', // 设区市编码（系统所属设区市，如330102：杭州市，若为省级系统填330000）
      userName: '客户端用户名称', // 客户端用户名称
      task_code: store.getters['permission/getTaskId'], // 左侧菜单任务code
      task_name: _get(store.getters['permission/getRouterList'], 'name', '') // 左侧菜单任务name
    };
    // 单页应用或“单个页面”需异步补充PV日志参数还需进行如下埋点：
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-waiting', 'MAN']
    });
    // 单页应用路由切换后或在异步获取到pv日志所需的参数后再执行sendPV
    aplus_queue.push({
      action: 'aplus.sendPV',
      arguments: [
        {
          is_auto: false
        },
        {
          // sapp_id、sapp_name 当前你的应用信息，此两行请勿修改
          sapp_id: '需替换为对应小程序在开放平台app_base_info表主键',
          sapp_name: '需替换为对应小程序在开放平台的应用标识',
          // 自定义PV参数key-value键值对，以下内容必填，根据应用实际情况设置。
          // page_id: '页面ID，与page 参数配合使用，保证唯一性',
          // page_name: '页面中文名称',
          // page_url: '页面URL'
          ...outParams,
          ...commonMetaInfo
        }
      ]
    });
  }
};
if (!_has(window, 'MyAplus')) {
  window.MyAplus = new MyAplus();
}
