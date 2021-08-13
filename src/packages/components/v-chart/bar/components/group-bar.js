import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _keys from 'lodash/keys';
import _get from 'lodash/get';
import { getGradientColor } from '../../utils';

export const groupBar = {
  name: 'BaseGroupBarChart',
  props: {
    // 分组柱状图的参数
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value'
        };
      }
    },
    /**
     * @description 分组的数据
     */
    groupData: {
      type: Object | Array
    },
    /**
     * @description 分组的颜色
     */
    groupColor: {
      type: Array | Function
    },
    /**
     * @description 分组的布局设置
     */
    groupGird: {
      type: Array
    },
    /**
     * @description 默认展示数据的字段
     */
    displayField: {
      type: String,
      default: 'name'
    },
    /**
     * @description 默认数据的字段
     */
    valueField: {
      type: String,
      default: 'data'
    },
    childrenField: {
      type: String,
      default: 'children'
    },
    /**
     * @description 底部分组的背景颜色
     */
    groupColorList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description 获取当前组件的默认配置
     */
    getExtraDefaultOptions() {
      this.defaultGroupGird = [
        {
          top: '4%',
          bottom: 80
        },
        {
          height: 40,
          bottom: 20
        }
      ];

      this.groupXAxis = {
        type: 'category',
        gridIndex: 1,
        axisLine: {
          show: false
        },
        zlevel: 1
      };

      this.groupYAxis = {
        type: 'value',
        gridIndex: 1,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      };

      this.groupSeriesItem = {
        data: [
          {
            name: '',
            value: 1
          }
        ],
        label: {
          show: true,
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#333'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '',
        itemStyle: {
          normal: {
            color: 'rgba(40,191,126, 1)'
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      };

      this.groupBarColor = [];
    },
    /**
     * @description 配置额外的配置
     */
    setExtraOptions(options) {
      this.getExtraDefaultOptions();

      // 设置gird
      _set(options, 'grid', this.defaultGroupGird);

      // 设置x轴
      if (options.xAxis) {
        if (_isObject(options.xAxis)) {
          const defaultXAxis = _cloneDeep(options.xAxis);

          options.xAxis = [];
          options.xAxis.push(defaultXAxis);
        }
        options.xAxis.push(_cloneDeep(this.groupXAxis));
      }

      // 填充y轴
      if (options.yAxis) {
        if (_isObject(options.yAxis)) {
          const defaultYAxis = _cloneDeep(options.xAxis);

          options.yAxis = [];
          options.yAxis.push(defaultYAxis);
        }

        options.yAxis.push(_cloneDeep(this.groupYAxis));
      }

      // 设置分组的背景颜色
      const bgColor = _get(options, 'backgroundColor');

      _set(this.groupSeriesItem, 'itemStyle.normal.color', bgColor);

      // 常用的设置
      this.setGroupSeries(this.groupSeriesItem, options);

      if (this.groupColor) {
        this.setGroupBarColor(options.series);
      }
    },
    /**
     * @description 对series进行初始化设置
     * @param {Object} options 图表的配置项
     */
    setGroupSeries(seriesObj, options) {
      options.series = [];

      if (_isArray(this.groupData)) {
        this.setGroupArraySeriesData(seriesObj, options);

        return false;
      }

      if (_isObject(this.groupData)) {
        this.setGroupObjSeriesData(seriesObj, options);
      }
    },
    /**
     * @description groupData为对象时
     * @param { Object } seriesObj 当前的默认series配置
     * @param { Object } options 图表的配置项
     */
    setGroupObjSeriesData(seriesObj, options) {
      const groupNameList = _keys(this.groupData);
      const childList = [];
      const seriesItem = _cloneDeep(this.DEFAULT_SERIES);
      const setColorStatus = _isArray(this.groupColor);

      groupNameList.map((key, index) => {
        const list = this.groupData[key];

        childList.push(list);

        (list || []).map(ele => {
          options.xAxis[0].data.push(ele[this.props.label]);
          seriesItem.data.push(ele[this.props.value]);
          // 设置分组颜色
          if (setColorStatus) {
            this.groupBarColor.push(this.groupColor[index] || '');
          }
        });
      });

      options.series.push(seriesItem);

      groupNameList.map(key => {
        const item = _cloneDeep(seriesObj);
        const width =
          (this.groupData[key].length / childList.length) * 100 + '%';

        _set(item, 'data[0].name', key);
        _set(item, 'barWidth', width);

        options.series.push(item);
      });
    },
    /**
     * @description groupData为数组时
     * @param { Object } seriesObj 当前的默认series配置
     * @param { Object } options 图表的配置项
     */
    setGroupArraySeriesData(seriesObj, options) {
      let childList = [];
      const seriesItem = _cloneDeep(this.DEFAULT_SERIES);
      const setColorStatus = _isArray(this.groupColor);

      this.groupData.map((item, index) => {
        if (item[this.props.children] && item[this.props.children].length) {
          const list = item[this.props.children];

          childList = childList.concat(list);

          list.map(ele => {
            options.xAxis[0].data.push(ele[this.props.label]);
            seriesItem.data.push(ele[this.props.value]);
            if (setColorStatus) {
              this.groupBarColor.push(this.groupColor[index] || '');
            }
          });
        }
      });

      options.series.push(seriesItem);

      this.groupData.map(item => {
        const seriesItem = _cloneDeep(seriesObj);

        const width =
          (item[this.props.children].length / childList.length) * 100 + '%';

        _set(seriesItem, 'data[0].name', item[this.props.label]);
        _set(seriesItem, 'barWidth', width);

        options.series.push(seriesItem);
      });
    },
    /**
     * @description 设置柱状图柱状图
     * @param { Object } series 配置
     */
    setGroupBarColor(series) {
      const seriesItem = series[0];

      if (typeof this.groupColor === 'function') {
        seriesItem.itemStyle.color = params => {
          return this.groupColor(params);
        };

        return false;
      }

      if (!_isArray(this.groupColor)) return false;
      if (!this.groupBarColor.length) return false;

      if (this.groupColor.length === _get(seriesItem, 'data').length) {
        seriesItem.itemStyle.color = params => {
          return this.groupColor[params.dataIndex];
        };

        return false;
      }

      seriesItem.itemStyle.color = params => {
        const currentColor = this.groupBarColor[params.dataIndex];

        return _isArray(currentColor)
          ? getGradientColor(currentColor)
          : currentColor;
      };
    }
  }
};
