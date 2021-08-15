import echarts from 'echarts';
import _mergeWith from 'lodash/mergeWith';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import {
  defaultColorTheme,
  EVENT_LIST,
  LEGEND_EVENT_LIST
} from './constant/index';

export default function() {
  const coreChart = {
    props: {
      // 图表的宽度
      width: {
        type: String,
        default: '100%'
      },
      // 图表的宽度
      height: {
        type: String,
        default: '100%'
      },
      /**
       * @description 图表的背景颜色
       */
      backgroundColor: {
        type: String,
        default: ''
      },
      // 自定义样式
      ctCls: {
        type: String,
        default: ''
      },
      // 图表的数据，可为多维数组
      seriesData: {
        type: Array,
        default: () => []
      },
      // 图表相关数据的展示配置
      seriesOptions: {
        type: Array,
        default: () => []
      },
      // 图表的配置项，基于默认的配置进行拓展
      chartOptions: {
        type: Object | Function
        // default: () => {}
      },
      // 展示提示框
      showTooltip: {
        type: Boolean,
        default: true
      },
      // 提示框中的单位
      tooltipUnit: {
        type: Array | String,
        default: () => []
      },
      // 展示图例
      showLegend: {
        type: Boolean,
        default: true
      },
      /**
       * @description 图例的数据
       */
      legendData: {
        type: Array,
        default: () => []
      },
      // 颜色主题
      colorTheme: {
        type: Array,
        default: () => []
      },
      // 自动重绘
      autoResize: {
        type: Boolean,
        default: false
      },
      // 是否启动监听
      chartEvent: {
        type: Boolean,
        default: true
      },
      // 图表的布局
      grid: {
        type: Object,
        default: () => {}
      },
      // 是否启用图例相关事件
      legendEvent: {
        type: Boolean,
        default: true
      },
      // 常见的model
      chartModel: {
        type: String,
        default: ''
      },
      /**
       * @description 提示框个性化
       */
      formatter: {
        type: Function
      },
      /**
       * @description 图表的主题
       */
      theme: {
        type: String,
        default: 'light'
      }
    },
    watch: {
      autoResize: (newVal, oldVal) => {
        this.autoResizeChart();
      },
      theme: (newVal, oldVal) => {
        if (newVal !== oldVal) {
          this.initChart();
        }
      }
    },
    data() {
      return {
        options: {}
      };
    },
    methods: {
      /**
       * @description 设置基础的公共配置与属性
       */
      getCommonOptions() {
        this.COMMON_OPTION = {
          color: defaultColorTheme
        };

        this.EVENT_LIST = EVENT_LIST;

        this.LEGEND_EVENT_LIST = LEGEND_EVENT_LIST;
        this.THEME_MAP = {
          dark: 'darkTheme',
          light: 'lightTheme'
        };
      },
      /**
       * @description 图表渲染初始化
       */
      asyncInitChart() {
        let options = {};

        this.getCommonOptions();

        if (this.setDefaultOptions) {
          this.setDefaultOptions();
        }

        // 合并公共配置与各个图表组件个性配置
        options = _mergeWith(
          _cloneDeep(this.COMMON_OPTION),
          _cloneDeep(this.DEFAULT_OPTION)
        );

        if (this.setAxisData) {
          options.xAxis = this.setAxisData(options.xAxis, this.xAxisData);
          options.yAxis = this.setAxisData(options.yAxis, this.yAxisData);
        }

        // 设置图例
        this.setLegend(options);

        // 设置grid
        this.setGrid(options);

        // 设置提示框
        this.setTooltip(options);

        // 设置自定义主题
        if (this.colorTheme.length > 0) {
          options.color = this.colorTheme;
        }

        options.series = this.setSeriesData();

        // 每个组件自己的个性化配置
        if (this.setPersonalizationOptions) {
          this.setPersonalizationOptions(options);
        }

        // 也可以通过回调函数对原有的options进行改变
        if (typeof this.chartOptions === 'function') {
          options = this.chartOptions(options);
        } else {
          // 将外部传入的配置属性与初始属性进行合并
          options = _mergeWith(options, this.chartOptions);
        }

        const container = document.getElementById(this._uid);

        this['chart' + this._uid] = echarts.init(container);
        this['chart' + this._uid].setOption(options, true);
        this.options = _cloneDeep(options);

        // 绘制完成传递出去的事件
        this.$emit('complete', options);
        this.onChartEvent();
        this.autoResizeChart();
      },
      /**
       * @description 初始化图表
       */
      initChart() {
        this.$nextTick(() => {
          this.asyncInitChart();
        });
      },
      /**
       * @description 图表相关事件
       * @returns
       */
      onChartEvent() {
        if (!this.chartEvent) return false;

        if (!this['chart' + this._uid]) return false;

        // 为图表监听常用的鼠标事件
        this.EVENT_LIST.map(item => {
          this['chart' + this._uid].on(item, params => {
            // 将数据传去
            if (this[item + 'Event']) {
              this[item + 'Event'](this.options);
            }

            this.$emit(item, params);
          });
        });

        if (!this.legendEvent) {
          this['chart' + this._uid].on('legendselectchanged', params => {
            // 阻止默认事件（原理就是将点击的图例重新选中）
            this['chart' + this._uid].dispatchAction({
              type: 'legendSelect',
              name: params.name
            });
          });

          return false;
        }

        // 图表的图例相关事件
        Object.keys(this.LEGEND_EVENT_LIST).map(item => {
          this['chart' + this._uid].on(item, params => {
            this.$emit(item, params);
          });
        });
      },
      /**
       * @description 将默认的series的数据与传入的进行拼装
       * @returns { Array } series数组
       */
      setSeriesData() {
        const series = [];

        if (!this.seriesData.length) return [];

        // 如果是单项数据的话
        if (!(this.seriesData[0] instanceof Array)) {
          let seriesItem = _cloneDeep(this.DEFAULT_SERIES);

          if (this.seriesOptions.length) {
            seriesItem = _mergeWith(seriesItem, this.seriesOptions[0]);
          }

          seriesItem.data = this.seriesData;
          series.push(seriesItem);

          return series;
        }

        // 如果传入了多项数据的话
        this.seriesData.map((item, index) => {
          let seriesItem = _cloneDeep(this.DEFAULT_SERIES);

          if (!_isEmpty(this.seriesOptions[index])) {
            seriesItem = _mergeWith(seriesItem, this.seriesOptions[index]);
          }

          seriesItem.data = item;
          series.push(seriesItem);
        });

        return series;
      },
      /**
       * @description 设置提示框
       */
      setTooltip(options) {
        // 是否展示提示
        if (!this.showTooltip) {
          options.tooltip.show = false;
        }

        // 如果外部有formate函数传入，则以外部优先
        if (this.formatter) {
          options.tooltip.formatter = params => {
            return this.formatter(params);
          };

          return false;
        }

        // 如果传入的是数组的
        if (_isArray(this.tooltipUnit) && this.tooltipUnit.length) {
          options.tooltip.formatter = prams => {
            let formateContent = `${prams[0].axisValue}<br/>`;

            prams.map((item, index) => {
              formateContent += `${item.seriesName}
              ${item.seriesName ? ': ' : ''}
              ${item.value}
              ${
                this.tooltipUnit[index]
                  ? '(' + this.tooltipUnit[index] + ')'
                  : ''
              }
              <br/>`;
            });

            return formateContent;
          };
        }

        // 如果传入的是单个单位的话
        if (!_isArray(this.tooltipUnit) && this.tooltipUnit) {
          options.tooltip.formatter = prams => {
            let formateContent = `${prams[0].axisValue}<br/>`;

            prams.map(item => {
              formateContent += `${item.seriesName}
              ${item.seriesName ? ': ' : ''}
              ${item.value}
              ${this.tooltipUnit ? '(' + this.tooltipUnit + ')' : ''}
              <br/>`;
            });

            return formateContent;
          };
        }
      },
      /**
       * @description 设置图例
       * @param { Object } 图表配置项
       */
      setLegend(options) {
        if (!this.showLegend || !this.seriesOptions.length) {
          _set(options, 'legend.show', false);
          options.legend.show = false;
          _set(options, 'grid.top', '4%');
          return false;
        }

        if (!this.seriesOptions || !this.seriesOptions.length) return false;

        if (this.legendData.length) {
          const legendData = this.legendData.map(item => {
            return {
              name: item
            };
          });

          _set(options, 'legend.data', legendData);
          return false;
        }

        const legendData = this.seriesOptions.map(item => item.name);

        _set(options, 'legend.data', legendData);
      },
      /**
       * @description 设置 图表的布局
       * @param {*} options 图表的配置参数
       * @returns
       */
      setGrid(options) {
        if (_isEmpty(this.grid)) return false;

        options.grid = _mergeWith(_cloneDeep(options.grid), this.grid);
      },
      /**
       * @description 彻底重绘
       */
      emptyChartResize() {
        if (this['chart' + this._uid]) {
          this['chart' + this._uid].dispose();
        }

        this.initChart();
      },
      /**
       * @description 自动重绘图表
       */
      autoResizeChart() {
        if (!this.autoResize) {
          return false;
        }

        window.addEventListener('resize', this.resizeChart);
      },
      /**
       * @description 重绘图表
       */
      resizeChart() {
        if (this['chart' + this._uid]) {
          this['chart' + this._uid].resize();
        }
      },
      /**
       * @description 手动设置echarts变量
       */
      setOptions(options) {
        const container = document.getElementById(this._uid);

        this['chart' + this._uid] = echarts.init(container);
        this['chart' + this._uid].setOption(options);
      },
      /**
       * @description 获取设置的图表的options
       * @returns { Object } options
       */
      getChartOptions() {
        return this.options;
      },
      /**
       * @description 获取图表当前的设置信息
       * @returns
       */
      getChartCurrentOptions() {
        return this['chart' + this._uid].getOption();
      },
      /**
       * @description 获取当前的chart对象
       */
      getChartObj() {
        return this['chart' + this._uid];
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeChart);
    },
    render(h) {
      return h(
        'div',
        {
          attrs: {
            id: this._uid + 'container'
          },
          style: {
            width: this.width,
            height: this.height,
            position: 'relative'
          },
          class: {
            [this.ctCls]: this.ctCls,
            'chart-content': true
          }
        },
        [
          h('div', { slot: 'default' }, this.$slots.default),
          h(
            'div',
            {
              attrs: {
                id: this._uid
              },
              style: {
                width: '100%',
                height: '100%'
              },
              class: {
                [this.ctCls]: this.ctCls,
                'chart-content': true
              }
            },
            []
          )
        ]
      );
    }
  };

  return coreChart;
}
