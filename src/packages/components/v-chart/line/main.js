import _cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import _set from 'lodash/set';
import model from '../model/line.js';

export const line = {
  name: 'BaseLineChart',
  props: {
    // x轴的数据
    xAxisData: {
      type: Array,
      default: () => []
    },
    // y轴的数据
    yAxisData: {
      type: Array,
      default: () => []
    },
    // 曲线是否平滑
    smooth: {
      type: Boolean,
      default: false
    },
    // 折线面积区域设置
    lineAreaOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.MODEL = model;
    // 默认的
    this.DEFAULT_SERIES = {
      name: '',
      type: 'line',
      data: []
    };
    // 默认的基础配置
    this.DEFAULT_OPTION = {
      legend: {
        show: true,
        orient: 'horizontal', // 图例列表的布局朝向 'horizontal'、'vertical'
        x: 'center', // 可设定图例在左、右、居中
        y: 'top', // 可设定图例在上、下、居中
        data: []
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        data: []
      },
      series: []
    };

    return {};
  },
  methods: {
    /**
     * @description 对默认的配置进行主题的合并
     */
    setDefaultOptions() {
      if (!this.MODEL) return false;
      if (!this.THEME_MAP[this.theme]) return false;

      const themeName = this.THEME_MAP[this.theme];

      if (!this.MODEL[themeName]) return false;

      this.DEFAULT_OPTION = _mergeWith(
        this.DEFAULT_OPTION,
        this.MODEL[themeName]
      );
    },
    /**
     * @description 设置组件的个性化设置
     */
    setPersonalizationOptions(options) {
      this.setLineSerise(options);
    },
    /**
     * @description 设置线条的serise配置
     */
    setLineSerise(options) {
      options.series.map((item, index) => {
        if (this.smooth) {
          _set(item, 'smooth', true);
        }

        if (this.lineAreaOptions.length) {
          _set(item, 'areaStyle.color', this.lineAreaOptions[index]);
        }
      });
    },
    /**
     * @description 设置x轴或者y轴相关的数据
     * @param { Object } options 图表相关配置
     * @params { string } axis xAxis yAxis
     */
    setAxisData(options, data) {
      if (!data || !data.length > 0) return options;

      // XAxisData一维数组时
      if (!(data[0] instanceof Array)) {
        options.data = data;
        return options;
      }

      // XAxisData 二维数组时
      const axisOptions = [];

      data.map(item => {
        const axisItem = _cloneDeep(options);

        axisItem.data = item;
        axisOptions.push({ ...axisItem });
      });

      return axisOptions;
    }
  }
};
