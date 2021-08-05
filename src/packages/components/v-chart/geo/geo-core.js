import echarts from 'echarts';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import _mergeWith from 'lodash/mergeWith';

import { httpGet } from '../utils';

export const geo = {
  name: 'BaseGeoChart',
  props: {
    // 地图的中心点
    mapCenter: {
      type: Array,
      default: () => []
    },
    /**
     * @description 地图的背景颜色
     */
    backgroundColor: {
      type: String,
      default: '#131C38'
    },
    // 地图json相关的路由
    mapUrl: {
      type: String,
      default: ''
    },
    // 外部传入的请求地址
    areaCode: {
      type: String | Number,
      default: '330000'
    },
    // 地图的放大比例
    zoom: {
      type: Number,
      default: 5
    },
    // z轴的高度
    zLevel: {
      type: Number,
      default: 0
    },
    // 是否支持下钻
    drillDown: {
      type: Boolean,
      default: false
    },
    // 是否展示为3d模式
    threeDimensional: {
      type: Boolean,
      default: true
    },
    /**
     * @description 颜色区间
     */
    colorList: {
      type: Array,
      default: () => []
    },
    /**
     * @description 是否展示提示框
     */
    showTooltip: {
      type: Boolean,
      default: true
    },
    /**
     * @description 提示框个性化
     */
    formatter: {
      type: Function
    },
    /**
     * @description 外部注入的样式
     */
    ctCls: {
      type: String,
      default: ''
    },
    /**
     * @description 颜色过滤 外部传入传入的函数
     */
    colorFilter: {
      type: Function
    },
    /**
     * @description 区域颜色
     */
    areaColor: {
      type: Object | String,
      default: () => {}
    },
    /**
     * @description 边框颜色
     */
    borderColor: {
      type: String,
      default: ''
    },
    /**
     * @description 鼠标移上去地图边框颜色
     */
    hoverBorderColor: {
      type: String,
      default: ''
    },
    /**
     * @description 鼠标移到区域上展示的颜色
     */
    hoverAreaColor: {
      type: Object | String,
      default: () => {}
    },
    /**
     * @description 提示框样式自定义方法
     */
    toolTipForMatter: {
      type: Function
    },
    // 是否启动监听
    chartEvent: {
      type: Boolean,
      default: true
    },
    /**
     * @description 自定义配置项
     */
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    this.DEFAULT_OPTION = {
      backgroundColor: this.backgroundColor,
      tooltip: {
        trigger: 'item',
        show: this.showTooltip,
        enterable: true,
        textStyle: {
          fontSize: 20,
          color: '#fff'
        },
        backgroundColor: 'rgba(0,2,89,0.8)',
        formatter: '{b}<br />{c}'
      },
      geo: {
        map: '',
        aspectScale: 0.9,
        roam: false, // 是否允许缩放
        zoom: 1.2, // 默认显示级别
        layoutSize: '100%',
        show: true,
        layoutCenter: ['55%', '50%'],
        label: {
          normal: {
            show: true,
            fontSize: '14',
            color: 'rgba(255,255,255,1)'
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#013C62',
            shadowColor: '#013C62',
            shadowBlur: 20,
            shadowOffsetX: -5,
            shadowOffsetY: 15
          }
        },
        zlevel: 1
      },
      series: []
    };

    this.DEFAULT_SERIES = {
      name: '',
      type: '',
      data: []
    };

    this.DEFAULT_LINE_COLOR = {
      type: 'linear-gradient',
      x: 0,
      y: 300,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(37,108,190,1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(15,169,195,1)' // 50% 处的颜色
        }
      ],
      global: true // 缺省为 false
    };

    this.chartType = 'map';

    return {
      // 区域数据
      areaData: [],
      // 当时静态的时候将数据保存
      allAreaMapData: []
    };
  },
  methods: {
    /**
     * @description 默认获取
     */
    async initGeo(code = '') {
      if (this.mapUrl) {
        const res = await httpGet(this.mapUrl);

        if (this.allAreaMapData.length === 0) {
          this.allAreaMapData = res;
        }

        this.areaData = res;
        this.initGeoData();
        return false;
      }

      const mapData = await this.getGeoJson(code || this.areaCode);

      this.areaData = mapData;
      this.initGeoData();
    },
    /**
     * @description 根据高德组件获取相关的数据
     */
    getGeoJson(adcode, childAdcode = '') {
      // eslint-disable-next-line no-undef
      if (!AMapUI) {
        console.log('未引入高德相关配置');
        return false;
      }

      if (!adcode) {
        console.log('未传入areaCode');
        return false;
      }

      return new Promise((resolve, reject) => {
        function insideFun(adcode, childAdcode) {
          // eslint-disable-next-line no-undef
          AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
            const districtExplorer = new DistrictExplorer();

            districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                console.error(error);
                reject(error);
                return;
              }

              let Json = areaNode.getSubFeatures();

              if (Json.length === 0) {
                const parent =
                  areaNode._data.geoData.parent.properties.acroutes;

                insideFun(parent[parent.length - 1], adcode);
                return;
              }

              if (childAdcode) {
                Json = Json.filter(item => {
                  return item.properties.adcode === childAdcode;
                });
              }

              const mapJson = {
                features: Json
              };

              resolve(mapJson);
            });
          });
        }

        insideFun(adcode, childAdcode);
      });
    },
    /**
     * @description 初始化地图数据与整合echarts配置项
     */
    initGeoData() {
      const mapName = this._uid + 'map';
      const container = document.getElementById(this._uid);
      let options = _cloneDeep(this.DEFAULT_OPTION);

      options.geo.map = mapName;

      this['chart' + this._uid] = echarts.init(container);

      // 设置正常展示时地图颜色
      this.setAreaColor(this.areaColor, options);

      // 设置鼠标移上去时地图的颜色
      this.setHoverColor(options);
      // 设置地图的3d效果
      if (this.threeDimensional) this.setThreeDimensional(options, mapName);

      // 外部传入的颜色过滤方法
      if (this.colorFilter) {
        const areaColorList = this.colorFilter(this.areaData.features);

        options.geo.regions = areaColorList;
      }

      // 如果其他组件有自己的个性化设置
      if (this.setIndividuationOptions) {
        this.setIndividuationOptions(options);
      }

      // tooltip的格式可以从外部传入
      if (this.formatter) {
        options.tooltip.formatter = params => {
          return this.formatter(params);
        };
      }

      // 将外部传入的配置属性与初始属性进行合并
      options = _mergeWith(options, this.chartOptions);
      this.options = options;
      echarts.registerMap(mapName, this.areaData);
      this['chart' + this._uid].setOption(options);

      this.setDrillDown();
    },
    /**
     * @description 设置相关的区域的颜色
     * @param { Object | String } color 颜色
     * @param { Object }  options 配置项
     */
    setAreaColor(color, options) {
      if (color === '' || _isEmpty(color)) return false;

      if (typeof color === 'string') {
        options.geo.itemStyle.normal.areaColor = color;
      }

      if (_isArray(color)) {
        const lineColor = _cloneDeep(this.DEFAULT_LINE_COLOR);
        // 将传进来的数据进行分组进行颜色的渲染
        const colorSplit = 1 / color.length;
        const split = [];

        color.map((item, index) => {
          const splitItem = { offset: '', color: '' };

          splitItem.offset = index * colorSplit;
          splitItem.color = item;
          split.push(splitItem);
        });

        options.geo.itemStyle.normal.areaColor = lineColor;
        options.geo.itemStyle.normal.areaColor.colorStops = split;
      }
    },
    /**
     * @description 设置鼠标移上去的颜色与效果
     */
    setHoverColor(options) {
      if (!this.hoverAreaColor) return false;

      const hoverColor = _cloneDeep(this.hoverAreaColor);

      if (typeof hoverColor === 'string') {
        options.geo.emphasis.itemStyle.areaColor = hoverColor;
        return true;
      }

      if (_isArray(hoverColor)) {
        // 将传进来的数据进行分组进行颜色的渲染
        const colorSplit = 1 / hoverColor.length;
        const split = [];

        hoverColor.map((item, index) => {
          const splitItem = { offset: '', color: '' };

          splitItem.offset = index * colorSplit;
          splitItem.color = item;
          split.push(splitItem);
        });

        options.geo.emphasis.itemStyle.areaColor = this.DEFAULT_LINE_COLOR;
        options.geo.emphasis.itemStyle.areaColor.colorStops = split;
      }
    },
    /**
     * @description 设置3d效果
     * @param { Object } options 地图配置项
     */
    setThreeDimensional(options, name) {
      return false;
    },
    /**
     * @description 地图的下钻功能
     */
    setDrillDown() {
      if (!this.drillDown) return false;

      this['chart' + this._uid].on('click', res => {
        this.$emit('click', res);

        this.setGeoDrillDown(res.name);
      });
    },
    /**
     * @description 设置高德地图下钻的功能
     * @param { String } name 城市的名称
     */
    setGeoDrillDown(name) {
      if (this.url) {
        console.log('暂不支持静态数据地图下钻');
        return false;
      }

      const chooseCity = this.areaData.features.find(
        item => item.properties.name === name
      );

      if (!chooseCity) return;

      this.$emit('currentArea', { name, adcode: chooseCity.properties.adcode });

      this['chart' + this._uid].off('click');
      this['chart' + this._uid].dispose();
      this.initGeo(chooseCity.properties.adcode);
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
  render(h) {
    return h(
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
    );
  }
};
