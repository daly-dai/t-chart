/**
 * @desc 菜单 mock
 */
import Mock from 'mockjs2';
import { builder } from '../util';

const getMenu = options => {
  const aMenuList = [
    {
      id: 1,
      menuCode: 'v-chart',
      menuName: '图表示例',
      menuUrl: '/v-chart',
      iconUrl: 'svg-center-info',
      children: [
        {
          id: 2,
          menuCode: 'bar',
          menuName: '柱状图',
          menuUrl: '/bar',
          iconUrl: 'svg-study-template'
        },
        {
          id: 3,
          menuCode: 'line',
          menuName: '折线图',
          menuUrl: '/line',
          iconUrl: 'svg-study-template'
        },
        {
          id: 3,
          menuCode: 'pie',
          menuName: '饼状图',
          menuUrl: '/pie',
          iconUrl: 'svg-study-template'
        }
      ]
    }
  ];
  return builder(aMenuList);
};

Mock.mock(/\/mock\/index\/menu/, 'get', getMenu); // 菜单
const getCascaderMenu = options => {
  const cascaderList = [
    {
      value: 'zhinan',
      label: '指南',
      childrenList: [
        {
          value: 'shejiyuanze',
          label: '设计原则',
          childrenList: [
            {
              value: 'yizhi',
              label: '一致'
            },
            {
              value: 'fankui',
              label: '反馈'
            },
            {
              value: 'xiaolv',
              label: '效率'
            },
            {
              value: 'kekong',
              label: '可控'
            }
          ]
        },
        {
          value: 'daohang',
          label: '导航',
          childrenList: [
            {
              value: 'cexiangdaohang',
              label: '侧向导航'
            },
            {
              value: 'dingbudaohang',
              label: '顶部导航'
            }
          ]
        }
      ]
    }
  ];
  return builder(cascaderList);
};
Mock.mock(/\/mock\/index\/getCascaderMenu/, 'get', getCascaderMenu); // 级联面板
