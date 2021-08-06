// e-charts
import { BaseBarChart, BaseGroupBarChart } from './bar/index.js';
import { BaseLineChart } from './line/index.js';
import { BasePieChart } from './pie/index.js';
import { BaseMixtureChart } from './mixture/index.js';
import { BaseGeoChart } from './geo/index.js';
import { BaseGeoVisualChart } from './geo/geo-visual-map/index.js';

const BaseVChart = {
  BaseBarChart,
  BaseLineChart,
  BasePieChart,
  BaseMixtureChart,
  BaseGeoChart,
  BaseGeoVisualChart,
  BaseGroupBarChart
};

// export { BaseVChart };

/**
 * @desc 插件入口
 * @param {Object} Vue
 * @param {options} [options={globalOptions: {}}] - 选项配置
 */
function install(Vue, options = { globalOptions: {} }) {
  // 组件
  const strComponentNames = [];

  for (const key in BaseVChart) {
    strComponentNames.push(key);
    Vue.component(key, BaseVChart[key]);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install, version: '1.0.0' }; // shuCVChart，rollup打包时修改为从package.json中读取version值
