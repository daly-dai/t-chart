/**
 * @desc 初始化全局组件
 */
import AllViewComponents from '../packages/views/index.js';
import BaseVChart from '../packages/components/v-chart/index.js';

export default {
  install: (Vue, options = {}) => {
    Vue.use(BaseVChart);
    for (const key in AllViewComponents) {
      Vue.component(AllViewComponents[key].name, AllViewComponents[key]);
    }
  }
};
