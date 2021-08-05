import Mock from 'mockjs2';
import { builder, getQueryParameters } from '../util';

const treeList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  let result = [];
  /* for (let i = 1; i < 12; i++) {
    result.push({
      id: i,
      label: '一级 1',
      children: [
        {
          label: '二级 1-1'
        }
      ]
    });
  } */
  result = [
    {
      id: 1,
      label: '一级 1',
      disabled: false, // 如果需要通过 base-tree 的属性 disabledNodes 来达到禁用节点的效果，那么在源数据中就要添加 disabled 字段，让数据是响应式的
      children: [
        {
          id: 4,
          label: '二级 1-1',
          disabled: false,
          children: [
            {
              id: 9,
              label: '三级 1-1-1',
              disabled: false
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      disabled: false,
      children: [
        {
          id: 5,
          label: '二级 2-1',
          disabled: false,
          children: [
            {
              id: 10,
              label: '三级 2-1-1',
              disabled: false
            }
          ]
        },
        {
          id: 6,
          label: '二级 2-2',
          disabled: false,
          children: [
            {
              id: 11,
              label: '三级 2-2-1',
              disabled: false
            }
          ]
        },
        {
          id: 14,
          label: '二级 2-3',
          disabled: false,
          children: [
            {
              id: 15,
              label: '三级 2-3-1',
              disabled: false
            },
            {
              id: 16,
              label: '三级 2-3-2',
              disabled: false
            }
          ]
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      disabled: false,
      children: [
        {
          id: 7,
          label: '二级 3-1',
          disabled: false,
          children: [
            {
              id: 12,
              label: '三级 3-1-1',
              disabled: false
            }
          ]
        },
        {
          id: 8,
          label: '二级 3-2',
          disabled: false,
          children: [
            {
              id: 13,
              label: '三级 3-2-1',
              disabled: false
            },
            {
              id: 17,
              label: '三级 3-2-2',
              disabled: false
            }
          ]
        }
      ]
    }
  ];
  return builder(result);
};
const complicateTreeList = options => {
  console.log('complicateTreeList 搜索', options);
  const aMenuList = [
    // models: [
    {
      id: 1,
      menuCode: 'needs',
      menuName: '路由嵌套',
      menuUrl: '',
      iconUrl: 'svg-center-info',
      children: [
        {
          id: 7,
          menuCode: 'loan',
          menuName: '据外媒11月26日报道，菲律宾国防部长德尔芬·洛伦扎纳警告称',
          menuUrl: '/loan',
          iconUrl: 'svg-study-template',
          buttons: [{ name: '上传', code: 'upload', status: 1 }],
          children: [
            {
              id: 27,
              menuCode: 'record',
              menuName: '管理-录入',
              menuUrl: '/record',
              iconUrl: 'svg-sys-government',
              buttons: [
                { name: '添加', code: 'add', status: 0 },
                { name: '启用', code: 'using', status: 1 }
              ]
            },
            {
              id: 30,
              menuCode: 'assess',
              menuName: '管理-评审',
              menuUrl: '/assess',
              iconUrl: 'el-icon-view'
            }
          ]
        },
        {
          id: 8,
          disabled: false,
          menuCode: 'fund-collect',
          menuName: '基金募集管理',
          menuUrl: '/fund-collect',
          iconUrl: 'svg-enter-state'
        },
        {
          id: 37,
          menuCode: 'open-out-view',
          menuName: '打开新窗口',
          menuUrl: '/open-out-view',
          iconUrl: 'el-icon-document-copy',
          hrefType: 'out' // out 外部打开（会以新窗口的形式打开），in 内部打开（普通路由形式）
        }
      ]
    },
    {
      id: 16,
      menuCode: 'echarts',
      menuName: '图表展示',
      menuUrl: '',
      iconUrl: 'el-icon-s-data',
      children: [
        {
          id: 17,
          menuCode: 'line',
          menuName: '折线',
          menuUrl: '/line',
          iconUrl: 'svg-chart-line',
          children: [
            {
              id: 18,
              menuCode: 'one',
              menuName: '示例1',
              menuUrl: '/one',
              iconUrl: ''
            },
            {
              id: 19,
              menuCode: 'two',
              menuName: '示例2',
              menuUrl: '/two',
              iconUrl: ''
            }
          ]
        }
      ]
    },
    {
      id: 12,
      menuCode: 'user',
      menuName: '用户管理',
      menuUrl: '/user',
      iconUrl: 'el-icon-s-check'
    },
    {
      id: 15,
      menuCode: 'dialog',
      menuName: '对话框',
      menuUrl: '/dialog',
      iconUrl: 'el-icon-files',
      children: [
        {
          id: 24,
          menuCode: 'index',
          menuName: '对话框',
          menuUrl: '/index',
          iconUrl: 'el-icon-s-grid',
          check: true // 默认选中
        },
        {
          id: 25,
          menuCode: 'drawer',
          menuName: '抽屉',
          menuUrl: '/drawer',
          iconUrl: 'iconfont iconchouti'
        }
      ]
    },
    {
      id: 2,
      menuCode: 'grid',
      menuName: 'Grid 列表',
      menuUrl: '/grid',
      iconUrl: 'el-icon-s-grid',
      children: [
        {
          id: 20,
          menuCode: 'base-grid',
          menuName: '基础-grid',
          menuUrl: '/base-grid',
          iconUrl: 'el-icon-s-grid',
          check: true, // 默认选中
          buttons: [
            { id: 10, name: '添加', code: 'add', status: 0 },
            { id: 11, name: '删除', code: 'delete', status: 1 }
          ]
        },
        {
          id: 21,
          menuCode: 'roll-grid',
          menuName: '滚动-grid',
          menuUrl: '/roll-grid',
          iconUrl: 'el-icon-c-scale-to-original'
        },
        {
          id: 43,
          menuCode: 'expand-grid',
          menuName: '展开-grid',
          menuUrl: '/expand-grid',
          iconUrl: 'el-icon-d-caret'
        },
        {
          id: 39,
          menuCode: 'options-grid',
          menuName: '静态数据-grid',
          menuUrl: '/options-grid',
          iconUrl: 'el-icon-s-grid'
        },
        {
          id: 41,
          menuCode: 'select-grid',
          menuName: '下拉-grid',
          menuUrl: 'select-grid',
          iconUrl: 'el-icon-s-grid'
        }
      ]
    },
    {
      id: 22,
      menuCode: 'tree',
      menuName: 'tree 树形控件',
      menuUrl: '/tree',
      iconUrl: 'el-icon-share',
      children: [
        {
          id: 23,
          menuCode: 'base-tree',
          menuName: '基础-tree',
          menuUrl: '/base-tree',
          iconUrl: 'el-icon-share'
        },
        {
          id: 32,
          menuCode: 'base-select-tree',
          menuName: 'select-tree',
          menuUrl: 'base-select-tree',
          iconUrl: 'iconfont iconxialashu'
        },
        {
          id: 42,
          menuCode: 'base-roll-tree',
          menuName: '滚动样式-tree',
          menuUrl: 'base-roll-tree',
          iconUrl: 'el-icon-c-scale-to-original'
        }
      ]
    },
    {
      id: 26,
      menuCode: 'dropdown',
      menuName: '下拉菜单',
      menuUrl: '/dropdown',
      iconUrl: 'el-icon-c-scale-to-original'
    },
    {
      id: 28,
      menuCode: 'form',
      menuName: '表单',
      menuUrl: '/form',
      iconUrl: 'svg-report-review'
    },
    {
      id: 5,
      menuCode: 'personal',
      menuName: '个人中心',
      menuUrl: '/personal',
      iconUrl: 'el-icon-user',
      buttons: [
        { id: 12, name: '添加', code: 'add', status: 0 },
        { id: 13, name: '删除', code: 'delete', status: 1 }
      ]
    },
    {
      id: 29,
      menuCode: 'zjs-province',
      menuName: '浙江省',
      menuUrl: '/zjs-province',
      iconUrl: 'el-icon-user',
      // 是否在组内展示，true 展示 false 隐藏，注意：如果是父级菜单设置为 false 那么如果单独展示该菜单的子级菜单需要使用 menuId 来获取，但是如果菜单的子级菜单中有 false 的子菜单那么还是不会展示
      isGroupShow: false,
      children: [
        {
          id: 31,
          menuCode: 'hz-city',
          menuName: '杭州市',
          menuUrl: 'hz-city',
          iconUrl: 'el-icon-eleme',
          children: [
            {
              id: 34,
              menuCode: 'jgq-area',
              menuName: '江干区',
              menuUrl: 'jgq-area',
              iconUrl: 'el-icon-circle-check'
            },
            {
              id: 35,
              menuCode: 'xh-area',
              menuName: '西湖区',
              menuUrl: 'xh-area',
              iconUrl: 'el-icon-video-camera'
            }
          ]
        },
        {
          id: 33,
          menuCode: 'jx-city',
          menuName: '嘉兴市',
          menuUrl: 'jx-city',
          iconUrl: 'el-icon-star-off'
        }
      ]
    },
    {
      id: 36,
      menuCode: 'view-collapse',
      menuName: '视图-折叠面板',
      menuUrl: '/view-collapse',
      iconUrl: 'el-icon-document-copy'
    },
    {
      id: 38,
      menuCode: 'wang-editor',
      menuName: '富文本编辑器',
      menuUrl: '/wang-editor',
      iconUrl: 'el-icon-reading'
    },
    {
      id: 40,
      menuCode: 'condition',
      menuName: '多重筛选',
      menuUrl: '',
      iconUrl: 'el-icon-s-data',
      children: [
        {
          id: 49,
          menuCode: 'condition',
          menuName: '示例',
          menuUrl: '/condition',
          iconUrl: 'el-icon-picture-outline',
          children: []
        }
      ]
    }
    // ]
  ];
  return builder(aMenuList);
};
const countyList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  let result = [];
  result = [
    {
      id: 1,
      label: '杭州市',
      children: [
        {
          id: 2,
          label: '江干区'
        },
        {
          id: 3,
          label: '西湖区'
        },
        {
          id: 4,
          label: '上城区'
        },
        {
          id: 5,
          label: '下城区'
        },
        {
          id: 6,
          label: '拱墅区'
        },
        {
          id: 7,
          label: '江干区'
        },
        {
          id: 8,
          label: '滨江区'
        },
        {
          id: 9,
          label: '萧山区'
        }
      ]
    }
  ];
  return builder(result);
};
const industryList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  const result = [
    {
      id: 1952,
      year: '2017',
      code: 'A',
      industryname: '农、林、牧、渔业 ',
      description: null,
      industrycode: 'A',
      levels: 0,
      children: [
        {
          id: 1,
          year: '2017',
          code: '01',
          industryname: '农业',
          description: null,
          industrycode: 'A',
          levels: 1
        },
        {
          id: 2,
          year: '2017',
          code: '02',
          industryname: '林业',
          description: null,
          industrycode: 'A',
          levels: 1
        },
        {
          id: 3,
          year: '2017',
          code: '03',
          industryname: '畜牧业',
          description: null,
          industrycode: 'A',
          levels: 1
        },
        {
          id: 4,
          year: '2017',
          code: '04',
          industryname: '渔业',
          description: null,
          industrycode: 'A',
          levels: 1
        },
        {
          id: 5,
          year: '2017',
          code: '05',
          industryname: '农、林、牧、渔专业及辅助性活动',
          description: null,
          industrycode: 'A',
          levels: 1
        }
      ]
    },
    {
      id: 1953,
      year: '2017',
      code: 'B',
      industryname: '采矿业',
      description: null,
      industrycode: 'B',
      levels: 0,
      children: [
        {
          id: 6,
          year: '2017',
          code: '06',
          industryname: '煤炭开采和洗选业',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 7,
          year: '2017',
          code: '07',
          industryname: '石油和天然气开采业',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 8,
          year: '2017',
          code: '08',
          industryname: '黑色金属矿采选业',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 9,
          year: '2017',
          code: '09',
          industryname: '有色金属矿采选业',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 10,
          year: '2017',
          code: '10',
          industryname: '非金属矿采选业',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 11,
          year: '2017',
          code: '11',
          industryname: '开采专业及辅助性活动',
          description: null,
          industrycode: 'B',
          levels: 1
        },
        {
          id: 12,
          year: '2017',
          code: '12',
          industryname: '其他采矿业',
          description: null,
          industrycode: 'B',
          levels: 1
        }
      ]
    },
    {
      id: 1954,
      year: '2017',
      code: 'C',
      industryname: '制造业',
      description: null,
      industrycode: 'C',
      levels: 0,
      children: [
        {
          id: 13,
          year: '2017',
          code: '13',
          industryname: '农副食品加工业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 14,
          year: '2017',
          code: '14',
          industryname: '食品制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 15,
          year: '2017',
          code: '15',
          industryname: '酒、饮料和精制茶制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 16,
          year: '2017',
          code: '16',
          industryname: '烟草制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 17,
          year: '2017',
          code: '17',
          industryname: '纺织业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 18,
          year: '2017',
          code: '18',
          industryname: '纺织服装、服饰业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 19,
          year: '2017',
          code: '19',
          industryname: '皮革、毛皮、羽毛及其制品和制鞋业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 20,
          year: '2017',
          code: '20',
          industryname: '木材加工和木、竹、藤、棕、草制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 21,
          year: '2017',
          code: '21',
          industryname: '家具制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 22,
          year: '2017',
          code: '22',
          industryname: '造纸和纸制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 23,
          year: '2017',
          code: '23',
          industryname: '印刷和记录媒介复制业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 24,
          year: '2017',
          code: '24',
          industryname: '文教、工美、体育和娱乐用品制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 25,
          year: '2017',
          code: '25',
          industryname: '石油、煤炭及其他燃料加工业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 26,
          year: '2017',
          code: '26',
          industryname: '化学原料和化学制品制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 27,
          year: '2017',
          code: '27',
          industryname: '医药制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 28,
          year: '2017',
          code: '28',
          industryname: '化学纤维制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 29,
          year: '2017',
          code: '29',
          industryname: '橡胶和塑料制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 30,
          year: '2017',
          code: '30',
          industryname: '非金属矿物制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 31,
          year: '2017',
          code: '31',
          industryname: '黑色金属冶炼和压延加工业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 32,
          year: '2017',
          code: '32',
          industryname: '有色金属冶炼和压延加工业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 33,
          year: '2017',
          code: '33',
          industryname: '金属制品业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 34,
          year: '2017',
          code: '34',
          industryname: '通用设备制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 35,
          year: '2017',
          code: '35',
          industryname: '专用设备制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 36,
          year: '2017',
          code: '36',
          industryname: '汽车制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 37,
          year: '2017',
          code: '37',
          industryname: '铁路、船舶、航空航天和其他运输设备制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 38,
          year: '2017',
          code: '38',
          industryname: '电气机械和器材制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 39,
          year: '2017',
          code: '39',
          industryname: '计算机、通信和其他电子设备制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 40,
          year: '2017',
          code: '40',
          industryname: '仪器仪表制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 41,
          year: '2017',
          code: '41',
          industryname: '其他制造业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 42,
          year: '2017',
          code: '42',
          industryname: '废弃资源综合利用业',
          description: null,
          industrycode: 'C',
          levels: 1
        },
        {
          id: 43,
          year: '2017',
          code: '43',
          industryname: '金属制品、机械和设备修理业',
          description: null,
          industrycode: 'C',
          levels: 1
        }
      ]
    },
    {
      id: 1955,
      year: '2017',
      code: 'D',
      industryname: '电力、热力、燃气及水生产和供应业',
      description: null,
      industrycode: 'D',
      levels: 0,
      children: [
        {
          id: 44,
          year: '2017',
          code: '44',
          industryname: '电力、热力生产和供应业',
          description: null,
          industrycode: 'D',
          levels: 1
        },
        {
          id: 45,
          year: '2017',
          code: '45',
          industryname: '燃气生产和供应业',
          description: null,
          industrycode: 'D',
          levels: 1
        },
        {
          id: 46,
          year: '2017',
          code: '46',
          industryname: '水的生产和供应业',
          description: null,
          industrycode: 'D',
          levels: 1
        }
      ]
    },
    {
      id: 1956,
      year: '2017',
      code: 'E',
      industryname: '建筑业',
      description: null,
      industrycode: 'E',
      levels: 0,
      children: [
        {
          id: 47,
          year: '2017',
          code: '47',
          industryname: '房屋建筑业',
          description: null,
          industrycode: 'E',
          levels: 1
        },
        {
          id: 48,
          year: '2017',
          code: '48',
          industryname: '土木工程建筑业',
          description: null,
          industrycode: 'E',
          levels: 1
        },
        {
          id: 49,
          year: '2017',
          code: '49',
          industryname: '建筑安装业',
          description: null,
          industrycode: 'E',
          levels: 1
        },
        {
          id: 50,
          year: '2017',
          code: '50',
          industryname: '建筑装饰、装修和其他建筑业',
          description: null,
          industrycode: 'E',
          levels: 1
        }
      ]
    },
    {
      id: 1957,
      year: '2017',
      code: 'F',
      industryname: '批发和零售业',
      description: null,
      industrycode: 'F',
      levels: 0,
      children: [
        {
          id: 51,
          year: '2017',
          code: '51',
          industryname: '批发业',
          description: null,
          industrycode: 'F',
          levels: 1
        },
        {
          id: 52,
          year: '2017',
          code: '52',
          industryname: '零售业',
          description: null,
          industrycode: 'F',
          levels: 1
        }
      ]
    },
    {
      id: 1958,
      year: '2017',
      code: 'G',
      industryname: '交通运输、仓储和邮政业',
      description: null,
      industrycode: 'G',
      levels: 0,
      children: [
        {
          id: 53,
          year: '2017',
          code: '53',
          industryname: '铁路运输业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 54,
          year: '2017',
          code: '54',
          industryname: '道路运输业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 55,
          year: '2017',
          code: '55',
          industryname: '水上运输业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 56,
          year: '2017',
          code: '56',
          industryname: '航空运输业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 57,
          year: '2017',
          code: '57',
          industryname: '管道运输业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 58,
          year: '2017',
          code: '58',
          industryname: '多式联运和运输代理业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 59,
          year: '2017',
          code: '59',
          industryname: '装卸搬运和仓储业',
          description: null,
          industrycode: 'G',
          levels: 1
        },
        {
          id: 60,
          year: '2017',
          code: '60',
          industryname: '邮政业',
          description: null,
          industrycode: 'G',
          levels: 1
        }
      ]
    },
    {
      id: 1959,
      year: '2017',
      code: 'H',
      industryname: '住宿和餐饮业',
      description: null,
      industrycode: 'H',
      levels: 0,
      children: [
        {
          id: 61,
          year: '2017',
          code: '61',
          industryname: '住宿业',
          description: null,
          industrycode: 'H',
          levels: 1
        },
        {
          id: 62,
          year: '2017',
          code: '62',
          industryname: '餐饮业',
          description: null,
          industrycode: 'H',
          levels: 1
        }
      ]
    },
    {
      id: 1960,
      year: '2017',
      code: 'I',
      industryname: '信息传输、软件和信息技术服务业',
      description: null,
      industrycode: 'I',
      levels: 0,
      children: [
        {
          id: 63,
          year: '2017',
          code: '63',
          industryname: '电信、广播电视和卫星传输服务',
          description: null,
          industrycode: 'I',
          levels: 1
        },
        {
          id: 64,
          year: '2017',
          code: '64',
          industryname: '互联网和相关服务',
          description: null,
          industrycode: 'I',
          levels: 1
        },
        {
          id: 65,
          year: '2017',
          code: '65',
          industryname: '软件和信息技术服务业',
          description: null,
          industrycode: 'I',
          levels: 1
        }
      ]
    },
    {
      id: 1961,
      year: '2017',
      code: 'J',
      industryname: '金融业',
      description: null,
      industrycode: 'J',
      levels: 0,
      children: [
        {
          id: 66,
          year: '2017',
          code: '66',
          industryname: '货币金融服务',
          description: null,
          industrycode: 'J',
          levels: 1
        },
        {
          id: 67,
          year: '2017',
          code: '67',
          industryname: '资本市场服务',
          description: null,
          industrycode: 'J',
          levels: 1
        },
        {
          id: 68,
          year: '2017',
          code: '68',
          industryname: '保险业',
          description: null,
          industrycode: 'J',
          levels: 1
        },
        {
          id: 69,
          year: '2017',
          code: '69',
          industryname: '其他金融业',
          description: null,
          industrycode: 'J',
          levels: 1
        }
      ]
    },
    {
      id: 1962,
      year: '2017',
      code: 'K',
      industryname: '房地产业',
      description: null,
      industrycode: 'K',
      levels: 0,
      children: [
        {
          id: 70,
          year: '2017',
          code: '70',
          industryname: '房地产业',
          description: null,
          industrycode: 'K',
          levels: 1
        }
      ]
    },
    {
      id: 1963,
      year: '2017',
      code: 'L',
      industryname: '租赁和商务服务业',
      description: null,
      industrycode: 'L',
      levels: 0,
      children: [
        {
          id: 71,
          year: '2017',
          code: '71',
          industryname: '租赁业',
          description: null,
          industrycode: 'L',
          levels: 1
        },
        {
          id: 72,
          year: '2017',
          code: '72',
          industryname: '商务服务业',
          description: null,
          industrycode: 'L',
          levels: 1
        }
      ]
    },
    {
      id: 1964,
      year: '2017',
      code: 'M',
      industryname: '科学研究和技术服务业',
      description: null,
      industrycode: 'M',
      levels: 0,
      children: [
        {
          id: 73,
          year: '2017',
          code: '73',
          industryname: '研究和试验发展',
          description: null,
          industrycode: 'M',
          levels: 1
        },
        {
          id: 74,
          year: '2017',
          code: '74',
          industryname: '专业技术服务业',
          description: null,
          industrycode: 'M',
          levels: 1
        },
        {
          id: 75,
          year: '2017',
          code: '75',
          industryname: '科技推广和应用服务业',
          description: null,
          industrycode: 'M',
          levels: 1
        }
      ]
    },
    {
      id: 1965,
      year: '2017',
      code: 'N',
      industryname: '水利、环境和公共设施管理业',
      description: null,
      industrycode: 'N',
      levels: 0,
      children: [
        {
          id: 76,
          year: '2017',
          code: '76',
          industryname: '水利管理业',
          description: null,
          industrycode: 'N',
          levels: 1
        },
        {
          id: 77,
          year: '2017',
          code: '77',
          industryname: '生态保护和环境治理业',
          description: null,
          industrycode: 'N',
          levels: 1
        },
        {
          id: 78,
          year: '2017',
          code: '78',
          industryname: '公共设施管理业',
          description: null,
          industrycode: 'N',
          levels: 1
        },
        {
          id: 79,
          year: '2017',
          code: '79',
          industryname: '土地管理业',
          description: null,
          industrycode: 'N',
          levels: 1
        }
      ]
    },
    {
      id: 1966,
      year: '2017',
      code: 'O',
      industryname: '居民服务、修理和其他服务业',
      description: null,
      industrycode: 'O',
      levels: 0,
      children: [
        {
          id: 80,
          year: '2017',
          code: '80',
          industryname: '居民服务业',
          description: null,
          industrycode: 'O',
          levels: 1
        },
        {
          id: 81,
          year: '2017',
          code: '81',
          industryname: '机动车、电子产品和日用产品修理业',
          description: null,
          industrycode: 'O',
          levels: 1
        },
        {
          id: 82,
          year: '2017',
          code: '82',
          industryname: '其他服务业',
          description: null,
          industrycode: 'O',
          levels: 1
        }
      ]
    },
    {
      id: 1967,
      year: '2017',
      code: 'P',
      industryname: '教育',
      description: null,
      industrycode: 'P',
      levels: 0,
      children: [
        {
          id: 83,
          year: '2017',
          code: '83',
          industryname: '教育',
          description: null,
          industrycode: 'P',
          levels: 1
        }
      ]
    },
    {
      id: 1968,
      year: '2017',
      code: 'Q',
      industryname: '卫生和社会工作',
      description: null,
      industrycode: 'Q',
      levels: 0,
      children: [
        {
          id: 84,
          year: '2017',
          code: '84',
          industryname: '卫生',
          description: null,
          industrycode: 'Q',
          levels: 1
        },
        {
          id: 85,
          year: '2017',
          code: '85',
          industryname: '社会工作',
          description: null,
          industrycode: 'Q',
          levels: 1
        }
      ]
    },
    {
      id: 1969,
      year: '2017',
      code: 'R',
      industryname: '文化、体育和娱乐业',
      description: null,
      industrycode: 'R',
      levels: 0,
      children: [
        {
          id: 86,
          year: '2017',
          code: '86',
          industryname: '新闻和出版业',
          description: null,
          industrycode: 'R',
          levels: 1
        },
        {
          id: 87,
          year: '2017',
          code: '87',
          industryname: '广播、电视、电影和录音制作业',
          description: null,
          industrycode: 'R',
          levels: 1
        },
        {
          id: 88,
          year: '2017',
          code: '88',
          industryname: '文化艺术业',
          description: null,
          industrycode: 'R',
          levels: 1
        },
        {
          id: 89,
          year: '2017',
          code: '89',
          industryname: '体育',
          description: null,
          industrycode: 'R',
          levels: 1
        },
        {
          id: 90,
          year: '2017',
          code: '90',
          industryname: '娱乐业',
          description: null,
          industrycode: 'R',
          levels: 1
        }
      ]
    },
    {
      id: 1970,
      year: '2017',
      code: 'S',
      industryname: '公共管理、社会保障和社会组织',
      description: null,
      industrycode: 'S',
      levels: 0,
      children: [
        {
          id: 91,
          year: '2017',
          code: '91',
          industryname: '中国共产党机关',
          description: null,
          industrycode: 'S',
          levels: 1
        },
        {
          id: 92,
          year: '2017',
          code: '92',
          industryname: '国家机构',
          description: null,
          industrycode: 'S',
          levels: 1
        },
        {
          id: 93,
          year: '2017',
          code: '93',
          industryname: '人民政协、民主党派',
          description: null,
          industrycode: 'S',
          levels: 1
        },
        {
          id: 94,
          year: '2017',
          code: '94',
          industryname: '社会保障',
          description: null,
          industrycode: 'S',
          levels: 1
        },
        {
          id: 95,
          year: '2017',
          code: '95',
          industryname: '群众团体、社会团体和其他成员组织',
          description: null,
          industrycode: 'S',
          levels: 1
        },
        {
          id: 96,
          year: '2017',
          code: '96',
          industryname: '基层群众自治组织及其他组织',
          description: null,
          industrycode: 'S',
          levels: 1
        }
      ]
    },
    {
      id: 1971,
      year: '2017',
      code: 'T',
      industryname: '国际组织',
      description: null,
      industrycode: 'T',
      levels: 0,
      children: [
        {
          id: 97,
          year: '2017',
          code: '97',
          industryname: '国际组织',
          description: null,
          industrycode: 'T',
          levels: 1
        }
      ]
    }
  ];
  return builder(result);
};
Mock.mock(/\/mock\/tree\/index/, 'get', treeList); // tree
Mock.mock(/\/mock\/complicate-tree\/index/, 'get', complicateTreeList); // tree
Mock.mock(/\/mock\/county-tree\/index/, 'get', countyList); // tree
Mock.mock(/\/mock\/industry-tree\/index/, 'get', industryList); // 所属行业 tree
