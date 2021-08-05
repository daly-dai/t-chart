export const groupBar = {
  name: 'BaseGroupBarChart',
  props: {
    /**
     * @description 分组的数据
     */
    groupData: {
      type: Object | Array
    },
    /**
     * @description 分组的布局设置
     */
    groupGird: {
      type: Array
    },
    // 默认展示数据的字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 默认数据的字段
    valueField: {
      type: String,
      default: 'data'
    }
  },
  methods: {
    /**
     * @description 获取
     */
    getExtraDefaultOptions() {
      this.groupGird = [
        {
          top: 100,
          bottom: 101
        },
        {
          height: 40,
          bottom: 20
        }
      ];

      this.groupXaxisItem = {
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
    },
    /**
     * @description 配置额外的配置
     */
    setExtraOptions(options) {
      // if(!this.seriesData.length)
    }
  }
};
