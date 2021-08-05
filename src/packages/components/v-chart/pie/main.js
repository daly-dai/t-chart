import _has from 'lodash/has';

export default {
  name: 'BasePieChart',
  props: {
    /**
     * @description 饼状图的数据
     */
    pieValue: {
      type: Array,
      default: () => []
    },
    /**
     * @description 饼状图的名称
     */
    pieName: {
      type: Array,
      default: () => []
    },
    pieModel: {
      type: String,
      default: ''
    }
  },
  data() {
    // 默认的series属性
    this.DEFAULT_SERIES = {
      name: '',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };

    this.DEFAULT_OPTION = {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      }
    };

    return {};
  },
  methods: {
    /**
     * @description 设置组件的个性化设置
     */
    setPersonalizationOptions(options) {
      this.setPieLegend(options);
    },
    /**
     * @description 设置series的相关数据
     */
    setPieSerise() {},
    /**
     * @description 设置饼状图的图例
     */
    setPieLegend(options) {
      if (_has(options, 'legend.data')) {
        delete options.legend.data;
      }
    }
  }
};
