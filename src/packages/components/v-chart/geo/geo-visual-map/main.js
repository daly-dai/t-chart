import _mergeWith from 'lodash/mergeWith';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'BaseGeoVisualChart',
  props: {
    /**
     * @description 展示映射组件
     */
    showVisual: {
      type: Boolean,
      default: true
    },
    /**
     * @description 地图展示的配置项
     */
    areaNormal: {
      type: Object,
      default: () => {}
    },
    /**
     * @description 鼠标移上时的配置项
     */
    areaEmphasis: {
      type: Object,
      default: () => {}
    },
    /**
     * @description 区域的相关数据
     */
    visualData: {
      type: Array,
      default: () => []
    },
    /**
     * @description 区域数据方法
     */
    visualDataFun: {
      type: Function
    },
    // 视图映射组件
    visualMapObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /**
     * @description 获取默认的配置信息
     */
    getIndividuationOptions() {
      this.INDIVIDUATION_OPTIONS = {
        visualMap: {
          show: this.showVisual,
          max: 100,
          seriesIndex: [0],
          inRange: {
            color: ['#A5DCF4', '#006edd']
          }
        }
      };

      this.DEFAULT_SERIES = {
        type: 'map',
        map: this._uid + 'map',
        zoom: 1.1, // 默认显示级别
        label: {
          show: true,
          color: '#ffffff',
          emphasis: {
            color: 'white',
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#2980b9',
            borderWidth: 1
            // areaColor: '#12235c'
          },
          emphasis: {
            areaColor: '#FA8C16',
            borderWidth: 0,
            color: 'green'
          }
        },
        data: []
      };
    },
    /**
     * @description 设置组件内自定义配置
     * @param { Object } options 地图基本的配置项
     */
    setIndividuationOptions(options) {
      this.getIndividuationOptions();

      if (!_isEmpty(this.visualMapObj)) {
        this.INDIVIDUATION_OPTIONS = _mergeWith(
          this.INDIVIDUATION_OPTIONS,
          this.visualMapObj
        );
      }

      options = _mergeWith(options, this.INDIVIDUATION_OPTIONS);
      const seriesItem = _cloneDeep(this.DEFAULT_SERIES);

      // 设置区域相关配置
      if (!_isEmpty(this.areaNormal)) {
        seriesItem.itemStyle.normal = _mergeWith(
          seriesItem.itemStyle.normal,
          this.areaNormal
        );
      }

      // 设置区域hover相关配置
      if (!_isEmpty(this.areaEmphasis)) {
        seriesItem.itemStyle.normal = _mergeWith(
          seriesItem.itemStyle.emphasis,
          this.areaEmphasis
        );
      }

      // 设置map的series的数据
      this.setVisualSeriesData(seriesItem);
      options.series[0] = seriesItem;

      // 将geo地图隐藏
      options.geo.show = false;
    },
    /**
     * @description 设置地图的series的
     * @param { Object } seriesItem series的配置项
     */
    setVisualSeriesData(seriesItem) {
      let areaNameList = [];
      const data = [];

      if (!this.areaData.features.length) return false;

      areaNameList = this.areaData.features.map(item => {
        console.log(item, 7777);
        return item.properties.name;
      });

      // console.log(object);

      // 如果传入数据则进行自动匹配
      if (this.visualData.length > 0) {
        this.visualData.map(item => {
          const name = _get(item, 'name', '').slice(0, 2);

          for (let i = 0; i < areaNameList.length; i++) {
            if (areaNameList[i].indexOf(name) !== -1) {
              data.push({
                name: areaNameList[i],
                value: item.value
              });

              break;
            }
          }
        });

        seriesItem.data = data;
        return false;
      }

      // 如果传入了回调参数
      if (this.visualDataFun) {
        seriesItem.data = this.visualDataFun(areaNameList);
      }
    }
  }
};
