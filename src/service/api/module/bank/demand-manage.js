/**
 * @desc 贷款需求管理
 */
export default [
  {
    name: 'bankProductsList',
    method: 'GET',
    desc: '获取贷款需求管理列表',
    path: '/bank/demandManage/bankProductsList',
    mockPath: '/mock/bank/demandManage/bankProductsList',
    params: {
      pageSize: '10',
      pageNum: '1',
      applyTimeStart: '',
      getApplyTimeEnd: '',
      nodeStatus: '',
      key: '',
      productType: '',
      name: ''
    },
    headers: {
      // 测试 token 过期
      // token: 'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjhmYThjZTM1LWRjNzItNDFiYy05N2JkLTk5MDRmYzljMTRkZCJ9.wunHvfjW1mQ-TqvaZut50nImdCF-gM1a-VpgQmkCif4'
    }
  },
  {
    name: 'pagingGridList',
    method: 'GET',
    desc: '获取贷款需求管理列表-自定义分页参数',
    path: '',
    mockPath: '/mock/bank/paging/list',
    params: {
      current: '',
      size: '',
      key: '',
      name: ''
    }
  },
  {
    name: 'dragGridList',
    method: 'GET',
    desc: '拖拽grid',
    path: '',
    mockPath: '/mock/bank/demandManage/dragGridList'
  },
  {
    name: 'resultsList',
    method: 'GET',
    desc: '获取评价结果列表',
    path: '',
    mockPath: '/mock/appraisal/results/resultsList',
    mock: true
  }
];
