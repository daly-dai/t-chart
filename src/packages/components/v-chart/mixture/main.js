import _cloneDeep from 'lodash/cloneDeep';

export const line = {
  name: 'BaseMixtureChart',
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
    // x軸的设置
    xAxis: {
      type: Array,
      default: () => []
    },
    // y軸的设置
    yAxis: {
      type: Array,
      default: () => []
    }
  },
  data() {
    // 默认的
    this.DEFAULT_SERIES = {
      name: '',
      type: '',
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
     * @description 设置x轴或者y轴相关的数据
     * @param { Object } options 图表x轴或y轴相关配置
     * @params { string } axis xAxis yAxis
     */
    setAxisData(options, data) {
      if (!data || !data.length) return options;

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
    },
    /**
     * @description 设置混合视图进行个性化配置
     * @param { Object } options 图表的配置属性
     */
    setPersonalizationOptions(options) {
      // 设置相关子组件的额外属性
      if (this.setExtraOptions) {
        this.setExtraOptions(options);
      }
    }
  }
};
