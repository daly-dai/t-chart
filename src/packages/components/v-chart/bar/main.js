import _cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isNil from 'lodash/isNil';
import _isString from 'lodash/isString';

import model from '../model/bar.js';
import { DEFAULT_LINE_COLOR } from '../constant/index';

export const bar = {
  name: 'BaseBarChart',
  props: {
    /**
     * @description x轴的数据
     */
    xAxisData: {
      type: Array,
      default: () => []
    },
    /**
     * @description y轴的数据
     */
    yAxisData: {
      type: Array,
      default: () => []
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
      style: String | Object | Array
    },
    /**
     * @description 柱状图的背景颜色
     */
    barBackground: {
      type: String | Array
    }
  },
  data() {
    this.MODEL = model;

    this.DEFAULT_SERIES = {
      name: '',
      type: 'bar',
      data: [],
      itemStyle: {}
    };

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
        data: []
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

      this.DEFAULT_OPTION = _mergeWith(
        this.DEFAULT_OPTION,
        this.MODEL[themeName]
      );
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
    },
    /**
     * @description 设置柱状图个性化配置
     * @param { Object } options 图表的配置属性
     */
    setPersonalizationOptions(options) {
      // 设置相关子组件的额外属性
      if (this.setExtraOptions) {
        this.setExtraOptions(options);
      }

      this.setBarSeriesOptions(options.series);
    },
    /**
     * @description 设置柱状图相关的series的配置
     * @param { Array } seriesData series数据
     */
    setBarSeriesOptions(seriesData) {
      seriesData.map((item, index) => {
        // 设置柱状图宽度
        this.setConfig({
          path: 'barWidth',
          optionsData: this.barWidth,
          seriesItem: item,
          index
        });

        this.setBarColor({ seriesItem: item, index });

        // 设置柱状图背景颜色
        if (!_isNil(this.barBackground)) {
          this.setConfig({
            path: 'backgroundStyle.color',
            optionsData: this.barBackground,
            seriesItem: item,
            index
          });

          this.setConfig({
            path: 'showBackground',
            optionsData: true,
            seriesItem: item,
            index
          });
        }
      });
    },
    /**
     * @description 对相关属性进行配置
     * @param { String } path 属性的路径
     * @param {String | Array} optionsData 配置的数据
     * @param { Object } 当前series对象
     * @param { Number } 当前series的下标
     * @param { Object } 依赖的配置项
     */
    setConfig({ path, optionsData, seriesItem, index }) {
      // 必须是bar类型的数据
      if (_isNil(seriesItem.type) || seriesItem.type !== 'bar') return false;

      // 如果相关的数据没有的话 返回
      if (_isNil(optionsData)) return false;

      const xIndex = _get(seriesItem, 'xAxisIndex', '');

      // 只设置第一条x轴相关的数据
      if (xIndex && xIndex !== 0) return false;

      if (!_isArray(optionsData)) {
        _set(seriesItem, path, optionsData);

        return false;
      }

      if (!(optionsData instanceof Array)) return false;

      if (!optionsData[0]) return false;

      const data = optionsData[index] || optionsData[0];

      _set(seriesItem, path, data);
    },
    /**
     * @description 设置柱子的颜色
     * @param { Object } seriesItem 当前的series配置
     * @param { Number } index 当前series的下标
     */
    setBarColor({ seriesItem, index }) {
      if (!this.barColor) return false;

      if (_isString(this.barColor)) {
        _set(seriesItem, 'itemStyle.color', this.barColor);
        return false;
      }

      if (!_isArray(this.barColor)) return false;

      if (!this.barColor[index]) return false;

      if (_isString(this.barColor[index])) {
        _set(seriesItem, 'itemStyle.color', this.barColor[index]);
        return false;
      }

      if (_isArray(this.barColor[index])) {
        const color = this.barColor[index];
        const lineColor = _cloneDeep(DEFAULT_LINE_COLOR);
        // 将传进来的数据进行分组进行颜色的渲染
        const colorSplit = 1 / color.length;
        const split = [];

        color.map((item, index) => {
          const splitItem = { offset: '', color: '' };

          splitItem.offset = index * colorSplit;
          splitItem.color = item;
          split.push(splitItem);
        });

        _set(lineColor, 'colorStops', split);
        _set(seriesItem, 'itemStyle.color', lineColor);
      }
    }
  }
};
