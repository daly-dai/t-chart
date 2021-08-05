import _mergeWith from 'lodash/mergeWith';
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'BaseGeoDotChart',
  props: {
    /**
     * @description 每一项的长宽
     */
    symbolSize: {
      type: Number | Function
    },
    /**
     * @description 当前的图像类型
     */
    symbol: {
      type: String | Array
    },
    /**
     * @description 点的相关数据，支持一维和二维
     */
    seriesData: {
      type: Array,
      default: () => []
    },
    /**
     * @description 地图点数据的回调函数
     */
    seriesDataFun: {
      type: Function
    },
    /**
     * @description 点的类型
     */
    dotType: {
      type: String,
      default: 'scatter'
    },
    /**
     * @description 对点图进行高度字典自定义化控制
     */
    seriesOptions: {
      type: Object | Array
    }
  },
  computed: {
    currentSeriesItem() {
      const seriesMap = {
        effectScatter: 'effectScatterSeriesItem',
        scatter: 'scatterSeriesItem'
      };

      return this[seriesMap[this.dotType]];
    }
  },
  data() {
    this.effectScatterSeriesItem = {
      name: '',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      rippleEffect: {
        brushType: 'fill'
      },
      itemStyle: {
        normal: {
          color: '#F4E925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [],

      symbolSize: function(val) {
        return 10;
      },
      showEffectOn: 'render' // 加载完毕显示特效
    };

    this.scatterSeriesItem = {
      name: '',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin',
      symbolSize: [50, 50],
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 9
          },
          formatter(value) {
            return value.data.value[2];
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#D8BC37' // 标志颜色
        }
      },
      data: [],
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      zlevel: 1
    };

    return {};
  },
  methods: {
    /**
     * @description 设置插槽里面相关的配置项
     * @param { Object } options 地图的配置项
     * @param { Array } areaData 地图的相关数据
     */
    setSlotOptions(options, areaData) {
      this.options = options;
      this.areaData = areaData;

      this.judgeSeriesData(options, areaData);
    },
    /**
     * @description 判断配置项的数据来源
     * @param { Object } options 图表配置项
     * @param { Array } areaData
     */
    judgeSeriesData(options, areaData) {
      // 回调函数优先
      if (this.seriesDataFun) {
        const areaList = areaData.map(item => {
          return {
            name: item.properties.name,
            value: [...item.properties.center]
          };
        });

        const seriesData = this.setSeriesDataFun(areaList);

        this.setSeriesData(options, seriesData);
        return false;
      }

      // 当直接传入数据的时候
      if (!this.seriesData.length) {
        this.setSeriesData(options, []);
        return false;
      }

      this.setSeriesData(options, this.seriesData);
    },
    /**
     * @description 设置地图上点相关配置与数据
     * @param { Object } options 地图配置项
     * @param { Array } data 点数据
     * @returns
     */
    setSeriesData(options, data) {
      // 如果是单项数据的话
      if (!(data[0] instanceof Array)) {
        let seriesItem = _cloneDeep(this.DEFAULT_SERIES);

        // 合并外部传入的配置
        if (this.seriesOptions.length) {
          seriesItem = _mergeWith(seriesItem, this.seriesOptions[0]);
        }

        seriesItem.data = data;
        options.series.push(seriesItem);

        return true;
      }

      // 如果传入了多项数据的话
      data.map((item, index) => {
        let seriesItem = _cloneDeep(this.DEFAULT_SERIES);

        if (!_isEmpty(this.seriesOptions[index])) {
          seriesItem = _mergeWith(seriesItem, this.seriesOptions[index]);
        }

        seriesItem.data = item;
        options.series.push(seriesItem);
      });
    }
  }
};
