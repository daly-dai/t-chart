/**
 * @desc 字典
 */
/**
 * 系统登录 api 文档接口 领域模型
 */
export default [
  {
    name: 'getDictDataByTypeList',
    method: 'GET',
    desc: '获取字典',
    path: '/index/getDictDataByTypeList',
    mockPath: '/mock/index/getDictDataByTypeList',
    params: { ids: '10,6,7,9,2,11' }
  },
  {
    name: 'getProductClassify',
    method: 'GET',
    desc: '产品分类',
    path: '/index/getDictDataByTypeList',
    mockPath: '/mock/index/getDictDataByTypeList',
    params: { ids: '9' },
    isWhite: true // 白名单
  },
  {
    name: 'getSelectSearchList',
    method: 'GET',
    desc: '企业英文名称',
    path: '',
    mockPath: '/mock/index/getSelectSearchList',
    params: {
      name: '',
      current: 1, // 分页参数
      size: 10
    }
  }
];
