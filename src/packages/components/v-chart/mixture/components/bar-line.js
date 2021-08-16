import _keys from 'lodash/keys';
import _mergeWith from 'lodash/mergeWith';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import { setSeriesConfig, setGradientColor } from '../../utils';
import model from '../../model/mixture.js';

export const barLine = {
  name: 'BaseBarLineChart',
  props: {
    // 折线面积颜色
    lineAreaColor: {
      type: Array
    },
    // 折线是否平滑
    smooth: {
      type: Boolean,
      default: false
    },
    // 折线的颜色二维的为渐变色
    lineColor: {
      type: Array | String
    },
    /**
     * @desc 设置柱状图的宽度
     */
    barWidth: {
      style: String | Number | Array
    },
    /**
     * @desc 柱状图的颜色
     */
    barColor: {
      style: String | Array
    },
    /**
     * @description 柱状图的背景颜色
     */
    barBackground: {
      type: String | Array
    }
  },
  methods: {
    /**
     * @description 对默认的配置进行主题的合并
     * @param { Object } options 图表配置项
     */
    setThemeOptions(options) {
      if (!model) return false;

      if (!this.THEME_MAP[this.theme]) return false;

      const themeName = this.THEME_MAP[this.theme];

      options = _mergeWith(options, model[themeName]);
    },
    /**
     * @description 获取当前组件的默认配置
     */
    getExtraDefaultOptions() {
      // 对柱状图进行控制的配置
      this.barPropsMap = {
        barWidth: [{ path: 'barWidth', data: this.barWidth }],
        barColor: [
          { type: 'color', path: 'itemStyle.color', data: this.barColor }
        ],
        barBackground: [
          {
            path: 'backgroundStyle.color',
            data: this.barBackground
          }
          // {
          //   path: 'showBackground',
          //   data: true
          // }
        ]
      };

      // 对折线图进行的配置
      this.linePropsMap = {
        smooth: [{ path: 'smooth', data: true }],
        lineAreaColor: [
          { type: 'color', path: 'areaStyle.color', data: this.lineAreaColor }
        ]
      };

      //
    },
    /**
     * @description 设置额外的配置
     * @param { Object } options 配置信息
     */
    setExtraOptions(options) {
      this.getExtraDefaultOptions();
      this.setThemeOptions(options);

      // 设置y轴配置项
      this.setYAxisOptions(options);

      if (options.series.length) {
        this.setBarLineSeries(options.series);
      }
    },
    /**
     * @description 设置barLine配置项数据
     * @param {Array} series series配置项
     */
    setBarLineSeries(series) {
      const barSeriesList = series.filter(item => item.type === 'bar');
      const lineSeriesList = series.filter(item => item.type === 'line');

      barSeriesList.map((item, index) => {
        this.setTypeMapData(this.barPropsMap, item, index);
      });

      lineSeriesList.map((item, index) => {
        this.setTypeMapData(this.linePropsMap, item, index);
      });
    },
    /**
     * @description 设置不同类型的数据设置
     * @param {Object} mapObj 需要遍历的map对象
     * @param {Object} seriesItem 需要配置的series选项
     * @param {Number} index  当前series的下标
     */
    setTypeMapData(mapObj, seriesItem, index) {
      _keys(mapObj).map(key => {
        for (const configItem of mapObj[key]) {
          if (configItem.type === 'color') {
            setGradientColor({
              seriesItem,
              path: configItem.path,
              data: configItem.data,
              index
            });

            continue;
          }

          setSeriesConfig({
            path: configItem.path,
            optionsData: configItem.data,
            seriesItem,
            index
          });
        }
      });
    },
    /**
     * @description 设置y轴默认配置
     * @param { Object } options echarts配置
     */
    setYAxisOptions(options) {
      if (!options.series.length) return false;

      const index = options.series.findIndex(
        item => _get(item, 'yAxisIndex', '') === 1
      );

      if (index !== -1) {
        const yAxisItem = _cloneDeep(_get(options, 'yAxis'));

        _set(yAxisItem, 'data', []);
        const defaultYAxisItem = _get(options, 'yAxis');
        const yAxis = [defaultYAxisItem, yAxisItem];

        _set(options, 'yAxis', yAxis);
      }
    }
  }
};
